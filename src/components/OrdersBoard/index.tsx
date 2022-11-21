import { Order } from "../../types/Order";
import * as C from "./styles";
import OrderModal from "../OrderModal/index";
import { useState } from "react";
import { api } from "../../utils/api";
import { toast } from "react-toastify";

interface OrderBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order["status"]) => void;
}

export function OrdersBoard({
  icon,
  title,
  orders,
  onCancelOrder,
  onChangeOrderStatus,
}: OrderBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModel(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }
  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const status =
      selectedOrder?.status === "WAITING" ? "IN_PRODUCTION" : "DONE";

    await api.patch(`/orders/${selectedOrder?._id}`, { status });

    toast.success(
      `O pedido  da mesa ${selectedOrder?.table} teve o status alterado`
    );
    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido  da mesa ${selectedOrder?.table} foi cancelado`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }
  return (
    <C.Board>
      <OrderModal
        onChangeStatus={handleChangeOrderStatus}
        onCancelOrder={handleCancelOrder}
        onClose={handleCloseModal}
        visible={isModalVisible}
        order={selectedOrder}
        isLoading={isLoading}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>{orders.length}</span>
      </header>

      {orders.length > 0 && (
        <C.OrdersContainer>
          {orders.map((order) => (
            <button
              onClick={() => handleOpenModel(order)}
              key={order._id}
              type="button"
            >
              <strong>{order.table}</strong>
              <span>
                {order.products.length}{" "}
                {order.products.length > 1 ? "itens" : "item"}
              </span>
            </button>
          ))}
        </C.OrdersContainer>
      )}
    </C.Board>
  );
}
