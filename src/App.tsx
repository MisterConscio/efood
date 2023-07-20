import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeList from "./components/HomeList";
import { GlobalCss } from "./styles";

function App() {
  return (
    <>
      <GlobalCss />
      <Header />
      <HomeList />
      <Footer />
    </>
  );
}

export default App;
