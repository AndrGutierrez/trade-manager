"""Main Flask a´ file"""

from trademanager import app
from trademanager.api import api_bp

app.register_blueprint(api_bp, url_prefix='/api')
if __name__ == '__main__':
    app.run()

