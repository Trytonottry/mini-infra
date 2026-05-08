from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    DATABASE_URL: str
    JWT_SECRET: str

    TELEGRAM_BOT_TOKEN: str

    XUI_URL: str
    XUI_USERNAME: str
    XUI_PASSWORD: str

    OPENAI_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()