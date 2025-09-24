async function includeHTML() {
const elements = document.querySelectorAll("[include-html]");
for (let el of elements) {
    const file = el.getAttribute("include-html");
    if (file) {
        console.log(`Tentative de chargement du fichier: ${file}`);
        try {
                const response = await fetch(file);
                if (!response.ok) throw new Error(`Page not found: ${file}`);
                const content = await response.text();
                el.innerHTML = content;
                console.log(`Fichier chargé avec succès: ${file}`);
            } catch (err) {
                el.innerHTML = err.message;
                console.error(`Erreur lors du chargement de ${file}:`, err);
            }
            el.removeAttribute("include-html");
        }
    }
}

// Charger automatiquement après le chargement du DOM
document.addEventListener("DOMContentLoaded", includeHTML);
// Après l'inclusion dynamique, masquer le preloader si présent
document.addEventListener("DOMContentLoaded", async function() {
    await includeHTML();
    if (window.jQuery && $('.preloader').length) {
        $('.preloader').delay(500).fadeOut(500);
    }
    // Ré-initialiser les effets JS après l'inclusion dynamique
    if (window.reInitEffects) {
        window.reInitEffects();
    }
});