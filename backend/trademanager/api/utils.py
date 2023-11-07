import dateutil.parser as dp
import finnhub
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.environ.get("API_KEY")
try:
    finnhub_client = finnhub.Client(api_key=API_KEY)
    data = finnhub_client.stock_symbols('US')
except:
    data=[]
def get_stock(code, start, end):
    """Get stock candles data"""

    formatDate = lambda date: dp.parse(date).strftime('%s')
    start = formatDate(start)
    end = formatDate(end)
    # res = finnhub_client.stock_candles(code, 'D', 1590988249, 1650672000)
    res = finnhub_client.stock_candles(code, 'D', start, end)

    candles = []
    if res['s'] == 'no_data': return [] 

    response_length = len(res['t'])
    for i in range(response_length):
        # convert javascript unix timestamp
        date = res['t'][i] * 1000
        candlestick = [
            date,
            # res['t'][i],
            res['o'][i],
            res['h'][i],
            res['l'][i],
            res['c'][i],
        ]
        candles.append(candlestick)

    return candles
