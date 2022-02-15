import React from "react";
import classNames from "classnames";
import Tooltip from "../../utils/Tooltip";
import OrdersBasketServices from "../../services/OrdersBasketServices";
import { orderBasketTableHeaders } from "./OrdersBasketTableHeader";

export default function OrdersBasketTable({
  ordersBasketList,
  register,
  setValue,
  getValues,
  errors,
  statusValidator,
  tableLoading,
}) {
  return (
    <div className="flex flex-col col-span-full">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {orderBasketTableHeaders.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ordersBasketList.map((order) => {
                  const id = order.index;
                  const currentOrder = getValues(`orders.${id}`);

                  const isCheckboxDisabled = order.status === "IN_PROGRESS";
                  const isDisabledBySubmitted =
                    tableLoading?.includes(order.orderBasketId) ||
                    (order.status !== null &&
                      order.status !== "READY" &&
                      order.status !== "NOT_READY");
                  const isPriceDisabled =
                    currentOrder?.mode === "MARKET" ||
                    tableLoading?.includes(order.orderBasketId) ||
                    (order.status !== null &&
                      order.status !== "READY" &&
                      order.status !== "NOT_READY");

                  return (
                    <tr key={order.orderBasketId}>
                      <td className="px-6 py-6 whitespace-nowrap">
                        {/* {JSON.stringify(tableLoading)} */}
                        <div className="flex items-center h-5">
                          {tableLoading?.includes(order.orderBasketId) ? (
                            <h2>Loading</h2>
                          ) : (
                            <input
                              id="checkbox"
                              type="checkbox"
                              {...register(`orders.${id}.selected`)}
                              disabled={isCheckboxDisabled}
                              className={classNames(
                                "focus:ring-blue-400 h-4 w-4 text-blue-400 border-gray-300 rounded",
                                {
                                  "cursor-pointer": isCheckboxDisabled,
                                  "cursor-not-allowed": isCheckboxDisabled,
                                  "bg-gray-200": isCheckboxDisabled,
                                }
                              )}
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap flex items-center">
                        <span
                          className={classNames(
                            "rounded py-2 px-2 text-white",
                            {
                              "text-neutral-900":
                                order.status === "NOT_READY" ||
                                order.status === null,
                              "bg-green-400": order.status === "BOOKED",
                              "bg-indigo-400": order.status === "IN_PROGRESS",
                              "bg-red-400": order.status === "REJECTED",
                              "bg-blue-400": order.status === "READY",
                              "bg-yellow-400":
                                order.status === "NOT_READY" ||
                                order.status === null,
                            }
                          )}
                        >
                          {OrdersBasketServices.statusMapper(order.status)}
                        </span>
                        {order.statusCode && order.statusCode !== 201 && (
                          <span className="ml-4">
                            <Tooltip>
                              {"Error: " +
                                OrdersBasketServices.statusCodeMapper(
                                  order.statusCode
                                )}
                            </Tooltip>
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        {OrdersBasketServices.sideMapper(order.side)}
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap">
                        {order.bloombergTickerLocal}
                      </td>
                      {order.status === "BOOKED" ||
                      order.status === "REJECTED" ? (
                        <>
                          {/* Display only */}
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="col-span-6 sm:col-span-3">
                              <span>{order.mode}</span>
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="col-span-6 sm:col-span-3">
                              <span>
                                ${order.price} {order.currency}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="col-span-6 sm:col-span-3">
                              <span>{order.amount}</span>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          {/* Input Field */}
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="col-span-6 sm:col-span-3">
                              <select
                                id="mode"
                                defaultValue={order.mode}
                                disabled={isDisabledBySubmitted}
                                {...register(`orders.${id}.mode`, {
                                  onChange: (e) => {
                                    setValue(`orders.${id}.price`, null, {
                                      shouldValidate: true,
                                      shouldDirty: true,
                                    });
                                  },
                                })}
                                className={classNames(
                                  "focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md",
                                  {
                                    "cursor-not-allowed": isDisabledBySubmitted,
                                    "bg-gray-200": isDisabledBySubmitted,
                                  }
                                )}
                              >
                                <option key="LIMIT" value="LIMIT">
                                  Limit
                                </option>
                                <option key="MARKET" value="MARKET">
                                  Market
                                </option>
                              </select>
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">
                                  {" "}
                                  ${" "}
                                </span>
                              </div>
                              <input
                                type="number"
                                name="price"
                                id="price"
                                defaultValue={order.price}
                                disabled={isPriceDisabled}
                                {...register(`orders.${id}.price`, {
                                  valueAsNumber: true,
                                  min: currentOrder?.mode === "MARKET" ? 0 : 1,
                                })}
                                className={classNames(
                                  "focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-16 sm:text-sm border-gray-300 rounded-md",
                                  {
                                    "cursor-pointer":
                                      currentOrder?.mode === "LIMIT",
                                    "cursor-not-allowed": isPriceDisabled,
                                    "bg-gray-200": isPriceDisabled,
                                  }
                                )}
                                placeholder="0.00"
                                step="any"
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center">
                                <select
                                  id="currency"
                                  name="currency"
                                  defaultValue={order.currency}
                                  disabled={isPriceDisabled}
                                  {...register(`orders.${id}.currency`)}
                                  className="focus:ring-blue-500 focus:border-blue-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                >
                                  <option>HKD</option>
                                  <option>USD</option>
                                  <option>CAD</option>
                                  <option>EUR</option>
                                </select>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="col-span-6 sm:col-span-3">
                              <input
                                type="number"
                                id="amount"
                                defaultValue={order.amount}
                                disabled={isDisabledBySubmitted}
                                {...register(`orders.${id}.amount`, {
                                  onChange: (e) =>
                                    statusValidator(id, currentOrder),
                                  valueAsNumber: true,
                                  min: 1,
                                })}
                                className={classNames(
                                  "mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md",
                                  {
                                    "border-red-500":
                                      errors?.orders?.[id]?.amount,
                                    "cursor-not-allowed": isDisabledBySubmitted,
                                    "bg-gray-200": isDisabledBySubmitted,
                                  }
                                )}
                                placeholder="0.00"
                              />
                            </div>
                            {errors?.orders?.[id]?.amount?.type ===
                              "required" && (
                              <span className="text-red-500 mt-1">
                                Amount is mandatory
                              </span>
                            )}
                            {errors?.orders?.[id]?.amount?.type === "min" && (
                              <span className="text-red-500 mt-1">
                                Amount is greater than 0
                              </span>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
