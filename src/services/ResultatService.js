export default function GetResultat(motDuJour,motEssaye, ligne)
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
            nbLettresBonnes +=1
            continue;
        }
        else if(lettresValides.includes(lettresEssayes[i]))
        {
            couleursLigne.push("yellow");
        }
        else
        {
            couleursLigne.push("grey");
        }
    }
    gagner = nbLettresBonnes === lettresValides.length;
    if(gagner) points = GetPoints(ligne)
    return [couleursLigne, gagner, points];

    function GetPoints(ligne)
    {
        return 600 - ligne*100
    }
    
}