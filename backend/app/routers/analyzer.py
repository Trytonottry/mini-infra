from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/analyzer",
    tags=["analyzer"]
)


class LogRequest(BaseModel):

    content: str


@router.post("/analyze")
async def analyze_log(data: LogRequest):

    log = data.content.lower()

    if "i/o error" in log:

        return {
            "severity": "high",
            "problem": "Disk I/O errors detected",
            "recommendation": (
                "Check SMART diagnostics immediately. "
                "Possible drive degradation or SATA issues."
            )
        }

    if "zfs" in log and "degraded" in log:

        return {
            "severity": "high",
            "problem": "ZFS pool degraded",
            "recommendation": (
                "Replace failed disk and run zpool status."
            )
        }

    if "code 137" in log:

        return {
            "severity": "medium",
            "problem": "Container killed by OOM",
            "recommendation": (
                "Increase RAM or container memory limits."
            )
        }

    if "smart" in log and "failed" in log:

        return {
            "severity": "high",
            "problem": "SMART predicts drive failure",
            "recommendation": (
                "Backup data and replace disk immediately."
            )
        }

    return {
        "severity": "low",
        "problem": "Unknown issue",
        "recommendation": (
            "Further investigation required."
        )
    }