// components/EventsHeatmap.js
import React from "react";

const EventsHeatmap = () => {
    return (
        <div className="p-6 bg-white shadow-md rounded-lg mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-600">Events Heatmap</h3>
            <div className="w-full h-[80vh] overflow-hidden rounded-lg">
                <iframe 
                    src="https://lpaui-nextconnect-streamlitheatmap-azg4t3.streamlit.app?embedded=true" 
                    className="w-full h-full rounded-lg border-0"
                    title="Events Heatmap"
                ></iframe>
            </div>
        </div>
    );
};

export default EventsHeatmap;
