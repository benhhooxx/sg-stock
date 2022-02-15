import { stockListTableHeaders } from "../partials/stock-list/StockListTableHeaders";
import StockServices from "../services/StockServices";

// Unit Test
test("Has Market Price In Stock Headers", () => {
  expect(stockListTableHeaders).toContain("Market Price");
  expect(new Set(stockListTableHeaders)).toContain("Market Price");
});

// Integration Test
describe("Stock Services Aysnc Integraton Test", () => {
  it("Get Stocks", () => {
    return StockServices.getStocks().then((res) => {
      expect(res.data.statusCode).toBe(200);
      expect(res.data.body.length).toBe(1740);
    });
  });

  it("Book Stock", () => {
    const parmas = {
      stockId: "c94b2d39-3f1c-46d5-9673-62865fa3b99f",
      side: "BUY",
    };
    return StockServices.bookStock(parmas).then((res) => {
      expect(res.data.message).toBe("success");
    });
  });
});
