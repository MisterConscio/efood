import styled from "styled-components";
import Tag from "./Tag";
import { colors } from "../styles";

import star from "../assets/images/estrela.jpg";
import Button from "./Button";

const Card = styled.div`
  border: 1px solid ${colors.foreground};
  background-color: white;

  max-width: 472px;
  position: relative;

  .card-img {
    transform: translate(-1px, -1px);
  }

  .card-category {
    position: absolute;
    right: 16px;
    top: 16px;

    > * {
      margin-left: 8px;
    }
  }

  .card-body {
    padding: 8px;
  }

  .card-title {
    display: flex;
    justify-content: space-between;

    margin-bottom: 16px;
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
`;

const HomeCard = () => (
  <Card>
    <img
      className="card-img"
      src="https://placehold.it/472x217"
      width={472}
      height={217}
      loading="lazy"
    />
    <div className="card-category">
      <Tag label="Destaque da semana" />
      <Tag label="Japonesa" />
    </div>
    <div className="card-body">
      <div className="card-title">
        <h3>Hioki Sushi</h3>
        <div className="card-title-note">
          <span>4.9 </span>
          <img className="card-title-note-img" src={star} alt="Star" />
        </div>
      </div>
      <p className="card-desc">
        Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis
        frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega
        rápida, embalagens cuidadosas e qualidade garantida.Experimente o Japão
        sem sair do lar com nosso delivery!
      </p>
      <Button>Saiba Mais</Button>
    </div>
  </Card>
);

export default HomeCard;
