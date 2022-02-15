import axios from "axios";

const StockServices = {
  getStocks: () => axios.get("https://5r44antmu0.execute-api.ap-east-1.amazonaws.com/stocks/"),
  bookStock: (params) => axios.post("https://5r44antmu0.execute-api.ap-east-1.amazonaws.com/stocks/", params)
};

export default StockServices;
