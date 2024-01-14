import dateutil.parser as dp
import finnhub
import os
from dotenv import load_dotenv
from flask import jsonify
import yfinance as yf
from datetime import date, datetime


load_dotenv()
API_KEY = os.environ.get("API_KEY")
def get_finnhub_data():
    try:
        finnhub_client = finnhub.Client(api_key=API_KEY)
        data = finnhub_client.stock_symbols('US')
    except:
        data=[]
    return data
def get_stock(code, start, end):
    """Get stock candles data"""

    try:

        formatDate = lambda dt: dp.parse(dt).strftime('%s')
        start = int(formatDate(start))
        start = date.fromtimestamp(start).isoformat()
        end = int(formatDate(end))
        end = date.fromtimestamp(end).isoformat()
        res = yf.download(tickers=code, start=start, end=end, interval="1d")
        print("####")
        #
        #
        # # end = formatDate(end)
        # # finnhub_client = finnhub.Client(api_key=API_KEY)
        # # res = finnhub_client.stock_candles(code, 'D', 1590988249, 1650672000)
        # # res = finnhub_client.stock_candles(code, 'D', start, end)
        #
        candles = []
        # if res['s'] == 'no_data': return [] 




        response_length = len(res.index)
        for i in range(response_length):
            candledate = res.index[i].timestamp()
            # format python timestamp to js timestamp
            candledate = int(datetime.fromtimestamp(candledate).strftime("%s%f")) / 1000
            candlestick = [
                candledate,
                # res['t'][i],
                res['Open'][i],
                res['High'][i],
                res['Low'][i],
                res['Close'][i],
            ]
            candles.append(candlestick)

        print("$$$$")
        print(candles)
        return jsonify(candles)
        return []
    except Exception as e:
        print("####")
        print(e.__str__())
        return []
