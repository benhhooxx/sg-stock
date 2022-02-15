import axios from "axios";

const OrdersBasketServices = {
  getOrdersBasket: () =>
    axios.get(
      "https://zj0bwspxpd.execute-api.ap-east-1.amazonaws.com/orders-basket"
    ),
  bookOrdersBasket: (params) =>
    axios.post(
      "https://zj0bwspxpd.execute-api.ap-east-1.amazonaws.com/orders-basket/",
      params
    ),
  deleteOrderBasket: (params) =>
    axios.delete(
      "https://zj0bwspxpd.execute-api.ap-east-1.amazonaws.com/orders-basket/",
      { data: params }
    ),
  OrdersBasketStatusMapper: (res) => {
    const orderBaskets = res.data.body;
    const newOrderBaskets = orderBaskets
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((orderBasket, index) => ({
        orderBasketId: orderBasket.OrderBasketId,
        status: orderBasket.status,
        side: orderBasket.side,
        bloombergTickerLocal: orderBasket.bloombergTickerLocal,
        price: orderBasket.price,
        amount: orderBasket.amount,
        stockId: orderBasket.stockId,
        createdAt: orderBasket.createdAt,
        statusCode: orderBasket.statusCode,
        mode: orderBasket.mode,
        currency: orderBasket.currency,
        index: index,
      }));
    return newOrderBaskets;
  },
  statusMapper: (status) => {
    switch (status) {
      case "BOOKED":
        return "Booked";
      case "IN_PROGRESS":
        return "In Progress";
      case "REJECTED":
        return "Rejected";
      case "READY":
        return "Ready";
      default:
        return "Not Ready";
    }
  },
  statusCodeMapper: (statusCode) => {
    switch (statusCode) {
      case 400:
        return "Request Failed with Internal Bad Request (Status code: 400)";
      case 500:
        return "Request Failed with Internal Server Error (Status code: 500)";
      case 504:
        return "Request Failed with Internal Gateway Timeout (Status code: 504)";
    }
  },
  sideMapper: (side) => {
    if (side === "SELL") {
      return "Sell";
    } else if (side === "BUY") {
      return "Buy";
    }
  },
  statusValidator: (currentOrder) => {
    if (currentOrder.amount > 0) {
      if (currentOrder.mode === "LIMIT" && currentOrder.price > 0) {
        return "READY";
      } else if (currentOrder.mode === "MARKET" && currentOrder.price === 0) {
        return "READY";
      } else {
        return "NOT_READY";
      }
    } else {
      return "NOT_READY";
    }
  }

};

export default OrdersBasketServices;