export default async function handler(req, res) {
    // 1. Configuration des Headers (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Récupération des données (URL du site)
    const { montant, numero } = req.query;

    // mon URL Google Script la plus récente
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwtRKH8K73SV78dFgboMLxwAFyzkYaM6w1Wu2yu9Hj_YYPZMIxzk1E5A-jB1sAgMwPwHQ/exec";

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 secondes de délai

        // 3. Appel du Google Script
        const response = await fetch(`${SCRIPT_URL}?montant=${montant}&numero=${numero}`, { 
            signal: controller.signal 
        });
        
        clearTimeout(timeoutId);
        
        const codeRecu = await response.text();
        
        // 4. Renvoi du résultat propre en JSON
        return res.status(200).json({ code: codeRecu.trim() });

    } catch (error) {
        console.error("Erreur Vercel:", error);
        return res.status(500).json({ error: "Erreur de communication avec Google Sheets" });
    }
}
