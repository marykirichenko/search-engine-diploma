FROM python:3.12-slim AS base
LABEL authors="Max"
WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY src ./src
COPY docs ./docs

EXPOSE 5000

ENTRYPOINT ["python", "src/app.py"]