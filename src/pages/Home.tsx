import styled from "styled-components";
import HomeCard from "../components/HomeCard";
import Header from "../components/Header";

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 40px 80px;

  margin-bottom: 120px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, auto);
    place-content: center;
  }
`;

const Home = () => (
  <>
    <Header />
    <CardList className="container">
      <HomeCard />
      <HomeCard />
      <HomeCard />
      <HomeCard />
      <HomeCard />
      <HomeCard />
    </CardList>
  </>
);

export default Home;
