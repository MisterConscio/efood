import styled from "styled-components";
import { colors } from "../styles";

import logo from "../assets/images/logo.jpg";
import insta from "../assets/images/insta-icon.svg";
import face from "../assets/images/face-icon.svg";
import twitter from "../assets/images/twitter-icon.svg";
import { Link } from "react-router-dom";

const Foot = styled.footer`
  background-color: ${colors.backgroundAlt};

  padding: 40px;
  text-align: center;

  > * {
    display: inline-block;
    margin-inline: auto;
  }

  .social-links {
    display: flex;
    place-content: center;
    gap: 8px;

    margin-block: 32px 80px;
  }
`;

const Footer = () => (
  <Foot>
    <Link to="/">
      <img src={logo} alt="Logo" />
    </Link>
    <ul className="social-links">
      <li>
        <a href="#">
          <img src={insta} alt="Instagram" title="Instagram" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={face} alt="Facebook" title="Facebook" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={twitter} alt="Twitter" title="Twitter" />
        </a>
      </li>
    </ul>
    <small className="footer-text">
      A efood é uma plataforma para divulgação de estabelecimentos, a
      responsabilidade pela entrega, qualidade dos produtos é toda do
      estabelecimento contratado.
    </small>
  </Foot>
);

export default Footer;
