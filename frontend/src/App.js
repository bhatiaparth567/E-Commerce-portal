import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/" component={Homescreen} exact />
            <Route path="/product/:id" component={ProductScreen} />
            {
              //? at the end to make it optional
            }
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
