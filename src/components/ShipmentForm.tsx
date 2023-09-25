import styled from "styled-components";
import { colors } from "../styles";

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
