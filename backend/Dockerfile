FROM python:3.10.8
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["flask", "db", "init"]
CMD ["flask", "db", "migrate"]
CMD ["flask", "db", "upgrade"]
CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:app"]
