import styled from "styled-components";

import logo from "../assets/images/logo.jpg";
import headerBg from "../assets/images/header-bg.jpg";
import { Link } from "react-router-dom";

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
    <Link to="/">
      <img src={logo} alt="Logo" />
    </Link>
    <h2>
      Viva experiências gastronômicas
      <br />
 no conforto da sua casa
    </h2>
  </Head>
);

export default Header;
