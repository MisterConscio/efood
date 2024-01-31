import styled from "styled-components";
import Tag from "./Tag";
import { colors } from "../styles";

import star from "../assets/images/estrela.jpg";

import Button from "./Button";
import { Link } from "react-router-dom";
import { Restaurant } from "../pages/Home";
import { capitalizeWord } from "../utils";

const Card = styled.div`
  border: 1px solid ${colors.foreground};
  background-color: white;

  position: relative;

  .card-img {
    width: 100%;
    object-fit: cover;
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
    align-items: center;

    font-size: 18px;
    font-weight: bold;
  }

  .card-title-note-img {
    width: 100%;
  }

  .card-desc {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
  }
`;

// interface Props extends Restaurant { }

const HomeCard = ({
  titulo,
  descricao,
  tipo,
  capa,
  avaliacao,
  destacado,
  id,
}: Restaurant) => {
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
            <span>{avaliacao.toString() + " "}</span>
            <img className="card-title-note-img" src={star} alt="Star" />
          </div>
        </div>
        <p className="card-desc">{descricao}</p>
        <Link to={`/restaurante/${id}`}>
          <Button>Saiba Mais</Button>
        </Link>
      </div>
    </Card>
  );
};

export default HomeCard;
