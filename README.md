# trade-manager
Stock trading manager made with flask and react

## .env file
Here is an example of what are the environment variables required.
DATABASE_PASSWORD and MYSQL_ROOT_PASSWORD should be the same, for this documentation, it will be empty
```
FLASK_DEBUG=false
DATABASE_PASSWORD=super secret
DATABASE_NAME=trademanager
DATABASE_USER=root
DATABASE_HOST=db
SECRET_KEY=super secret

REACT_APP_API_PATH=http://localhost:80/api
# docker env variables
MYSQL_DATABASE=trademanager
MYSQL_ROOT_PASSWORD=
MYSQL_ALLOW_EMPTY_PASSWORD=true
# https://finnhub.io API key
API_KEY=
```
## Run project

`docker compose up --build`

## DB Troubleshooting
If there is any Issue with database migrations, try deleting  `alembic_version` table in the database

## TODO:
Add menu and user authentication
