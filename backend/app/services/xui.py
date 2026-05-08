import json
import uuid
import time
from typing import Optional, Dict, Any

import requests


class XUIException(Exception):
    pass


class XUIClient:
    """
    3X-UI API Client

    Supports:
    - Login
    - Create/Delete clients
    - Get inbounds
    - Traffic stats
    - Subscription URLs
    - Enable/Disable users
    """

    def __init__(
        self,
        base_url: str,
        username: str,
        password: str,
        verify_ssl: bool = True
    ):

        self.base_url = base_url.rstrip("/")
        self.username = username
        self.password = password
        self.verify_ssl = verify_ssl

        self.session = requests.Session()

        self.is_authenticated = False

    # =========================================================
    # AUTH
    # =========================================================

    def login(self) -> bool:

        response = self.session.post(
            f"{self.base_url}/login",
            data={
                "username": self.username,
                "password": self.password
            },
            verify=self.verify_ssl,
            timeout=15
        )

        if response.status_code != 200:
            raise XUIException(
                f"Login failed: {response.status_code}"
            )

        self.is_authenticated = True

        return True

    def ensure_auth(self):

        if not self.is_authenticated:
            self.login()

    # =========================================================
    # GENERIC REQUEST
    # =========================================================

    def _request(
        self,
        method: str,
        endpoint: str,
        **kwargs
    ) -> Dict[str, Any]:

        self.ensure_auth()

        response = self.session.request(
            method=method,
            url=f"{self.base_url}{endpoint}",
            verify=self.verify_ssl,
            timeout=20,
            **kwargs
        )

        if response.status_code != 200:
            raise XUIException(
                f"API request failed: {response.status_code}"
            )

        try:
            data = response.json()
        except Exception:
            raise XUIException("Invalid JSON response")

        return data

    # =========================================================
    # INBOUNDS
    # =========================================================

    def get_inbounds(self):

        return self._request(
            "GET",
            "/panel/api/inbounds/list"
        )

    def get_inbound(self, inbound_id: int):

        return self._request(
            "GET",
            f"/panel/api/inbounds/get/{inbound_id}"
        )

    # =========================================================
    # CLIENTS
    # =========================================================

    def create_client(
        self,
        inbound_id: int,
        email: str,
        total_gb: int = 50,
        limit_ip: int = 2,
        days: int = 30,
        enable: bool = True,
        tg_id: Optional[str] = None,
        sub_id: Optional[str] = None,
        flow: str = "xtls-rprx-vision"
    ) -> Dict[str, Any]:

        client_id = str(uuid.uuid4())

        expiry_time = int(
            (time.time() + days * 86400) * 1000
        )

        total_bytes = total_gb * 1024 * 1024 * 1024

        settings = {
            "clients": [
                {
                    "id": client_id,
                    "flow": flow,
                    "email": email,
                    "limitIp": limit_ip,
                    "totalGB": total_bytes,
                    "expiryTime": expiry_time,
                    "enable": enable,
                    "tgId": tg_id or "",
                    "subId": sub_id or client_id[:16],
                    "reset": 0
                }
            ]
        }

        payload = {
            "id": inbound_id,
            "settings": json.dumps(settings)
        }

        result = self._request(
            "POST",
            "/panel/api/inbounds/addClient",
            json=payload
        )

        return {
            "success": result.get("success"),
            "client_id": client_id,
            "email": email,
            "expiry_time": expiry_time,
            "total_gb": total_gb,
            "raw_response": result
        }

    def update_client(
        self,
        inbound_id: int,
        client_id: str,
        email: str,
        total_gb: int,
        limit_ip: int,
        days: int,
        enable: bool
    ):

        expiry_time = int(
            (time.time() + days * 86400) * 1000
        )

        total_bytes = total_gb * 1024 * 1024 * 1024

        settings = {
            "clients": [
                {
                    "id": client_id,
                    "email": email,
                    "limitIp": limit_ip,
                    "totalGB": total_bytes,
                    "expiryTime": expiry_time,
                    "enable": enable
                }
            ]
        }

        payload = {
            "id": inbound_id,
            "settings": json.dumps(settings)
        }

        return self._request(
            "POST",
            "/panel/api/inbounds/updateClient/{client_id}",
            json=payload
        )

    def delete_client(
        self,
        inbound_id: int,
        client_id: str
    ):

        return self._request(
            "POST",
            f"/panel/api/inbounds/{inbound_id}/delClient/{client_id}"
        )

    # =========================================================
    # USER MANAGEMENT
    # =========================================================

    def enable_client(
        self,
        inbound_id: int,
        client_id: str
    ):

        inbound = self.get_inbound(inbound_id)

        clients = json.loads(
            inbound["obj"]["settings"]
        )["clients"]

        for client in clients:
            if client["id"] == client_id:
                client["enable"] = True

        payload = {
            "id": inbound_id,
            "settings": json.dumps({
                "clients": clients
            })
        }

        return self._request(
            "POST",
            f"/panel/api/inbounds/update/{inbound_id}",
            json=payload
        )

    def disable_client(
        self,
        inbound_id: int,
        client_id: str
    ):

        inbound = self.get_inbound(inbound_id)

        clients = json.loads(
            inbound["obj"]["settings"]
        )["clients"]

        for client in clients:
            if client["id"] == client_id:
                client["enable"] = False

        payload = {
            "id": inbound_id,
            "settings": json.dumps({
                "clients": clients
            })
        }

        return self._request(
            "POST",
            f"/panel/api/inbounds/update/{inbound_id}",
            json=payload
        )

    # =========================================================
    # STATS
    # =========================================================

    def get_client_traffic(
        self,
        email: str
    ):

        result = self._request(
            "GET",
            f"/panel/api/inbounds/getClientTraffics/{email}"
        )

        return result

    def reset_client_traffic(
        self,
        inbound_id: int,
        email: str
    ):

        return self._request(
            "POST",
            f"/panel/api/inbounds/{inbound_id}/resetClientTraffic/{email}"
        )

    # =========================================================
    # SUBSCRIPTIONS
    # =========================================================

    def get_subscription_url(
        self,
        client_sub_id: str,
        sub_base_url: Optional[str] = None
    ):

        if sub_base_url:
            return f"{sub_base_url}/sub/{client_sub_id}"

        return f"{self.base_url}/sub/{client_sub_id}"

    # =========================================================
    # ONLINE USERS
    # =========================================================

    def get_online_clients(self):

        return self._request(
            "POST",
            "/panel/api/inbounds/onlines"
        )

    # =========================================================
    # SERVER STATUS
    # =========================================================

    def get_server_status(self):

        return self._request(
            "POST",
            "/server/status"
        )