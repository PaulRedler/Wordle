import GetResultat from "../services/ResultatService";
import {addScore} from "../services/ScoreService"
import { useEffect, useState } from "react";
import GetMotDuJour from "../services/MotDuJourService";
import Grille from "../components/Grille";
import Toast from "../components/Toast";
import Resultats from "../components/Resultats";
import motExiste from "../services/ApiService";
import Loading from "../components/Loading";
import Clavier from "../components/Clavier"

export default function Partie() {
    const [motDuJour, setMotDuJour] = useState("");
    const [indexLigne, setIndexLigne] = useState(0)
    const [indexColonne, setIndexColonne] = useState(0)
    const[points,setPoints]=useState(0)
    const[lettresCouleur, setLettresCouleur]=useState({A: "white", Z: "white", E: "white", R: "white", T: "white",
    Y: "white", U: "white", I: "white", O: "white", P: "white",
    Q: "white", S: "white", D: "white", F: "white", G: "white",
    H: "white", J: "white", K: "white", L: "white", M: "white",
    W: "white", X: "white", C: "white", V: "white", B: "white", N: "white"})

    //booleen affichage
    const [defaite,setDefaite]=useState(false)
    const [victoire,setVictoire]=useState(false)
    const[motInvalide, setMotInvalide]=useState(false)
    const[chargementApi, setChargementApi]=useState(false)
    const [apiInjoignable, setApiInjoignable] = useState(false);
    const[afficherClavier, setAfficherClavier] = useState(true);
    const [ligneQuiTremble, setLigneQuiTremble] = useState(null);


const DUREE_TREMBLEMENT = 500;   // = 0,5 s
const DUREE_RETOURNEMENT = 1800; // = 4 × 0,3 s de décalage + 0,6 s d'animation


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
const DUREE_RETOURNEMENT = 1800; 
const DUREE_TREMBLEMENT = 500;

    function gererTouche(e) {
        if (indexLigne > 5) return; 

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

    function saisirAvecClic(lettre)
    {
         setGrilleJeu(g =>
            g.map((ligne, i) =>
                i === indexLigne
                    ? ligne.map((c,j) => (j === indexColonne? c=lettre : c = c))
                    : ligne
            ));
            if(indexColonne ==4) VerifierMot();
                else setIndexColonne(indexColonne+1)

    }

function faireTrembler() {
    setLigneQuiTremble(indexLigne);
    setMotInvalide(true);
    setTimeout(() => {
        setLigneQuiTremble(null);
        reinitialiserLigne(); 
    }, DUREE_TREMBLEMENT);
}
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


    async function ValiderMot(motActuel)
    {
        let motValide;
        setChargementApi(true);
        try {
            motValide = await motExiste(motActuel);
        } catch (error) {
            console.error("API injoignable :", error.message);
            setApiInjoignable(true);
            return; 
        } finally {
            setChargementApi(false);
        }

        if (!motValide)
            {
                setMotInvalide(true)
                reinitialiserLigne()
                    faireTrembler();
                            return false
            } 
            return true
    }

    async function VerifierMot()
    {
        let motActuel = grilleJeu[indexLigne].join("");
        console.log(motActuel)
        if(!motActuel ||motActuel.length < 5)
        {
            setMotInvalide(true)
            reinitialiserLigne()
            faireTrembler();
            return
        }

        // API et verification vide ou espace 
        if(!await ValiderMot(motActuel)) return

        let result = GetResultat(motDuJour, motActuel, indexLigne, lettresCouleur);

        let nvCouleurs = [];
        couleurs.forEach(ligneCouleur => nvCouleurs.push(ligneCouleur));
        nvCouleurs[indexLigne] = result[0];
        setCouleurs(nvCouleurs);
        
        //on change les couleurs du clavier
        setLettresCouleur(result[3])
        //on attribue les points
        setPoints(result[2]);

        setIndexLigne(indexLigne + 1);
        setIndexColonne(0);

        if (result[1]) {
        setTimeout(() => setVictoire(true), DUREE_RETOURNEMENT);
                addScore({
                pseudo: localStorage.getItem("pseudo") ?? "Anonyme",
                mot: motDuJour,
                victoire: true,
                essais: indexLigne+1,
                points: result[2]});
        }
        else if (!result[1] && indexLigne == 5) {
            setTimeout(() => setDefaite(true), DUREE_RETOURNEMENT);
            setDefaite(true);
            addScore({
                pseudo: localStorage.getItem("pseudo") ?? "Anonyme",
                mot: motDuJour,
                victoire: false,
                essais: indexLigne,
                points: 0});
        }
        
    }
    return (
        <>
        {chargementApi == true && <Loading message={"Mot en verification..."}/>}
        {apiInjoignable && <Toast titre="Service indisponible" message="Impossible de vérifier le mot pour le moment. Vérifiez votre connexion et réessayez." tempsAffichage={4000} setBooleen={setApiInjoignable}/>}
        {defaite === true &&  <Toast titre="Defaite..." message={`Vous n'avez pas trouvé le mot ${motDuJour}`} setBooleen={setDefaite}/>}
        {motInvalide === true && <Toast titre = "Mot invalide" message={"le mot entré n'existe pas veuillez en saisir un nouveau"} tempsAffichage = {3500} setBooleen={setMotInvalide} />}
        {victoire === true && <Toast titre="Victoire!" message="Vous avez gagnez !" setBooleen={setVictoire} />}
        {(defaite == true ||victoire == true) && <Resultats points = {points} motDuJour={motDuJour}/>}

            <div id="grille">
            
                <Grille indexColonne={indexColonne} indexLigne = {indexLigne }couleurs={couleurs} grille={grilleJeu} onChange={setGrilleJeu}  ligneQuiTremble={ligneQuiTremble}/>
            
            </div>
            <Clavier lettresCouleur={lettresCouleur} onClick={saisirAvecClic} />
        </>
    );
}
