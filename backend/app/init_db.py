from app.database import engine
from app.database import Base

from app.models.user import User
from app.models.subscription import Subscription
from app.models.vpn import VPNClient


def init():

    Base.metadata.create_all(bind=engine)

    print("Database initialized")


if __name__ == "__main__":
    init()