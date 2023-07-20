import styled from "styled-components";

import logo from "../assets/images/logo.jpg";
import headerBg from "../assets/images/header-bg.jpg";

const Head = styled.header`
  background-image: url("${headerBg}");
  padding: 40px;

  text-align: center;
  margin-bottom: 80px;

  img {
    margin-inline: auto;
  }

  h2 {
    margin-top: 132px;
    font-size: 36px;
    text-wrap: balance;
  }
`;

const Header = () => (
  <Head>
    <img src={logo} alt="Logo" />
    <h2>
      Viva experiências gastronômicas
      <br />
 no conforto da sua casa
    </h2>
  </Head>
);

export default Header;
