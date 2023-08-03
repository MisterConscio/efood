import styled from "styled-components";
import Tag from "./Tag";
import { colors } from "../styles";

import star from "../assets/images/estrela.jpg";
import macarone from "../assets/images/marcarone.jpg";

import Button from "./Button";
import { Link } from "react-router-dom";
import { Restaurant } from "../pages/Home";

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

  @media (max-width: 768px) {
    max-width: 300px;

    .card-img {
      max-width: 300px;
      transform: translate(-2px, -2px);
    }
  }
`;

interface Props extends Restaurant { }

const HomeCard = ({
  titulo,
  descricao,
  tipo,
  capa,
  avaliacao,
  destacado,
}: Props) => {
  const capitalizeWord = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <Card>
      <img
        className="card-img"
        src={capa}
        width={472}
        height={217}
        loading="lazy"
      />
      <div className="card-category">
        {destacado && <Tag label="Destaque da Semana" />}
        <Tag label={capitalizeWord(tipo)} />
      </div>
      <div className="card-body">
        <div className="card-title">
          <h3>{titulo}</h3>
          <div className="card-title-note">
            <span>{avaliacao + " "}</span>
            <img className="card-title-note-img" src={star} alt="Star" />
          </div>
        </div>
        <p className="card-desc">{descricao}</p>
        <Link to="/profiles">
          <Button>Saiba Mais</Button>
        </Link>
      </div>
    </Card>
  );
};

export default HomeCard;
