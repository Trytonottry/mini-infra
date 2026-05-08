import requests

from app.config import settings


def send_message(
    chat_id: int,
    text: str
):

    requests.post(
        f"https://api.telegram.org/bot"
        f"{settings.TELEGRAM_BOT_TOKEN}/sendMessage",
        json={
            "chat_id": chat_id,
            "text": text
        },
        timeout=10
    )