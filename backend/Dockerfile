FROM python:3.10.8
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000

CMD ["flask", "db", "revision", "--rev-id", "ea5895751fcf"]
CMD ["flask", "db", "stamp", "head"]
CMD ["flask", "db", "migrate"]
CMD ["flask", "db", "upgrade"]
CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:app"]
