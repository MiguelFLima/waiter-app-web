import * as C from "./styles";
import closeIcon from "../../assets/images/close-icon.svg";
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onChangeStatus: () => void;
}

function Modal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeStatus,
}: OrderModalProps) {
  if (!visible || !order) {
    return null;
  }

  // let total = 0;
  // order.products.forEach(({ product, quantity }) => {
  //   total += product.price * quantity;
  // });

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + product.price * quantity;
  }, 0);

  return (
    <C.Overlay>
      <C.ModalBody>
        <header>
          <strong>{order.table}</strong>

          <button type="button">
            <img onClick={onClose} src={closeIcon} alt="ícone fechar" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>{order.status === "WAITING" && "🕛"}</span>
            <span>{order.status === "IN_PRODUCTION" && "🧑‍🍳"}</span>
            <span>{order.status === "DONE" && "✅"}</span>
            <strong>
              <span>{order.status === "WAITING" && "Fila de espera"}</span>
              <span>{order.status === "IN_PRODUCTION" && "Em preparação"}</span>
              <span>{order.status === "DONE" && "Pronto"}</span>
            </strong>
          </div>
        </div>

        <C.OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div key={_id} className="item">
                <img
                  src={`http://localhost:8000/uploads/${product.imagePath}`}
                  alt={product.name}
                  width="56"
                  height="28.51"
                />

                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </C.OrderDetails>

        <C.Actions>
          {order.status !== "DONE" && (
            <button
              onClick={onChangeStatus}
              disabled={isLoading}
              type="button"
              className="primary"
            >
              <span>
                {order.status === "WAITING" && "🧑‍🍳"}
                {order.status === "IN_PRODUCTION" && "✅"}
              </span>
              <strong>
                {order.status === "WAITING" && "Iniciar Produção"}
                {order.status === "IN_PRODUCTION" && "Concluir Pedido"}
              </strong>
            </button>
          )}
          <button
            disabled={isLoading}
            onClick={onCancelOrder}
            type="button"
            className="secundary"
          >
            <span>🧑‍🍳</span>
            <strong>Cancelar Pedido</strong>
          </button>
        </C.Actions>
      </C.ModalBody>
    </C.Overlay>
  );
}

export default Modal;
