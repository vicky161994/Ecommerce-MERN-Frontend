import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/layouts/Header.jsx";
import Footer from "./components/layouts/Footer.jsx";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Homepage from "./pages/Homepage";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route path="/login" component={Login} exact />
        <Route path="/cart" component={Cart} />
        <Route path="/signup" component={Signup} exact />
        <Route path="/account" component={Account} exact />
        <Route path="/" component={Homepage} exact />
        <Route
          path="/product/:category/:title/:id"
          component={ProductDetail}
          exact
        />
      </main>
      <Footer pathName={window.location.pathname} />
    </BrowserRouter>
  );
}

export default App;
