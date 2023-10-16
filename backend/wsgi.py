from main import app

# do some production specific things to the app
if __name__ == "__main__":
    app.config['DEBUG'] = True
    app.run()
