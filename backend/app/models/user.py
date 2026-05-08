from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean

from app.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    telegram_id = Column(String, unique=True)
    username = Column(String)

    subscription_plan = Column(String, default="starter")

    vpn_enabled = Column(Boolean, default=False)