FROM python:3.10.8
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000

CMD flask db stamp head && flask db migrate && flask db upgrade && gunicorn -b 0.0.0.0:5000 wsgi:app 
