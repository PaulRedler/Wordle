import { useEffect, useRef } from "react";

export default function Grille({
    indexColonne,
    indexLigne,
    couleurs,
    grille,
    onChange,
    ligneQuiTremble 
}) {
    const inputs = useRef([]);

    useEffect(() => {
        inputs.current[indexLigne]?.[indexColonne]?.focus();
    }, [indexLigne, indexColonne]);

    return (
        <>
        
            {grille.map((ligne, i) => (
                ligne.map((lettre, j) => (
                    <input
                        key={`${i}-${j}`}
                        className={i === ligneQuiTremble ? "tremble" : undefined}
                        ref={(element) => {
                            if (!inputs.current[i]) {
                                inputs.current[i] = [];
                            }
                            inputs.current[i][j] = element;
                        }}
                        type="text"
                        maxLength={1}
                        value={lettre}
                        style={{
                            backgroundColor: couleurs[i][j]
                        }}
                        onChange={(e) => {
                            const nouvelleGrille =
                                grille.map(ligne => [...ligne]);

                            nouvelleGrille[i][j] = e.target.value;

                            onChange(nouvelleGrille);
                        }}
                    />
                ))
            ))}
        </>
    );
}