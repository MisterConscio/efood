import styled from "styled-components";
import { colors } from "../styles";

import Button from "./Button";

import { Restaurant } from "../pages/Home";

const Card = styled.div`
  background-color: ${colors.foreground};
  color: ${colors.background};

  padding: 8px;

  .card-img {
    object-fit: cover;
  }

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
      width: 100%;
    }
  }
`;

interface Props extends Restaurant { }

const ProfileCard = ({ foto, nome, descricao }: Props) => (
  <Card>
    <img
      className="card-img"
      src={foto}
      width={304}
      height={167}
      loading="lazy"
    />
    <div className="card-body">
      <div className="card-title">
        <h3>{nome}</h3>
      </div>
      <p className="card-desc">{descricao}</p>
      <Button profileBtn>Adicionar ao carrinho</Button>
    </div>
  </Card>
);

export default ProfileCard;
