from trademanager.api import get_stock
import pytest

def test_stock(client):
    response=client.get("/api/")
    print(response)
    assert response.status_code==200

def test_registration(client):
    data={"code":"MSFT"}
    response= client.post("/api/company/register", data=data)
    assert response.status_code==200

def test_invalid_registration(client):
    data={"code":"invalid"}
    response= client.post("/api/company/register", data=data)
    assert response.status_code==404

@pytest.mark.parametrize(
        "code,start,end",
        [
            ("MSFT", "1900-12-12", "2023-12-12"),
            ("invalid", "2099-12-25", "2099-12-25"),
        ])
def test_get_stock(code,start,end):
    stocks=get_stock(code,start,end)
            
    print(stocks)
    assert  isinstance(stocks, list)
    for stock in stocks:
        for value in stock:
            assert value is not None
