import { Link } from "react-router";

export default function Regles() {
    return (
        <main className="regles">
            <h1>Règles du jeu</h1>

            <p>Trouve le mot de cinq lettres du jour en six essais maximum.</p>

            <h2>Comment jouer</h2>
            <ol>
                <li>
                    Saisis un mot de cinq lettres avec le clavier de ton ordinateur
                    ou celui affiché sous la grille.
                </li>
                <li>
                    Valide ta proposition avec la touche Entrée. Le mot doit être
                    un vrai mot français.
                </li>
                <li>Utilise Retour arrière pour corriger une lettre.</li>
                <li>
                    Après chaque proposition, les lettres changent de couleur pour
                    t'indiquer où tu en es.
                </li>
            </ol>

            <h2>Les couleurs</h2>
            <div className="regles-couleur">
                <span className="case vert">A</span>
                <p>
                    <strong>Vert :</strong> la lettre est dans le mot, à la bonne place.
                </p>
            </div>
            <div className="regles-couleur">
                <span className="case jaune">A</span>
                <p>
                    <strong>Jaune :</strong> la lettre est dans le mot, mais à une
                    autre place.
                </p>
            </div>
            <div className="regles-couleur">
                <span className="case gris">A</span>
                <p>
                    <strong>Gris :</strong> la lettre n'est pas dans le mot, ou pas
                    autant de fois que proposé.
                </p>
            </div>

            <h2>Exemple</h2>
            <p>Le mot à trouver est PLAGE et tu proposes PAGES :</p>
            <div className="regles-exemple">
                <span className="case vert">P</span>
                <span className="case jaune">A</span>
                <span className="case jaune">G</span>
                <span className="case jaune">E</span>
                <span className="case gris">S</span>
            </div>
            <p>
                Le P est bien placé. Le A, le G et le E sont dans le mot mais pas
                à cette place. Le S n'est pas dans le mot.
            </p>

            <h2>Lettres en double</h2>
            <p>
                Si tu proposes une lettre plus de fois qu'elle n'apparaît dans le
                mot, les exemplaires en trop restent gris.
            </p>

            <h2>Et ensuite ?</h2>
            <p>
                Tes parties sont enregistrées : retrouve-les dans le tableau des
                scores et dans tes statistiques.
            </p>

            <div className="regles-liens">
                <Link to={`/Partie`}>Partie du jour</Link>
                <Link to={`/Accueil`}>Retourner à l'accueil</Link>
            </div>
        </main>
    );
}
