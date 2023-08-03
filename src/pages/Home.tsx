import styled from "styled-components";
import HomeCard from "../components/HomeCard";
import Header from "../components/Header";
import { useEffect, useState } from "react";

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

export type Restaurant = {
  id: number;
  titulo: string;
  destacado: boolean;
  avaliacao: number;
  capa: string;
  descricao: string;
  tipo: string;
};

const Home = () => {
  const [restaurants, setRestaurant] = useState<Restaurant[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://fake-api-tau.vercel.app/api/efood/restaurantes", {
      signal: controller.signal,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRestaurant(data);
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          console.error("Error:", error);
        }
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <CardList className="container">
        {restaurants.map((restaurant) => (
          <HomeCard key={restaurant.id} {...restaurant} />
        ))}
      </CardList>
    </>
  );
};

export default Home;
