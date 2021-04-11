import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";

import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="py-3">
        <Container>
          <Homescreen />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
