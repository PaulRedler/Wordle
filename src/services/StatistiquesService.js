import baseData from "../data/scores.json"

function chargerParties()
{
    const data = JSON.parse((localStorage.getItem("parties")));
    if(!data) return baseData.parties
    else return data
}

export function GetPartiesJoues()
{
    const pseudo = localStorage.getItem("pseudo") ?? "Anonyme";
    return chargerParties().filter(p => p.pseudo === pseudo);
}
export function GetNombrePartiesJouees()
{
    return GetPartiesJoues().length;
}

export function GetPourcentageVictoire() {
    const total = GetNombrePartiesJouees();
    if (total === 0) return 0;
    return GetPartiesJoues().filter(p => p.victoire).length / total * 100;
}
export function GetSerieEnCours() {
    const parties = GetPartiesJoues().toSorted((a, b) => b.date.localeCompare(a.date)); 
    let serie = 0;
    let serieEnCours = true;

    parties.forEach(p => {
        if (serieEnCours && p.victoire) {
            serie++;
        } else {
            serieEnCours = false;
        }
    });

    return serie;
}
export function GetMeilleureSerie()
{
    const parties = GetPartiesJoues().toSorted((a, b) => a.date.localeCompare(b.date));
    let meilleureSerie = 0;
    let serieActuelle = 0;

    parties.forEach(p => {
        if (p.victoire) {
            serieActuelle++;
            if (serieActuelle > meilleureSerie) meilleureSerie = serieActuelle;
        } else {
            serieActuelle = 0;
        }
    });

    return meilleureSerie;
}
export function TotalPoints()
{
    const partiesJouees= GetPartiesJoues()
    let points = 0
    partiesJouees.forEach(element => {
        points +=element.points 
    })
    return points;
}

export function GetRepartitionDesVictoires()
{
    const partiesJouees = GetPartiesJoues();
    let repartition = {1:0,2:0,3:0,4:0,5:0,6:0}
    partiesJouees.forEach(element=>{
        if(element.victoire) repartition[element.essais]+=1
    })
    return repartition
}

