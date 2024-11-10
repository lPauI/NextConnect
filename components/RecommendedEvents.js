// components/RecommendedEvents.js
import React from "react";

function RecommendedEvents({ events }) {
    return (
        <div>
            <h3 className="text-xl font-bold mt-8 mb-4">Events You Might Like:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.$id} className="p-4 bg-white rounded shadow-md">
                            <h4 className="font-semibold text-lg">{event.title}</h4>
                            <p>{event.description}</p>
                            <p className="text-sm text-gray-500">Date: {event.date}</p>
                            <p className="text-sm text-gray-500">Location: {event.venue}</p>
                        </div>
                    ))
                ) : (
                    <p>No recommended events found based on your interests.</p>
                )}
            </div>
        </div>
    );
}

export default RecommendedEvents;
