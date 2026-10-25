export default function Clavier({ lettresCouleur, onClick }) {
    return (
        <>
            {Object.entries(lettresCouleur).map(([lettre, couleur]) => (
                <button
                    key={lettre}
                    style={{ backgroundColor: couleur }}
                    onClick={() => onClick(lettre)}
                >
                    {lettre}
                </button>
            ))}
        </>
    );
}