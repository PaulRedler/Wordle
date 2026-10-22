import {Link} from "react-router"
export default function Resultats ({points})
{
    return(
        <>
        <p>Vous avez {points} points</p>
        <Link to={`/Accueil`}>Retourner a l'accueil</Link>
        <a href="/Partie">Partie du jour</a>        </>
    )
}