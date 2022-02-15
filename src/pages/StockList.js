import React, { useState, useEffect } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import StockListTable from "../partials/stock-list/StockListTable";
import Pagination from "../utils/Pagination";
import StockServices from "../services/StockServices";
import Searchbar from "../utils/Searchbar";
import Toast from "../utils/Toast";

export default function StockList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [stockList, setStockList] = useState([]);
  const [originStockList, setOriginStockList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [stockListPerPage] = useState(10);
  // Search component
  const [keyword, setKeyword] = useState("");
  // Toast component
  const [isDisplayToastList, setIsDisplayToastList] = useState([]);
  
  async function cleanToastList() {
    setIsDisplayToastList([]);
  }

  useEffect(() => {
    const fetchStockList = async () => {
      setLoading(true);
      const res = await StockServices.getStocks();
      setStockList(res.data.body);
      setOriginStockList(res.data.body);
      setLoading(false);
    };
    fetchStockList();
    setInterval(cleanToastList, 5000);
  }, []);

  // Get current stockList
  const indexOfLastPost = currentPage * stockListPerPage;
  const indexOfFirstPost = indexOfLastPost - stockListPerPage;
  const currentStockList = stockList.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // onClick
  const bookStock = async (stockId, side, bloombergTickerLocal) => {
    await StockServices.bookStock({
      stockId,
      side,
    });
    setIsDisplayToastList([
      ...isDisplayToastList,
      {
        stockId,
        side,
        bloombergTickerLocal,
        index: isDisplayToastList.length + 1,
      },
    ]);
  };

  useEffect(() => {
    if (keyword.length > 1) {
      const upperCased = keyword.toLocaleUpperCase();
      const filteredList = originStockList.filter((stock) =>
        stock.bloombergTickerLocal.includes(upperCased)
      );
      setStockList(filteredList);
    } else {
      setStockList(originStockList);
    }
    
    paginate(1)
  }, [keyword]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {loading ? (
              <h1>Loading</h1>
            ) : (
              <>
                {/* Loop the toast message, and use array for display */}

                <div className="flex flex-col justify-center absolute top-24 right-8">
                  {isDisplayToastList?.map((data) => (
                    <Toast
                      key={data.index}
                      title={"SG Stock Webapp"}
                      message={`Successfully move ${
                        data.bloombergTickerLocal
                      } (${
                        data.side === "BUY" ? "Buy" : "Sell"
                      }) to Orders Basket.`}
                    />
                  ))}
                </div>
                <Searchbar setKeyword={setKeyword} />
                <StockListTable
                  stockList={currentStockList}
                  bookStock={bookStock}
                  loading={loading}
                />
                <Pagination
                  currentPage={currentPage}
                  rowsPerPage={stockListPerPage}
                  totalData={stockList.length}
                  paginate={paginate}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
