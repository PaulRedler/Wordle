
import { useEffect, useState } from "react";

export default function Timer() {
    const [tempsRestant, setTempsRestant] = useState("");

    useEffect(() => {
        function calculerTemps() {
            const maintenant = new Date();

            const minuit = new Date(maintenant);
            minuit.setHours(24, 0, 0, 0);

            const difference = minuit - maintenant;

            const heures = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const secondes = Math.floor((difference / 1000) % 60);

            setTempsRestant(
                `${String(heures).padStart(2, "0")}:` +
                `${String(minutes).padStart(2, "0")}:` +
                `${String(secondes).padStart(2, "0")}`
            );
        }

        calculerTemps();

        const interval = setInterval(calculerTemps, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p>Prochain mot dans :</p>
            <h2>{tempsRestant}</h2>
        </div>
    );
}
