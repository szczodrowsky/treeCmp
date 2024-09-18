import { Navbar } from "./Navbar/Navbar";
import { Footer } from "./Footer/Footer";
import { Form } from "./Form/Form";
// import { NewicksList } from "./NewicksList/NewicksList";

import "./styles.css";

function Dashboard() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Form />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Dashboard;
