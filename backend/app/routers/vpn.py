from fastapi import APIRouter
from pydantic import BaseModel

from app.services.xui import XUIClient
from app.config import settings

router = APIRouter(
    prefix="/vpn",
    tags=["vpn"]
)

xui = XUIClient(
    base_url=settings.XUI_URL,
    username=settings.XUI_USERNAME,
    password=settings.XUI_PASSWORD,
    verify_ssl=False
)

xui.login()


class CreateClientRequest(BaseModel):

    email: str

    inbound_id: int = 1

    total_gb: int = 50

    limit_ip: int = 2

    days: int = 30


@router.get("/status")
async def vpn_status():

    return {
        "status": "active",
        "panel": "3x-ui",
        "protocol": "VLESS + Reality"
    }


@router.post("/create-client")
async def create_client(data: CreateClientRequest):

    result = xui.create_client(
        inbound_id=data.inbound_id,
        email=data.email,
        total_gb=data.total_gb,
        limit_ip=data.limit_ip,
        days=data.days
    )

    sub_url = xui.get_subscription_url(
        result["client_id"][:16]
    )

    return {
        "success": True,
        "client": result,
        "subscription_url": sub_url
    }


@router.get("/inbounds")
async def get_inbounds():

    return xui.get_inbounds()


@router.get("/online")
async def get_online():

    return xui.get_online_clients()