import { Routes, Route } from "react-router";
import Accueil from "./pages/Accueil.jsx";
import Partie from "./pages/Partie.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/partie" element={<Partie />} />
       <Route path="/accueil" element={<Accueil />} />

    </Routes>
  );
}
export default App
