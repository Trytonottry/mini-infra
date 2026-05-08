from jose import jwt

from app.config import settings


ALGORITHM = "HS256"


def create_token(data: dict):

    return jwt.encode(
        data,
        settings.JWT_SECRET,
        algorithm=ALGORITHM
    )


def decode_token(token: str):

    return jwt.decode(
        token,
        settings.JWT_SECRET,
        algorithms=[ALGORITHM]
    )