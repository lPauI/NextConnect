import React, { useEffect, useState } from 'react';
import { getEventTags } from '../utils/functions';

const EventTags = ({ eventId }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const tagsData = await getEventTags(eventId);
            setTags(tagsData);
        };
        fetchTags();
    }, [eventId]);

    return (
        <div>
            {tags.length > 0 ? (
                tags.map((tag, index) => (
                    <span key={index} className="tag-class">
                        {tag}
                    </span>
                ))
            ) : (
                <span>No tags available</span>
            )}
        </div>
    );
};

export default EventTags;