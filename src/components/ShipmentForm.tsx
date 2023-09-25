import styled from "styled-components";
import { colors } from "../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePurchaseMutation } from "../services/api";
import { useSelector } from "react-redux";
import { RootReducer } from "../store";

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

  label[for="CardNumber"] {
    grid-column: span 3;
  }

  label[for="CardCVV"] {
    grid-column: span 1;
  }

  label[for="Cep"],
  label[for="Number"],
  label[for="ExpireMonth"],
  label[for="ExpireYear"] {
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

export function CardPayment() {
  return (
    <Form>
      <label htmlFor="CardName">
        Nome no cartão
        <input name="CardName" id="CardName" type="text" />
      </label>
      <label htmlFor="CardNumber">
        Número do cartão
        <input name="CardNumber" id="CardNumber" type="text" />
      </label>
      <label htmlFor="CardCVV">
        CVV
        <input name="CardCVV" id="CardCVV" type="text" />
      </label>
      <label htmlFor="ExpireMonth">
        Mês de vencimento
        <input name="ExpireMonth" id="ExpireMonth" type="text" />
      </label>
      <label htmlFor="ExpireYear">
        Ano de Vencimento
        <input name="ExpireYear" id="ExpireYear" type="text" />
      </label>
    </Form>
  );
}

export default function Shipment() {
  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation();
  const { items } = useSelector((state: RootReducer) => state.cart);

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      city: "",
      cep: "",
      number: "",
      complement: "",
      cardName: "",
      cardNumber: "",
      cardCvv: "",
      cardExpireMonth: "",
      cardExpireYear: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "O nome precisa ter pelo menos 5 caracteres")
        .required("Obrigatório"),
      email: Yup.string().email("Email inválido").required("Obrigatório"),
      city: Yup.string().required("Obrigatório"),
      cep: Yup.string().required("Obrigatório"),
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
          price: item.preco as number,
        })),
        delivery: {
          name: values.name,
          email: values.email,
          city: values.city,
          cep: values.cep,
          number: values.number,
          complement: values.complement,
        },
        payment: {
          name: values.cardName,
          number: values.cardNumber,
          code: Number(values.cardCvv),
          expires: {
            month: Number(values.cardExpireMonth),
            year: Number(values.cardExpireYear),
          },
        },
      });
    },
  });

  return (
    <Form>
      <label htmlFor="Name">
        Quem irá receber
        <input name="Name" id="Name" type="text" />
      </label>
      <label htmlFor="Address">
        Endereço
        <input name="Address" id="Address" type="text" />
      </label>
      <label htmlFor="City">
        Cidade
        <input name="City" id="City" type="text" />
      </label>
      <label htmlFor="Cep">
        CEP
        <input name="Cep" id="Cep" type="text" />
      </label>
      <label htmlFor="Number">
        Número
        <input name="Number" id="Number" type="text" />
      </label>
      <label htmlFor="Additional">
        Complemento (Opcional)
        <input name="Additional" id="Additional" type="text" />
      </label>
    </Form>
  );
}
