import React, { useEffect, useState } from "react";
import { db } from "../utils/appwrite.js";
import Link from "next/link";
import { useRouter } from "next/router";
import Nav from "../components/Nav";
import { FaUser } from "react-icons/fa";
import { formatDate } from "../utils/functions";
import EventTags from "../components/Tags";
import EventsHeatmap from "../components/EventsHeatmap";

const EventsPage = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await db.listDocuments(
          process.env.NEXT_PUBLIC_DB_ID,
          process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID
        );
        setEvents(response.documents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  // Helper function to determine event status
  const getEventStatus = (eventDate, disableRegistration) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);

    if (!disableRegistration) {
      return eventDateObj <= today ? "ONGOING" : "UPCOMING";
    } else {
      return "FINISHED";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Nav />
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">Upcoming Events</h1>
      <div className="w-full flex flex-wrap items-center justify-center p-4">
        {events.map((event) => {
          const totalParticipants = event.participants || 0;
          const currentParticipants = event.attendees?.length || 0;
          const progressPercentage = totalParticipants > 0 
            ? Math.min((currentParticipants / totalParticipants) * 100, 100) 
            : 0;

          return (
            <div
              key={event.$id}
              className="relative md:w-[450px] w-full bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl m-4 border border-gray-200"
            >
              <div className="p-6 w-full cursor-pointer rounded-t-xl">
                
                {/* Participant Progress Bar and Count */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                    <div className="relative flex items-center justify-center h-full text-white font-semibold">
                      <FaUser className="mr-2" />
                      <span className="text-sm">{currentParticipants} / {totalParticipants || "N/A"} Attending</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
                </div>

                {/* Tags and Event Details */}
                <EventTags eventId={event.$id} />
                <p className="text-gray-600 mt-4">📅 <span className="font-medium">{formatDate(event.date)}</span></p>
                <p className="text-gray-600 mt-2">📍 <span className="font-medium">{event.venue}</span></p>

                {/* Event Status */}
                <p className={`mt-4 font-bold text-lg ${
                  getEventStatus(event.date, event.disableRegistration) === "ONGOING" ? "text-green-500" :
                  getEventStatus(event.date, event.disableRegistration) === "UPCOMING" ? "text-blue-500" : "text-gray-500"
                }`}>
                  {getEventStatus(event.date, event.disableRegistration)}
                </p>
              </div>

              {/* Register Button in Footer */}
              <Link href={`/register/${event.$id}/${event.slug}`}>
                <div className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-xl flex items-center justify-between px-6">
                  <button className="text-white text-lg font-semibold cursor-pointer hover:underline">
                    Register for Event
                  </button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <EventsHeatmap/>
    </div>
  );
};

export default EventsPage;
