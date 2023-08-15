import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Pages from "./routes";
import { GlobalCss } from "./styles";

import Cart from "./components/Cart";
import Footer from "./components/Footer";

import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalCss />
        <Pages />
        <Footer />
        <Cart />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
