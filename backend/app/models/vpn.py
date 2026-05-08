from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database import Base


class VPNClient(Base):

    __tablename__ = "vpn_clients"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer)

    client_id = Column(String)

    inbound_id = Column(Integer)

    email = Column(String)

    subscription_url = Column(String)