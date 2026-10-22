import motsSolutions from "../data/mots-solutions.json";

export default function GetMotDuJour()
{
    let motDuJour = "";
    const date = new Date();
    const jour = date.getDay()
    const mois = (date.getMonth()-1)*30;
    const nombreEnvoye = jour + mois %300;
    motDuJour = motsSolutions[nombreEnvoye];
    return motDuJour;
    
}