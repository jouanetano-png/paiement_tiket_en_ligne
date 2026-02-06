export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { montant, numero } = req.query;
    
    // TA NOUVELLE URL MISE À JOUR
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwtRKH8K73SV78dFgboMLxwAFyzkYaM6w1Wu2yu9Hj_YYPZMIxzk1E5A-jB1sAgMwPwHQ/exec";

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); 

        const response = await fetch(`${SCRIPT_URL}?montant=${montant}&numero=${numero}`, { 
            signal: controller.signal 
        });
        clearTimeout(timeoutId);
        
        const codeRecu = await response.text();
        
        // On renvoie un JSON propre au site
        res.status(200).json({ code: codeRecu.trim() });
    } catch (error) {
        res.status(500).json({ error: "Erreur de communication avec Google Sheets" });
    }
}