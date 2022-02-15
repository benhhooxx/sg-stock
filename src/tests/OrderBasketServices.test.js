import { orderBasketTableHeaders } from "../partials/orders-basket/OrdersBasketTableHeader";
import OrdersBasketServices from "../services/OrdersBasketServices";

// Unit Test
test("Has Stock Code In Order Basket Headers", () => {
  expect(orderBasketTableHeaders).toContain("Stock Code");
  expect(new Set(orderBasketTableHeaders)).toContain("Stock Code");
});

test("Status Mapper", () => {
  expect(OrdersBasketServices.statusMapper("BOOKED")).toBe("Booked");
  expect(OrdersBasketServices.statusMapper("IN_PROGRESS")).toBe("In Progress");
  expect(OrdersBasketServices.statusMapper("REJECTED")).toBe("Rejected");
  expect(OrdersBasketServices.statusMapper("READY")).toBe("Ready");
});

test("Status Code Mapper", () => {
  expect(OrdersBasketServices.statusCodeMapper(400)).toBe(
    "Request Failed with Internal Bad Request (Status code: 400)"
  );
  expect(OrdersBasketServices.statusCodeMapper(500)).toBe(
    "Request Failed with Internal Server Error (Status code: 500)"
  );
  expect(OrdersBasketServices.statusCodeMapper(504)).toBe(
    "Request Failed with Internal Gateway Timeout (Status code: 504)"
  );
});

test("Status Validator", () => {
  expect(
    OrdersBasketServices.statusValidator({
      amount: 0,
      mode: "LIMIT",
      price: 100,
    })
  ).toBe("NOT_READY");
  expect(
    OrdersBasketServices.statusValidator({
      amount: 100,
      mode: "LIMIT",
      price: 0,
    })
  ).toBe("NOT_READY");
  expect(
    OrdersBasketServices.statusValidator({
      amount: 100,
      mode: "LIMIT",
      price: 100,
    })
  ).toBe("READY");
  expect(
    OrdersBasketServices.statusValidator({
      amount: 100,
      mode: "MARKET",
      price: 0,
    })
  ).toBe("READY");
});

// Integration Test
describe("Orders Basket Services Aysnc Integraton Test", () => {
  it("Get Orders Basket", () => {
    OrdersBasketServices.getOrdersBasket().then((res) => {
      expect(res.data.statusCode).toBe(200);
    });
  });

  it("Book Orders Basket", () => {
    const params = {
      bookOrderBasket: {
        OrderBasketId: "9edd5ee9-6ca9-4a2c-8610-af2aaf5f2337",
        currency: "HKD",
        price: 0,
        stockId: "18143dc3-a61b-49bd-8777-2c0d97136ebd",
        mode: "MARKET",
        amount: 100,
        bloombergTickerLocal: "436 HK",
      },
    };
    OrdersBasketServices.bookOrdersBasket(params)
      .then((res) => {
        expect(res.data.statusCode).toBe(201);
      })
      .catch((err) => err);
  });

  it("Delete Orders Basket", () => {
    const params = {
      orderBasketId: "acb09c3e-00f9-4287-840b-e2779b300f8e",
    };
    OrdersBasketServices.deleteOrderBasket(params).then((res) => {
      expect(res.data.message).toBe("Successfullly removed item");
    });
  });
});
