import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import OrdersBasketTable from "../partials/orders-basket/OrdersBasketTable";
import Pagination from "../utils/Pagination";
import OrdersBasketServices from "../services/OrdersBasketServices";

export default function OrdersBasket() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [ordersBasketList, setOrdersBasketList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersBasketListPerPage] = useState(10);
  const [updatedOrderBasketList, setUpdatedOrderBasketList] = useState([]);
  const [isBookButtonActive, setIsBookButtonActive] = useState(false);

  // Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ mode: "all" });

  // Get data
  useEffect(() => {
    const fetchOrdersBasketList = async () => {
      setLoading(true);
      // consider extension for another page will use
      const res = await OrdersBasketServices.getOrdersBasket();
      // extract mapper for what data-to-object (DTO) orders basket page needed
      const ordersBasketListDto =
        await OrdersBasketServices.OrdersBasketStatusMapper(res);
      setOrdersBasketList(ordersBasketListDto);
      ordersBasketListDto.forEach((order) => {
        const id = order.index;
        setValue(`orders.${id}.orderBasketId`, order.orderBasketId);
        setValue(`orders.${id}.stockId`, order.stockId);
        setValue(
          `orders.${id}.bloombergTickerLocal`,
          order.bloombergTickerLocal
        );
        setValue(`orders.${id}.index`, order.index);
        setValue(`orders.${id}.status`, order.status);
      });
      setLoading(false);
    };
    fetchOrdersBasketList();
  }, []);

  const updateStatusToInProgress = (index) => {
    ordersBasketList[index].status = "IN_PROGRESS";
    setOrdersBasketList([...ordersBasketList]);
  };

  const onSubmit = (data) => {
    const { orders } = data;
    const pendingToSubmitList = orders.filter((order) => order.selected);
    if (pendingToSubmitList < 1) {
      return;
    }

    const newTableLoading = pendingToSubmitList.map((ref) => {
      OrdersBasketServices.bookOrdersBasket({
        bookOrderBasket: {
          orderBasketId: ref.orderBasketId,
          currency: ref.currency,
          price: ref.price,
          stockId: ref.stockId,
          mode: ref.mode,
          amount: ref.amount,
          bloombergTickerLocal: ref.bloombergTickerLocal,
        },
      }).then((res) => {
        setUpdatedOrderBasketList([...updatedOrderBasketList, res.data.body]);
      });
      updateStatusToInProgress(ref.index);
      setValue(`orders.${ref.index}.selected`, false);
      return ref.orderBasketId;
    });
    setTableLoading(newTableLoading);
    setTableLoading([]);
  };

  // Update display after submitted with async
  useEffect(() => {
    const res = ordersBasketList.reduce((acc, curr) => {
      const stored = updatedOrderBasketList.find(
        ({ orderBasketId }) => orderBasketId === curr.orderBasketId
      );
      if (stored) {
        console.log(stored)
        curr.status = stored.status;
        curr.statusCode = stored.statusCode;
        curr.mode = stored.mode;
        curr.price = stored.price;
        curr.currency = stored.currency;
        curr.amount = stored.amount;
        acc.push(curr);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
    setOrdersBasketList(res);
  }, [updatedOrderBasketList]);

  const onDelete = async (data) => {
    const { orders } = data;
    const pendingToSubmitList = orders.filter((order) => order.selected);
    if (pendingToSubmitList < 1) {
      return;
    }

    let count=0;
    await pendingToSubmitList.forEach((ref) => {
      OrdersBasketServices.deleteOrderBasket({
        orderBasketId: ref.orderBasketId,
      }).then(() => {
        count++;
        if (count === pendingToSubmitList.length) {window.location.reload();}
      });
    });
  };

  const statusValidator = (index, currentOrder) => {
    const ordersBasket = ordersBasketList.find(
      (order) => order.index === index
    );
    if (currentOrder.amount > 0) {
      if (currentOrder.mode === "LIMIT" && currentOrder.price > 0) {
        ordersBasket.status = "READY";
      } else if (currentOrder.mode === "MARKET" && currentOrder.price === 0) {
        ordersBasket.status = "READY";
      } else {
        ordersBasket.status = "NOT_READY";
      }
    } else {
      ordersBasket.status = "NOT_READY";
    }
    setOrdersBasketList([...ordersBasketList]);
  };

  // Button Submit Disable Handling
  useEffect(() => {
    watch((data) => {
      const hasSelected = data.orders.filter(
        (order) =>
          order.selected &&
          OrdersBasketServices.statusValidator(order) === "READY"
      );

      const hasSelectedInvalid = data.orders.filter(
        (order) =>
          order.selected &&
          OrdersBasketServices.statusValidator(order) !== "READY"
      );

      if (hasSelected?.length > 0 && hasSelectedInvalid?.length === 0) {
        setIsBookButtonActive(true);
      } else {
        setIsBookButtonActive(false);
      }
    });
  }, [watch]);

  // Pagination - Get current orders basket
  const indexOfLastPost = currentPage * ordersBasketListPerPage;
  const indexOfFirstPost = indexOfLastPost - ordersBasketListPerPage;
  const currentOrdersBasketList = ordersBasketList.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-end mb-4">
                    <button
                      className="btn-primary mr-1"
                      input="button"
                      onClick={handleSubmit(onDelete)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn-primary"
                      input="submit"
                      disabled={!isBookButtonActive}
                      className={classNames("btn-primary", {
                        "btn-disabled": !isBookButtonActive,
                      })}
                    >
                      Book
                    </button>
                  </div>
                  <div>
                    <OrdersBasketTable
                      ordersBasketList={currentOrdersBasketList}
                      register={register}
                      setValue={setValue}
                      getValues={getValues}
                      errors={errors}
                      statusValidator={statusValidator}
                      tableLoading={tableLoading}
                    />
                    <Pagination
                      currentPage={currentPage}
                      rowsPerPage={ordersBasketListPerPage}
                      totalData={ordersBasketList.length}
                      paginate={paginate}
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
