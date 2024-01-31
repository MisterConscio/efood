import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaskInput from "react-input-mask";
import * as Yup from "yup";
import { useFormik } from "formik";

import { RootReducer } from "../store";
import { close, remove } from "../store/cart";

import styled from "styled-components";
import { colors } from "../styles";
import trashIcon from "../assets/images/trash-icon.png";

import Button from "./Button";
import { priceFormat } from "../utils";
import { usePurchaseMutation } from "../services/api";

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

  button[type="button"],
  button[type="submit"] {
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    max-width: 300px;
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

const Form = styled.form`
  padding-block: 1rem 2rem;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;

  & > * {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    grid-column: span 4;
  }

  label[for="cardNumber"] {
    grid-column: span 3;
  }

  label[for="cardCode"] {
    grid-column: span 1;
  }

  label[for="zipCode"],
  label[for="number"],
  label[for="cardExpireMonth"],
  label[for="cardExpireYear"] {
    grid-column: span 2;
  }

  label {
    font-size: 14px;
    font-weight: bold;
    color: ${colors.foregroundAlt};
  }

  input {
    padding: 8px;
    border: none;

    font-size: 14px;
    font-weight: bold;

    color: #4b;
    background: ${colors.backgroundAlt};

    &.error {
      outline: 2px solid #665757;
    }
  }

  button[type="submit"] {
    margin-top: 1.5rem;
    margin-bottom: 0;
  }
`;

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart);
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation();
  const dispatch = useDispatch();

  const [paymentStep, setPaymentStep] = useState(0);

  const closeCart = () => {
    dispatch(close());
  };

  const getTotalPrice = () => {
    return items.reduce((sum, current) => {
      return (sum += current.preco);
    }, 0);
  };

  const form = useFormik({
    initialValues: {
      receiver: "",
      description: "",
      city: "",
      zipCode: "",
      number: "",
      complement: "",
      cardName: "",
      cardNumber: "",
      cardCode: "",
      cardExpireMonth: "",
      cardExpireYear: "",
    },
    validationSchema: Yup.object({
      receiver: Yup.string().when((_, schema) =>
        paymentStep === 1 ? schema.required("Obrigatório") : schema,
      ),
      description: Yup.string().when((_, schema) =>
        paymentStep === 1 ? schema.required("Obrigatório") : schema,
      ),
      city: Yup.string().when((_, schema) =>
        paymentStep === 1 ? schema.required("Obrigatório") : schema,
      ),
      zipCode: Yup.string().when((_, schema) =>
        paymentStep === 1 ? schema.required("Obrigatório") : schema,
      ),
      number: Yup.string().when((_, schema) =>
        paymentStep === 1 ? schema.required("Obrigatório") : schema,
      ),
      complement: Yup.string().when((_, schema) =>
        paymentStep === 1 ? schema : schema,
      ),
      cardName: Yup.string().when((_, schema) =>
        paymentStep === 2 ? schema.required("Obrigatório") : schema,
      ),
      cardNumber: Yup.string().when((_, schema) =>
        paymentStep === 2 ? schema.required("Obrigatório") : schema,
      ),
      cardCode: Yup.string().when((_, schema) =>
        paymentStep === 2 ? schema.required("Obrigatório") : schema,
      ),
      cardExpireMonth: Yup.string().when((_, schema) =>
        paymentStep === 2 ? schema.required("Obrigatório") : schema,
      ),
      cardExpireYear: Yup.string().when((_, schema) =>
        paymentStep === 2 ? schema.required("Obrigatório") : schema,
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      purchase({
        products: items.map((item) => ({
          id: item.id,
          price: item.preco,
        })),
        delivery: {
          receiver: values.receiver,
          address: {
            description: values.description,
            city: values.city,
            zipCode: values.zipCode,
            number: Number(values.number),
            complement: values.complement,
          },
        },
        payment: {
          card: {
            name: values.cardName,
            number: values.cardNumber,
            code: Number(values.cardCode),
            expires: {
              month: Number(values.cardExpireMonth),
              year: Number(values.cardExpireYear),
            },
          },
        },
      });
      resetForm();
    },
  });

  const checkInputHasError = (field: string) => {
    const isTouched = field in form.touched;
    const isInvalid = field in form.errors;

    const hasError = isTouched && isInvalid;

    return hasError;
  };

  function handleFinnish() {
    closeCart();
    setPaymentStep(0);
    window.location.reload();
  }

  return (
    <Container style={{ display: isOpen ? "flex" : "none" }}>
      <Overlay onClick={closeCart} />
      <SidedBar>
        {paymentStep === 0 ? (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <Item key={item.id}>
                  <img className="cart-image" src={item.foto} height={80} />
                  <div className="cart-content">
                    <h3>{item.nome}</h3>
                    <span>{priceFormat(item.preco)}</span>
                  </div>
                  <img
                    className="trash-icon-img"
                    src={trashIcon}
                    alt="Trash Icon"
                    title="Delete"
                    height={16}
                    onClick={() => dispatch(remove(item.id))}
                  />
                </Item>
              ))}
            </ul>
            <div className="price-total">
              <p>Valor total</p>
              <span>{priceFormat(getTotalPrice())}</span>
            </div>
            <Button onClick={() => setPaymentStep(1)} profileBtn type="button">
              Continuar com a entrega
            </Button>
          </>
        ) : paymentStep === 1 ? (
          <>
            <h4>Entrega</h4>
            <Form onSubmit={form.handleSubmit}>
              <label htmlFor="receiver">
                Quem irá receber
                <input
                  value={form.values.receiver}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={checkInputHasError("receiver") ? "error" : ""}
                  name="receiver"
                  id="receiver"
                  type="text"
                />
              </label>
              <label htmlFor="description">
                Endereço
                <input
                  value={form.values.description}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={checkInputHasError("description") ? "error" : ""}
                  name="description"
                  id="description"
                  type="text"
                />
              </label>
              <label htmlFor="city">
                Cidade
                <input
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.city}
                  className={checkInputHasError("city") ? "error" : ""}
                  name="city"
                  id="city"
                  type="text"
                />
              </label>
              <label htmlFor="zipCode">
                CEP
                <MaskInput
                  mask="99999-999"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.zipCode}
                  className={checkInputHasError("zipCode") ? "error" : ""}
                  name="zipCode"
                  id="zipCode"
                  type="text"
                />
              </label>
              <label htmlFor="number">
                Número
                <input
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.number}
                  className={checkInputHasError("number") ? "error" : ""}
                  name="number"
                  id="number"
                  type="text"
                />
              </label>
              <label htmlFor="complement">
                Complemento (Opcional)
                <input
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.complement}
                  className={checkInputHasError("complement") ? "error" : ""}
                  name="complement"
                  id="complement"
                  type="text"
                />
              </label>
            </Form>
            <Button onClick={() => setPaymentStep(2)} profileBtn type="button">
              Continuar com o pagamento
            </Button>
            <Button onClick={() => setPaymentStep(0)} profileBtn type="button">
              Voltar para o carrinho
            </Button>
          </>
        ) : (
          <>
            {isSuccess && data ? (
              <div>
                <h2>Pedido Realizado - {data.orderId}</h2>
                <p style={{ paddingBlock: "1rem" }}>
                  Estamos felizes em informar que seu pedido já está em processo
                  de preparação e, em breve, será entregue no endereço
                  fornecido.
                </p>
                <p style={{ paddingBottom: "1rem" }}>
                  Gostaríamos de ressaltar que nossos entregadores não estão
                  autorizados a realizar cobranças extras.
                </p>
                <p style={{ paddingBottom: "1rem" }}>
                  Lembre-se da importância de higienizar as mãos após o
                  recebimento do pedido, garantindo assim sua segurança e
                  bem-estar durante a refeição.
                </p>
                <p style={{ paddingBottom: "1rem" }}>
                  Esperamos que desfrute de uma deliciosa e agradável
                  experiência gastronômica. Bom apetite!
                </p>
                <Button onClick={handleFinnish} profileBtn type="button">
                  Concluir
                </Button>
              </div>
            ) : (
              <>
                <h4>
                  Pagamento - Valor a pagar {priceFormat(getTotalPrice())}
                </h4>
                <Form onSubmit={form.handleSubmit}>
                  <label htmlFor="cardName">
                    Nome no cartão
                    <input
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      value={form.values.cardName}
                      className={checkInputHasError("cardName") ? "error" : ""}
                      name="cardName"
                      id="cardName"
                      type="text"
                    />
                  </label>
                  <label htmlFor="cardNumber">
                    Número do cartão
                    <MaskInput
                      mask="9999 9999 9999 9999"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      value={form.values.cardNumber}
                      className={
                        checkInputHasError("cardNumber") ? "error" : ""
                      }
                      name="cardNumber"
                      id="cardNumber"
                      type="text"
                    />
                  </label>
                  <label htmlFor="cardCode">
                    CVV
                    <MaskInput
                      mask="999"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      value={form.values.cardCode}
                      className={checkInputHasError("cardCode") ? "error" : ""}
                      name="cardCode"
                      id="cardCode"
                      type="text"
                    />
                  </label>
                  <label htmlFor="cardExpireMonth">
                    Mês de vencimento
                    <MaskInput
                      mask="99"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      value={form.values.cardExpireMonth}
                      className={
                        checkInputHasError("cardExpireMonth") ? "error" : ""
                      }
                      name="cardExpireMonth"
                      id="cardExpireMonth"
                      type="text"
                    />
                  </label>
                  <label htmlFor="cardExpireYear">
                    Ano de Vencimento
                    <MaskInput
                      mask="9999"
                      value={form.values.cardExpireYear}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={
                        checkInputHasError("cardExpireYear") ? "error" : ""
                      }
                      name="cardExpireYear"
                      id="cardExpireYear"
                      type="text"
                    />
                  </label>
                  <Button profileBtn disabled={isLoading} type="submit">
                    {isLoading ? "Finalizando compra..." : "Finalizar comprar"}
                  </Button>
                  <Button
                    onClick={() => setPaymentStep(1)}
                    profileBtn
                    type="button"
                  >
                    Voltar para a ediçao de endereço
                  </Button>
                </Form>
              </>
            )}
          </>
        )}
      </SidedBar>
    </Container>
  );
};

export default Cart;
