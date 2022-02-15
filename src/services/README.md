[[_TOC_]]

## 1. Get Stock List
**GET /stocks**

Request params `empty`

Response body `200 OK`
```json
{
  "body": [{
    "currency": "USD",
    "bloombergTickerLocal": "XOM UN",
    "ric": "XOM.N",
    "stockId": "53aced48-68b8-45ab-96f5-300117dcbafd",
    "price": 183.16,
    "country": "United States",
    "name": "Exxon Mobil Corp",
    "bloombergTicker": "XOM US"
  }]
}
```

---

## 2. Wirte Stock
**POST /stocks**

Request params 
```json
{
  "stockId": "53aced48-68b8-45ab-96f5-300117dcbafd",
  "method": "BUY|SELL"
}
```

Response body `201 OK`
```json
{
  "message": "sccuess"
}
```

---

## 3. Get Orders Basket
**GET /order-basket**

Request params `empty`

Response body `200 OK`
```json
{
  "body": [{
    "stockId": "53aced48-68b8-45ab-96f5-300117dcbafd",
    "OrderBasketId": "cf3b80c5-b97d-423b-93a9-a8f7e95b0b09",
    "method": "BUY",
    "currency": "USD",
    "bloombergTickerLocal": "XOM UN",
    "ric": "XOM.N",
    "price": 183.16,
    "country": "United States",
    "name": "Exxon Mobil Corp",
    "bloombergTicker": "XOM US",
    "status": "BOOKED|IN_PROGRESS|REJECTED"
  }]
}
```

---

## 4. Book Order Basket
**POST /orders-basket**

Request params 
```json
{
  "bookOrderBasket": {
    "orderBasketId": "b577e9a7-416f-4f63-8cb8-3447d6f083a1",
    "currency": "HKD",
    "price": 14.9,
    "stockId": "c94b2d39-3f1c-46d5-9673-62865fa3b99f",
    "mode": "LIMIT",
    "amount": "100",
    "bloombergTickerLocal": "5 HK"
  }
}
```

Response body `400 Bad Request` `500 Internal Server Error` `504 Bad Gateway`
```json
{
  "body": {
        "orderBasketId": "4c3bc3d7-a67c-40c4-a92b-654b73db0ca5",
        "currency": "HKD",
        "price": 295.64,
        "stockId": "9566837b-dfb0-4754-a752-b97a6ede8c80",
        "mode": "LIMIT",
        "amount": 100,
        "bloombergTickerLocal": "5 HK",
        "statusCode": 500,
        "status": "REJECTED"
    },
}
```

## 4. Delete Order Basket
**DELETE /orders-basket**

Request params 
```json
{
    "orderBasketId": "91947dd8-caf7-46c1-ad3c-091651c6e91b"
}
```

Response body `200 Accpeted`
```json
{
  "message": "Successfullly removed item"
}
```