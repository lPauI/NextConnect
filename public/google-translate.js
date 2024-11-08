function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
    );
}

// Function to change the language based on the dropdown selection
function translateLanguage() {
    const languageSelect = document.getElementById("language-select");

    // Only proceed if languageSelect is available
    if (languageSelect) {
        languageSelect.addEventListener("change", () => {
            const language = languageSelect.value;

            if (language) {
                // This finds the hidden Google Translate combo and changes it
                const googleTranslateCombo = document.querySelector(".goog-te-combo");
                if (googleTranslateCombo) {
                    googleTranslateCombo.value = language; // Set selected language
                    googleTranslateCombo.dispatchEvent(new Event("change")); // Trigger change event
                }
            }
        });
    }
}

// Ensure translateLanguage is called after Google Translate initializes
window.addEventListener("load", () => {
    // Delay the call to translateLanguage to ensure the DOM is fully ready
    setTimeout(translateLanguage, 500);
});
