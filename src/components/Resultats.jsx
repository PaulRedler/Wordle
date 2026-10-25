import {Link} from "react-router"
export default function Resultats ({points, motDuJour})
{
    return(
        <>
        <p>Vous avez {points} points</p>
        <a href="/Partie">Partie du jour</a>

        <Link to={`/Accueil`}>Retourner a l'accueil</Link>
        <a href={`https://fr.wiktionary.org/wiki/${motDuJour}`}>Le mot du jour :</a>  
              </>
    )
}