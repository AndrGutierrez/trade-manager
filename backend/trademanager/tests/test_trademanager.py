def test_home(client):
    response=client.get("/api/")
    print(response)
    assert response.status_code==200
