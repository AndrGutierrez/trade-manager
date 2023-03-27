# def test_stock(client):
#     response=client.get("/")
#     print(response)
#     assert response.status==200

# def test_registration(client, app):
#     response= client.post("/api/company/register", data={"code":"MSFT"})

#     with app.app_context():
#         assert response.status==200
