import React from "react";
import { stockListTableHeaders } from "./StockListTableHeaders";

export default function StockListTable({ stockList, bookStock, loading }) {
  return (
    <div className="flex flex-col col-span-full">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {stockListTableHeaders.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stockList.map((stock, index) => (
                  <tr key={index}>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {stock.bloombergTickerLocal}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {stock.price}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {stock.currency}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      <button className="btn-primary" onClick={() => bookStock(stock.stockId, 'BUY', stock.bloombergTickerLocal)}>Buy</button>
                      <button className="btn-secondary" onClick={() => bookStock(stock.stockId, 'SELL', stock.bloombergTickerLocal)}>Sell</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
