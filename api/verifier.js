// api/verifier.js
export default async function handler(req, res) {
    // Récupération des données envoyées par ton site HTML
    const { montant, numero } = req.query;

    // Ton URL Google Script qui contient tes tickets
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwD9v5E3s2-L2_p71pPlWSNRVI9VU5CFPQ8l_JTDOESNsQuncLkCaDRDBAH20H56JS7tQ/exec";

    try {
        // Le serveur Vercel appelle ton Google Script
        const response = await fetch(`${SCRIPT_URL}?montant=${montant}&numero=${numero}`);
        const codeRecu = await response.text();

        // On renvoie le code WiFi au client
        res.status(200).send(codeRecu);
    } catch (error) {
        console.error("Erreur Vercel:", error);
        res.status(500).send("Erreur lors de la récupération du code");
    }
}