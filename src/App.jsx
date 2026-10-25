import { Routes, Route } from "react-router";
import Accueil from "./pages/Accueil.jsx";
import Partie from "./pages/Partie.jsx";
import Regles from "./pages/Regles.jsx";
import TableauScore from "./pages/TableauScore.jsx";
import Statistiques from "./pages/Statistiques.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/partie" element={<Partie />} />
      <Route path="/accueil" element={<Accueil />} />
      <Route path="/regles" element={<Regles/>} />
      <Route path="/tableauscore" element={<TableauScore />} />
      <Route path="/statistiques" element={<Statistiques />} />
    </Routes>
  );
}
export default App
