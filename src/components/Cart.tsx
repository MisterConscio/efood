import styled from "styled-components";
import { colors } from "../styles";

import trashIcon from "../assets/images/trash-icon.png";
import Button from "./Button";

const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: none;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const SidedBar = styled.aside`
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  max-width: 360px;
  width: 100%;

  padding: 32px 8px;

  .price-total {
    padding-block: 16px;
    display: flex;
    justify-content: space-between;

    font-weight: bold;
    font-size: 14px;
  }

  background-color: ${colors.foreground};
  color: ${colors.background};
`;

const Item = styled.li`
  display: flex;
  gap: 8px;
  padding: 8px;
  margin-bottom: 16px;
  position: relative;

  .cart-image {
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  .trash-icon-img {
    position: absolute;
    bottom: 8px;
    right: 8px;
    cursor: pointer;
  }

  .cart-content {
    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 900;
    }

    color: ${colors.foreground};
  }

  background-color: ${colors.foregroundAlt};
`;

const Cart = () => {
  return (
    <Container>
      <Overlay />
      <SidedBar>
        <ul className="cart-list">
          <Item>
            <img
              className="cart-image"
              src="https://placehold.it/80"
              height={80}
            />
            <div className="cart-content">
              <h3>Item</h3>
              <span>R$ 2.000,00</span>
            </div>
            <img
              className="trash-icon-img"
              src={trashIcon}
              alt="Trash Icon"
              title="Delete"
              height={16}
            />
          </Item>
          <Item>
            <img
              className="cart-image"
              src="https://placehold.it/80"
              height={80}
            />
            <div className="cart-content">
              <h3>Item</h3>
              <span>R$ 2.000,00</span>
            </div>
            <img
              className="trash-icon-img"
              src={trashIcon}
              alt="Trash Icon"
              title="Delete"
              height={16}
            />
          </Item>
        </ul>
        <div className="price-total">
          <p>Valor total</p>
          <span>R$ 182,70</span>
        </div>
        <Button profileBtn type="button">
          Continuar com a entrega
        </Button>
      </SidedBar>
    </Container>
  );
};

export default Cart;
