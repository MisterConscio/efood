import styled from "styled-components";
import { colors } from "../styles";
import { MouseEventHandler } from "react";

const Btn = styled.button<{ profileBtn: boolean }>`
  background-color: ${colors.foreground};
  color: ${colors.foregroundAlt};

  ${(props) =>
    props.profileBtn &&
    `
    width: 100%;
    background-color: ${colors.backgroundAlt};
    color: ${colors.foreground};
  `}

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
  children: string | string[];
  type?: "button" | "reset" | "submit" | undefined;
  profileBtn?: boolean;
  onClick?: MouseEventHandler;
  disabled?: boolean;
};

const Button = ({
  children,
  type = "button",
  profileBtn = false,
  onClick,
  disabled,
}: Props) => (
  <Btn
    onClick={onClick}
    disabled={disabled}
    profileBtn={profileBtn}
    type={type}
  >
    {children}
  </Btn>
);

export default Button;
