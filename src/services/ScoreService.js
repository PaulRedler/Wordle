import baseData from "../data/scores.json"

function chargerParties()
{
    const data = JSON.parse(localStorage.getItem("parties"));
    if(!data) return baseData.parties
    else return data
}

export function addScore(partie) {
    const parties = chargerParties();
    parties.push({ ...partie, date: new Date().toISOString() });
    localStorage.setItem("parties", JSON.stringify(parties));
}

export function getTop10() {
    return chargerParties()
        .filter(p => p.victoire)
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);
}
