import styled from "styled-components";
import CustomHeader from "../components/CustomHeader";
import ProfileCard from "../components/ProfileCard";

const Grid = styled.main`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 32px;

  margin-bottom: 120px;
`;

const Profiles = () => (
  <>
    <CustomHeader />
    <Grid className="container">
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </Grid>
  </>
);

export default Profiles;
