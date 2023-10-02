import styled from "styled-components";
import InputMask from "react-input-mask";
import { colors } from "../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePurchaseMutation } from "../services/api";
import { useSelector } from "react-redux";
import { RootReducer } from "../store";
import Button from "./Button";

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

  label[for="cardCVV"] {
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
  }
`;

export default function PaymentForm({ page = 1 }: { page: 1 | 2 }) {
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation();
  const { items } = useSelector((state: RootReducer) => state.cart);

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
      cardCvv: "",
      cardExpireMonth: "",
      cardExpireYear: "",
    },
    validationSchema: Yup.object({
      receiver: Yup.string()
        .min(5, "O nome precisa ter pelo menos 5 caracteres")
        .required("Obrigatório"),
      description: Yup.string().required("Obrigatório"),
      city: Yup.string().required("Obrigatório"),
      zipCode: Yup.string().min(5).max(5).required("Obrigatório"),
      number: Yup.string().required("Obrigatório"),
      complement: Yup.string(),
      cardName: Yup.string().required("Obrigatório"),
      cardNumber: Yup.string().required("Obrigatório"),
      cardCvv: Yup.string().required("Obrigatório"),
      cardExpireMonth: Yup.string().required("Obrigatório"),
      cardExpireYear: Yup.string().required("Obrigatório"),
    }),
    onSubmit: (values) => {
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
            number: values.number,
            complement: values.complement,
          },
        },
        payment: {
          card: {
            name: values.cardName,
            number: values.cardNumber,
            code: Number(values.cardCvv),
            expires: {
              month: Number(values.cardExpireMonth),
              year: Number(values.cardExpireYear),
            },
          },
        },
      });
    },
  });

  return (
    <>
      {isSuccess && data ? (
        <p>Pedido feito</p>
      ) : (
        <Form onSubmit={form.handleSubmit}>
          {page == 1 ? (
            <>
              <label htmlFor="receiver">
                Quem irá receber
                <input
                  value={form.values.receiver}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
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
                  name="city"
                  id="city"
                  type="text"
                />
              </label>
              <label htmlFor="zipCode">
                CEP
                <InputMask
                  mask="99999-999"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.zipCode}
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
                  name="complement"
                  id="complement"
                  type="text"
                />
              </label>
            </>
          ) : (
            <>
              <label htmlFor="cardName">
                Nome no cartão
                <input
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.cardName}
                  name="cardName"
                  id="cardName"
                  type="text"
                />
              </label>
              <label htmlFor="cardNumber">
                Número do cartão
                <InputMask
                  mask="9999 9999 9999 9999"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.cardNumber}
                  name="cardNumber"
                  id="cardNumber"
                  type="text"
                />
              </label>
              <label htmlFor="cardCvv">
                CVV
                <InputMask
                  mask="999"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.cardCvv}
                  name="cardCvv"
                  id="cardCvv"
                  type="text"
                />
              </label>
              <label htmlFor="cardExpireMonth">
                Mês de vencimento
                <InputMask
                  mask="99"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.cardExpireMonth}
                  name="cardExpireMonth"
                  id="cardExpireMonth"
                  type="text"
                />
              </label>
              <label htmlFor="cardExpireYear">
                Ano de Vencimento
                <InputMask
                  mask="99"
                  value={form.values.cardExpireYear}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  name="cardExpireYear"
                  id="cardExpireYear"
                  type="text"
                />
              </label>
              <Button profileBtn disabled={isLoading} type="submit">
                {isLoading ? "Finalizando compra..." : "Finalizar comprar"}
              </Button>
            </>
          )}
        </Form>
      )}
    </>
  );
}
