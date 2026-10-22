import "./Loading.css";

export default function Loading({ message = "Chargement..." }) {
    return (
        <div className="loading" role="status" aria-live="polite">
            <div className="loading-spinner" />
            <p className="loading-message">{message}</p>
        </div>
    );
}
