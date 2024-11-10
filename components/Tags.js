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
                className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-400"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
};

export default EventTags;