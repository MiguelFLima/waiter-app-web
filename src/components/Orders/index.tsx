import { useEffect, useState } from "react";
import { Order } from "../../types/Order";
import socketIo from "socket.io-client";
import { OrdersBoard } from "../OrdersBoard";
import * as C from "./styles";
import { api } from "../../utils/api";

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo("http://localhost:8000", {
      transports: ["websocket"],
    });

    socket.on("new_orders", (order) => {
      setOrders((prevState) => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    api.get("/orders").then(({ data }) => {
      setOrders(data);
    });
  }, []);

  const waiting = orders.filter((order) => order.status === "WAITING");
  const in_production = orders.filter(
    (order) => order.status === "IN_PRODUCTION"
  );
  const done = orders.filter((order) => order.status === "DONE");

  function handleCancelOrder(orderID: string) {
    setOrders((prevState) =>
      prevState.filter((order) => order._id !== orderID)
    );
  }

  function handleChangeOrderStatus(orderId: string, status: Order["status"]) {
    setOrders((prevState) =>
      prevState.map((order) =>
        order._id === orderId ? { ...order, status } : order
      )
    );
  }

  return (
    <C.Container>
      <OrdersBoard
        onCancelOrder={handleCancelOrder}
        orders={waiting}
        icon="🕛"
        title="Fila de Espera"
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        onCancelOrder={handleCancelOrder}
        orders={in_production}
        icon="🧑‍🍳"
        title="Em Preparação"
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        onCancelOrder={handleCancelOrder}
        orders={done}
        icon="✅"
        title="Pronto"
        onChangeOrderStatus={handleChangeOrderStatus}
      />
    </C.Container>
  );
}

export default Orders;
