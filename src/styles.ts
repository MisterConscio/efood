import { createGlobalStyle } from "styled-components";

export const colors = {
  background: "#FFF8F2",
  foreground: "#E66767",
  foregroundAlt: "#FFEBD9",
  backgroundAlt: "#FFEBD9",
};

export const GlobalCss = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    list-style: none;
  }

  img {
    display: block;
  }

  ul {
    padding-left: 0;
  }

  body {
    font-family: Roboto, sans-serif;
    background-color: ${colors.background};
    color: ${colors.foreground};
  }

  .container {
    max-width: 1024px;
    margin-inline: auto;
  }
`;
