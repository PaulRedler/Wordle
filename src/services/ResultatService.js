export default function GetResultat(motDuJour,motEssaye, ligne, lettresCouleur)
{
    //gris : lettre pas contenu
    //jaune : mauvaise place
    //vert : bonne place
    let couleursLigne = [];
    let gagner = false;
    let points = 0;

    let nbLettresBonnes = 0;
    let lettresValides = motDuJour.split("");
    let lettresEssayes = motEssaye.split("");
    console.log(lettresEssayes+"----"+lettresValides)
    for(let i =0; i < lettresValides.length;i++)
    {
        if(lettresValides[i]==lettresEssayes[i])
        {
            couleursLigne.push("green");
            lettresCouleur[lettresEssayes[i]]="green"
            nbLettresBonnes +=1
            continue;
        }
        else if(lettresValides.includes(lettresEssayes[i]))
        {
            couleursLigne.push("yellow");
            lettresCouleur[lettresEssayes[i]]="yellow"

        }
        else
        {
            couleursLigne.push("grey");
            lettresCouleur[lettresEssayes[i]]="grey"

        }
    }
    gagner = nbLettresBonnes === lettresValides.length;
    if(gagner) points = GetPoints(ligne)
    return [couleursLigne, gagner, points, lettresCouleur];

    function GetPoints(ligne)
    {
        return 600 - ligne*100
    }
    
}