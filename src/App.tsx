import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Pages from "./routes";
import { GlobalCss } from "./styles";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <GlobalCss />
      <Pages />
      <Footer />
      <Cart />
    </BrowserRouter>
  );
}

export default App;
