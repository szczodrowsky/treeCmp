import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Form } from "./components/Form/Form";

import "./styles.css";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        {/* <form> */}
        <Form />
        {/* </form> */}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
