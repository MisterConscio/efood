import { useParams } from "react-router-dom";
import { useGetCardapioQuery } from "../services/api";

import styled from "styled-components";

import CustomHeader from "../components/CustomHeader";
import ProfileCard from "../components/ProfileCard";

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
  const { id } = useParams();
  const { data: restaurant } = useGetCardapioQuery(id!);

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
