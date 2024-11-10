// components/EventCard.js
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

function EventCard({ event, isRegistered = false }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-700">{event.title}</h3>
            <p className="text-gray-700">{event.description}</p>
            <div className="flex items-center mt-2 text-gray-500">
                <FaCalendarAlt className="mr-2" />
                <span>{event.date}</span>
            </div>
            <div className="flex items-center mt-1 text-gray-500">
                <FaMapMarkerAlt className="mr-2" />
                <span>{event.venue}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                {event.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {tag}
                    </span>
                ))}
            </div>
            {isRegistered ? (
                <div className="mt-4">
                    <button className="w-full bg-green-600 text-white py-2 rounded-md font-semibold cursor-default">
                        Registered
                    </button>
                </div>
            ) : (
                <div className="mt-4">
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition duration-200">
                        Register
                    </button>
                </div>
            )}
        </div>
    );
}

export default EventCard;
