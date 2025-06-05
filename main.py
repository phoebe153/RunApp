from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from typing import Optional

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")




@app.get("/")
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/api/pace")
def get_pace(speed: float):
    if speed <= 0:
        return JSONResponse(content={"error": "Ungültige Geschwindigkeit"}, status_code=400)
    total_minutes = 60 / speed
    minutes = int(total_minutes)
    seconds = int(round((total_minutes - minutes) * 60))
    return {"pace": f"{minutes}:{seconds:02d}"}


@app.get("/api/speed")
def get_speed(pace: str):
    try:
        minutes, seconds = map(int, pace.split(":"))
        total_minutes = minutes + seconds / 60
        if total_minutes == 0:
            raise ValueError
        speed = 60 / total_minutes
        return {"speed": round(speed, 2)}
    except:
        return JSONResponse(content={"error": "Ungültiger Pace. Format: mm:ss"}, status_code=400)
