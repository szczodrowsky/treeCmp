import { Navbar } from "./Navbar/Navbar";
import { Footer } from "./Footer/Footer";
import { Form } from "./Form/Form";
import { Routes, Route } from "react-router-dom";
import { NewicksList } from "./NewicksList/NewicksList";
import { OutputFiles } from "./OutputFiles/OutputFiles";

function Dashboard() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="newicks" element={<NewicksList />} />
          <Route path="results" element={<OutputFiles />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Dashboard;
