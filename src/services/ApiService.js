export default async function motExiste(mot) {
    const url = new URL("https://fr.wiktionary.org/w/api.php");

    url.search = new URLSearchParams({
        action: "query",
        titles: mot,
        format: "json",
        formatversion: "2",
        origin: "*"
    });

    const response = await fetch(url); // rejette si le réseau est coupé
    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }

    const data = await response.json();
    const page = data.query.pages[0];

    return !page.missing && !page.invalid;
}