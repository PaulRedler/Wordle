import GetResultat from "../services/ResultatService";
import { useEffect, useState } from "react";
import GetMotDuJour from "../services/MotDuJourService";
import Grille from "../components/Grille";
import Toast from "../components/Toast";
import Resultats from "../components/Resultats";
import motExiste from "../services/ApiService";
import Loading from "../components/Loading";

export default function Partie() {
    const [motDuJour, setMotDuJour] = useState("");
    const [indexLigne, setIndexLigne] = useState(0)
    const [indexColonne, setIndexColonne] = useState(0)
    const[points,setPoints]=useState(0)

    //booleen affichage
    const [defaite,setDefaite]=useState(false)
    const [victoire,setVictoire]=useState(false)
    const[motInvalide, setMotInvalide]=useState(false)
    const[chargementApi, setChargementApi]=useState(false)
    const [apiInjoignable, setApiInjoignable] = useState(false);

    const [couleurs, setCouleurs] = useState([
        ["white","white","white","white","white"],
        ["white","white","white","white","white"],
        ["white","white","white","white","white"],
        ["white","white","white","white","white"],
        ["white","white","white","white","white"],
        ["white","white","white","white","white"]
    ]);
    const [grilleJeu, setGrilleJeu] = useState([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ]);
useEffect(() => {
    const grille = document.getElementById("grille");
    if (!grille) return;

    function effacerCase(col) {
        setGrilleJeu(g =>
            g.map((ligne, i) =>
                i === indexLigne
                    ? ligne.map((c, j) => (j === col ? "" : c))
                    : ligne
            )
        );
    }

    function gererTouche(e) {
        if (indexLigne > 5) return; // partie terminée

        if (e.key === "Backspace" && !chargementApi) {
            e.preventDefault();
            if (grilleJeu[indexLigne][indexColonne] !== "") {
                effacerCase(indexColonne);
            } else if (indexColonne > 0) {
                effacerCase(indexColonne - 1);
                setIndexColonne(indexColonne - 1);
            }
        } else if (e.key === "Enter"&& !chargementApi ) {
            if (indexColonne === 4) {
                VerifierMot();
            } else {
                setIndexColonne(i => Math.min(4, i + 1));
            }
        }
    }

    grille.addEventListener("keydown", gererTouche);
    return () => grille.removeEventListener("keydown", gererTouche);
}, [indexColonne, indexLigne, grilleJeu, motDuJour]);


    useEffect(() => {
        const mot = GetMotDuJour();
        setMotDuJour(mot);
        console.log(mot);
    }, []);




    function reinitialiserLigne()
    {
              setGrilleJeu(g =>
            g.map((ligne, i) =>
                i === indexLigne
                    ? ligne.map((c) => (c=""))
                    : ligne
            ));
            setIndexColonne(0)
    }
    async function VerifierMot()
    {
    let motActuel = grilleJeu[indexLigne].join("");
    console.log(motActuel)
    if(!motActuel ||motActuel.length < 5)
    {
        setMotInvalide(true)
        reinitialiserLigne()
        return
    }

    // API
    let motValide;
    setChargementApi(true);
    try {
        motValide = await motExiste(motActuel);
    } catch (error) {
        console.error("API injoignable :", error.message);
        setApiInjoignable(true);
        return; // on garde la ligne telle quelle, le joueur peut réessayer
    } finally {
        setChargementApi(false); // exécuté même après le return
    }

    if (!motValide) {
        setMotInvalide(true);
        reinitialiserLigne();
        return;
    }

    if (!motValide)
        {
            setMotInvalide(true)
            reinitialiserLigne()
                        return
        } 

    let result = GetResultat(motDuJour, motActuel, indexLigne);

    let nvCouleurs = [];
    couleurs.forEach(ligneCouleur => nvCouleurs.push(ligneCouleur));
    nvCouleurs[indexLigne] = result[0];
    setCouleurs(nvCouleurs);

    setPoints(result[2]);
    setIndexLigne(indexLigne + 1);
    setIndexColonne(0);

    if (result[1]) {
        setVictoire(true);
    }
    else if (!result[1] && indexLigne == 5) {
        setDefaite(true);
    }
}

    return (
        <>
        {chargementApi == true && <Loading message={"Mot en verification..."}/>}
        {apiInjoignable && <Toast titre="Service indisponible" message="Impossible de vérifier le mot pour le moment. Vérifiez votre connexion et réessayez." tempsAffichage={4000} setBooleen={setApiInjoignable}/>}
        {defaite === true &&  <Toast titre="Defaite..." message={`Vous n'avez pas trouvé le mot ${motDuJour}`} setBooleen={setDefaite}/>}
        {motInvalide === true && <Toast titre = "Mot invalide" message={"le mot entré n'existe pas veuillez en saisir un nouveau"} tempsAffichage = {3500} setBooleen={setMotInvalide} />}
        {victoire === true && <Toast titre="Victoire!" message="Vous avez gagnez !" setBooleen={setVictoire} />}
        {(defaite == true ||victoire == true) && <Resultats points = {points}/>}

            <div id="grille">
            
                <Grille indexColonne={indexColonne} indexLigne = {indexLigne }couleurs={couleurs} grille={grilleJeu} onChange={setGrilleJeu} />
            
            </div>
        </>
    );
}
