import "./Statistiques.css";
import {
    GetNombrePartiesJouees,
    GetPourcentageVictoire,
    GetSerieEnCours,
    GetMeilleureSerie,
    TotalPoints,
    GetRepartitionDesVictoires
} from "../services/StatistiquesService";

export default function Statistiques() {
    const pseudo = localStorage.getItem("pseudo") ?? "Anonyme";

    const partiesJouees = GetNombrePartiesJouees();
    const pourcentage = Math.round(GetPourcentageVictoire());
    const serieEnCours = GetSerieEnCours();
    const meilleureSerie = GetMeilleureSerie();
    const totalPoints = TotalPoints();
    const repartition = GetRepartitionDesVictoires();

    // plus grande valeur, pour calculer la largeur des barres (au moins 1 pour éviter /0)
    const max = Math.max(1, ...Object.values(repartition));

    const stats = [
        { libelle: "Parties jouées", valeur: partiesJouees },
        { libelle: "Victoires", valeur: `${pourcentage} %` },
        { libelle: "Série en cours", valeur: serieEnCours },
        { libelle: "Meilleure série", valeur: meilleureSerie },
        { libelle: "Total des points", valeur: totalPoints }
    ];

    return (
        <div className="statistiques">
            <h2>Statistiques de {pseudo}</h2>

            {partiesJouees === 0 ? (
                <p>Aucune partie jouée pour le moment.</p>
            ) : (
                <>
                    <div className="stats-grille">
                        {stats.map(({ libelle, valeur }) => (
                            <div key={libelle} className="stat">
                                <span className="stat-valeur">{valeur}</span>
                                <span className="stat-libelle">{libelle}</span>
                            </div>
                        ))}
                    </div>

                    <h3>Victoires par nombre d'essais</h3>
                    <div className="repartition">
                        {Object.entries(repartition).map(([essais, nb]) => (
                            <div key={essais} className="repartition-ligne">
                                <span className="repartition-essais">{essais}</span>
                                <div className="repartition-barre-fond">
                                    <div
                                        className="repartition-barre"
                                        style={{ width: `${(nb / max) * 100}%` }}
                                    />
                                </div>
                                <span className="repartition-nb">{nb}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
