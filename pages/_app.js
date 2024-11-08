import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { IoLanguage } from "react-icons/io5";

export default function App({ Component, pageProps }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (event) => {
        const language = event.target.value;
        if (language) {
            const googleTranslateCombo = document.querySelector(".goog-te-combo");
            if (googleTranslateCombo) {
                googleTranslateCombo.value = language;
                googleTranslateCombo.dispatchEvent(new Event("change"));
            }
        }
    };

    return (
        <div>
            <Component {...pageProps} />
            <ToastContainer />

            {/* Floating Language Selector */}
            <div className="fixed bottom-4 left-4 z-50">
                {/* Globe Button */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition duration-300"
                >
                    <IoLanguage />
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute bottom-16 left-0 bg-white shadow-lg rounded-lg p-4 w-48">
                        <select
							id="language-select"
							className="w-full p-1 rounded-md text-gray-800 font-medium bg-gray-100"
							onChange={handleLanguageChange}
						>
							<option value="">Select Language</option>
							<option value="ar">Arabic</option>
							<option value="bg">Bulgarian</option>
							<option value="zh-CN">Chinese</option>
							<option value="de">German</option>
							<option value="el">Greek</option>
							<option value="en">English</option>
							<option value="es">Spanish</option>
							<option value="fr">French</option>
							<option value="hi">Hindi</option>
							<option value="hu">Hungarian</option>
							<option value="it">Italian</option>
							<option value="pl">Polish</option>
							<option value="pt">Portuguese</option>
							<option value="ro">Romanian</option>
							<option value="ru">Russian</option>
							<option value="tr">Turkish</option>
							<option value="uk">Ukrainian</option>
						</select>

                    </div>
                )}
            </div>
        </div>
    );
}
