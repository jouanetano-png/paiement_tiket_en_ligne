// api/verifier.js
export default async function handler(req, res) {
    // 1. Autoriser ton site GitHub Pages à lire la réponse
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Gérer la requête de pré-vérification du navigateur
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Récupération des données envoyées par ton site
    const { montant, numero } = req.query;

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzHK6kbjX5Q99oOvU1Av_ffaEqEMs3XGeqaCilrhWIEffufPqFS6Tk6MeUkWkm1_45PRg/exec";

    try {
        // 3. Appel du Google Script
        const response = await fetch(`${SCRIPT_URL}?montant=${montant}&numero=${numero}`);
        const codeRecu = await response.text();

        // 4. Renvoi du résultat au client
        res.status(200).send(codeRecu);
    } catch (error) {
        console.error("Erreur Vercel:", error);
        res.status(500).send("Erreur lors de la récupération du code");
    }
}