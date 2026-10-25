
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Accueil() {
    const [pseudo, setPseudo] = useState("");
        const [pseudoTemp, setPseudoTemp] = useState("");


useEffect(() => {
    const pseudoEnregistre = localStorage.getItem("pseudo") ?? "";
    setPseudo(pseudoEnregistre);
    console.log(pseudoEnregistre);
}, []);

    
    function ValiderPseudo() {
        localStorage.setItem("pseudo", (pseudoTemp));
        console.log(localStorage.getItem("pseudo"));
        setPseudo(pseudoTemp);
    }
    function SupprimerPseudo()
    {
        localStorage.removeItem("pseudo");
        setPseudo("");
    }

    return (
        <>
            <h1>WORDAY</h1>

            <p>
                Bienvenue dans le WorDay, un jeu dont le but est de trouver
                un mot de cinq lettres en six essais au maximum. Après
                chaque proposition, chaque lettre change de couleur :
            </p>

            <ul>
                <li>gris : la lettre n'est pas dans le mot, ou pas autant de fois que proposé.</li>
                <li>vert : la lettre est dans le mot, à la bonne place ;</li>
                <li>jaune : la lettre est dans le mot, mais à une autre place ;</li>
            </ul>

            <p>Les propositions doivent être de vrais mots français.</p>
            {pseudo !== "" && <p> Bonjour, {pseudo}</p>}

          {pseudo === "" &&
                      <>
            <input
                id="pseudo"
                value={pseudoTemp}
                onChange={(e) => setPseudoTemp(e.target.value)}
                placeholder="Entre ton pseudo"
            />

            <button
                id="validerPseudo"
                className="bouton"
                onClick={ValiderPseudo}
            >
                Valider
            </button>
                        </>
            }

{pseudo !== "" && <button id="removePseudo" onClick={SupprimerPseudo}>Supprimer mon pseudo</button>}      
        <Link to={`/Partie`}>Partie du jour</Link>
        <Link to={`/TableauScore`}>Tableau des scores</Link>

        <Link to={`/Statistiques`}>Statistiques</Link>

        <Link to={`/Regles`}>Règles</Link>


  </>
    );
    
}
