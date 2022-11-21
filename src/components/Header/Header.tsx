import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
import * as C from "../Header/style";

function Header() {
  return (
    <C.Container>
      <C.Content>
        <div className="page-details">
          <h1>Pedidos</h1>
          <h2>Acompanhe os pedidos dos clientes</h2>
        </div>
        <img src={logo} />
      </C.Content>
    </C.Container>
  );
}

export default Header;
