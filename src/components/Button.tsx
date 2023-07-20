import styled from "styled-components";
import { colors } from "../styles";

const Btn = styled.button`
  background-color: ${colors.foreground};
  color: ${colors.foregroundAlt};

  border: none;
  padding: 4px 6px;

  font-size: 14px;
  font-weight: bold;

  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
  }
`;

type Props = {
  children: string;
  type?: "button" | "reset" | undefined;
};

const Button = ({ children, type = "button" }: Props) => (
  <Btn type={type}>{children}</Btn>
);

export default Button;
