import { getTop10 } from "../services/ScoreService"
export default function TableauScore({})
{
    return(
        <>
        {getTop10().map((partie, i)=>(
            <div>
                <h1>{partie.pseudo}</h1>
                <p>{i+1}</p>

                <p>{partie.mot}</p>
               {partie.victoire === true && <p>Victoire!</p>}

               {partie.victoire !== true &&  <p>Defaite...</p>}

                <p>{partie.essais}</p>

                <p>{partie.points}</p>
                <p>{new Date(partie.date).toLocaleDateString("fr-FR")}</p>

            </div>
        ))}
        </>
    )
}