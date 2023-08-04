import styled from "styled-components";
import CustomHeader from "../components/CustomHeader";
import ProfileCard from "../components/ProfileCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Restaurant } from "./Home";

const Grid = styled.main`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 32px;

  margin-bottom: 120px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, auto);
    place-content: center;
  }
`;

const RestaurantPage = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>();

  const { id: pageId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes/${pageId}`, {
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
  }, [pageId]);

  if (!restaurant) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <CustomHeader {...restaurant} />
      <Grid className="container">
        {restaurant.cardapio.map((item) => (
          <ProfileCard key={item.id} {...item} />
        ))}
      </Grid>
    </>
  );
};

export default RestaurantPage;
