
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/portfolio")
def portfolio():
    return {
        "total_value": 124567890,
        "daily_pnl": 567890,
        "var_1d": 1200000,
        "allocation": {"Equities":70, "Bonds":20, "Crypto":5, "Cash":5}
    }
