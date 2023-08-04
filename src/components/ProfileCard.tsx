import styled from "styled-components";
import { colors } from "../styles";

import Button from "./Button";

import { useEffect, useRef, useState } from "react";

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

const Dialog = styled.dialog`
  margin: auto;
  padding: 0;
  max-width: min(1000px, 70vw);

  border: none;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .modal-header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: absolute;
  }

  .modal-media > img {
    object-fit: cover;
  }

  .modal-body {
    padding: 32px;
    display: flex;
    gap: 24px;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h4 {
      font-size: 18px;
    }

    p {
      line-height: 22px;
      font-size: 14px;
    }

    button {
      align-self: flex-start;
      width: auto;
    }
  }

  .close-modal-btn {
    border: none;
    padding: 16px 10px;

    font-size: 32px;
    line-height: 0;
    cursor: pointer;

    background-color: transparent;
    color: ${colors.foregroundAlt};
  }

  background-color: ${colors.foreground};
  color: ${colors.foregroundAlt};
`;

export const priceFormat = (price = 0) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

type Props = {
  foto: string;
  preco: number;
  nome: string;
  descricao: string;
  porcao: string;
};

const ProfileCard = ({ foto, nome, porcao, preco, descricao }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showModal) {
      dialogRef?.current?.showModal();
    } else {
      dialogRef?.current?.close();
    }
  }, [showModal]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <>
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
        </div>
        <Button onClick={handleModalOpen} profileBtn>
          Adicionar ao carrinho
        </Button>
      </Card>
      {showModal && (
        <Dialog ref={dialogRef}>
          <div className="modal-header">
            <button
              className="close-modal-btn"
              type="reset"
              onClick={handleModalClose}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-media">
              <img src={foto} width={280} height={280} alt="thumb" />
            </div>
            <div className="modal-content">
              <h4>{nome}</h4>
              <p>{descricao}</p>
              <p>Serve: de {porcao}</p>
              <Button profileBtn>
                Adicionar ao carrinho - {priceFormat(preco)}
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ProfileCard;
