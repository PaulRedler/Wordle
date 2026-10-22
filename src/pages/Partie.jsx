import GetResultat from "../services/ResultatService";
import { useEffect, useState } from "react";
import GetMotDuJour from "../services/MotDuJourService";
import Grille from "../components/Grille";
import Toast from "../components/Toast";
import Resultats from "../components/Resultats";

export default function Partie() {
    const [motDuJour, setMotDuJour] = useState("");
    const [indexLigne, setIndexLigne] = useState(0)
    const [indexColonne, setIndexColonne] = useState(0)
    const[points,setPoints]=useState(0)

    //booleen affichage
    const [defaite,setDefaite]=useState(false)
    const [victoire,setVictoire]=useState(false)
    const[afficherResultat, setAfficherResultat]=useState(false)

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

    function gererTouche(e) {
        if (e.key === "Backspace") {
            setIndexColonne(i => Math.max(0, i - 1));
        } else if (e.key === "Enter") {
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

    function VerifierMot()
    {
        let motActuel = grilleJeu[indexLigne].join("");
        let result = GetResultat(motDuJour, motActuel,indexLigne);

        let nvCouleurs = []
        couleurs.forEach(ligneCouleur=> nvCouleurs.push(ligneCouleur));
        nvCouleurs[indexLigne]=result[0];
        setCouleurs(nvCouleurs);

        setPoints(result[2])
        setIndexLigne(indexLigne+1);
        setIndexColonne(0);

        if (result[1]) {
            setAfficherResultat(true)
            setVictoire(true)
        }
        else if (!result[1] && indexLigne ==5)
        {
            setAfficherResultat(true)
            setDefaite(true)
        }
        
    }

    return (
        <>
        {defaite === true &&  <Toast titre="Defaite..." message={`Vous n'avez pas trouvé le mot ${motDuJour}`} setBooleen={setDefaite}/>}

        {victoire === true && <Toast titre="Victoire!" message="Vous avez gagnez !" setBooleen={setVictoire} />}
        {(defaite == true ||victoire == true) && <Resultats points = {points}/>}

            <div id="grille">
            
                <Grille indexColonne={indexColonne} indexLigne = {indexLigne }couleurs={couleurs} grille={grilleJeu} onChange={setGrilleJeu} />
            
            </div>
        </>
    );
}
