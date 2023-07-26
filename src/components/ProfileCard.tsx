import styled from "styled-components";
import { colors } from "../styles";

import Button from "./Button";

import marguerita from "../assets/images/marguerita.jpg";

const Card = styled.div`
  background-color: ${colors.foreground};
  color: ${colors.background};

  padding: 8px;

  .card-title {
    margin-block: 8px;
  }

  .card-title-note {
    display: flex;
    gap: 8px;

    font-size: 18px;
    font-weight: bold;
  }

  .card-desc {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    max-width: 300px;

    .card-img {
      max-width: 300px;
      transform: translate(-2px, -2px);
    }
  }
`;

const ProfileCard = () => (
  <Card>
    <img
      className="card-img"
      src={marguerita}
      width={304}
      height={167}
      loading="lazy"
    />
    <div className="card-body">
      <div className="card-title">
        <h3>Pizza Marguerita</h3>
      </div>
      <p className="card-desc">
        A clássica Marguerita: molho de tomate suculento, mussarela derretida,
        manjericão fresco e um toque de azeite. Sabor e simplicidade!
      </p>
      <Button profileBtn>Adicionar ao carrinho</Button>
    </div>
  </Card>
);

export default ProfileCard;
