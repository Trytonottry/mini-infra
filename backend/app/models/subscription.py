from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from app.database import Base


class Subscription(Base):

    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer)

    plan = Column(String)

    status = Column(String)

    expires_at = Column(DateTime)