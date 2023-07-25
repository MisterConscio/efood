import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Pages from "./routes";
import { GlobalCss } from "./styles";

function App() {
  return (
    <BrowserRouter>
      <GlobalCss />
      <Pages />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
