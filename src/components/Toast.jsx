import { useEffect } from "react";

export default function Toast({ titre, message, setBooleen, tempsAffichage = 5000000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setBooleen(false);
        }, tempsAffichage);

        return () => clearTimeout(timer);
    }, [setBooleen, tempsAffichage]);

    return (
        <div className="toast">
            <h1>{titre}</h1>
            <p>{message}</p>
        </div>
    );
}