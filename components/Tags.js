import React, { useState, useEffect } from "react";
import { getEventTags } from "../utils/functions";

const EventTags = ({ eventId }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const fetchedTags = await getEventTags(eventId);
            setTags(fetchedTags);
        };
        
        fetchTags();
    }, [eventId]);

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
                <span 
                    key={index} 
                    className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
};

export default EventTags;

// // Tags.js
// export const availableTags = [
//     // Culturale și Artistice
//     "Concert",
//     "Expoziție de Artă",
//     "Teatru",
//     "Film",
//     "Dans",
//     "Lansare de Carte",
//     "Fotografie",
  
//     // Sociale și Comunitare
//     "Eveniment Caritabil",
//     "Voluntariat",
//     "Întâlnire Comunitară",
//     "Festival",
//     "Parada",
  
//     // Comerciale
//     "Târg",
//     "Foodfest",
//     "Lansare de Produs",
//     "Promoții",
//     "Networking",
  
//     // Educație și Dezvoltare Personală
//     "Workshop",
//     "Curs",
//     "Educație",
//     "Dezvoltare Personală",
//     "Prezentare de Carte",
  
//     // Știință și Tehnologie
//     "Conferință",
//     "Seminar",
//     "Hackathon",
//     "Inovație",
//     "Știință",
//     "Tehnologie",
//     "Startup",
  
//     // Sănătate și Sport
//     "Sport",
//     "Yoga",
//     "Fitness",
//     "Nutriție",
//     "Mers pe Bicicletă",
//     "Alergare",
  
//     // Hobby-uri și Lifestyle
//     "Călătorii",
//     "Fotografie",
//     "Grădinărit",
//     "Artizanat",
//     "Curs de Bucătărie",
//     "DIY",
  
//     // Familie și Copii
//     "Activități pentru Copii",
//     "Petrecere de Familie",
//     "Atelier Creativ",
//     "Povestiri pentru Copii",
//     "Întâlniri de Familie",
  
//     // Business și Carieră
//     "Networking",
//     "Pitch Startup",
//     "Business",
//     "Carieră",
//     "Leadership",
//     "Marketing"
//   ];
  