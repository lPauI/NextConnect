import React, { useState, useEffect, useCallback } from "react";
import AuthNav from "../../components/AuthNav";
import SideNav from "../../components/SideNav";
import Loading from "../../components/Loading";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { checkAuthStatus, createEvent } from "../../utils/functions";
import { predefinedTags } from "../../utils/tags";
import { FaArrowLeft } from "react-icons/fa";

const CreateEventPage = () => {
    const [user, setUser] = useState({});
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("12:00");
    const [venue, setVenue] = useState("");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState("");
    const [flier, setFlier] = useState(null);
    const [numParticipants, setNumParticipants] = useState(1);
    const [selectedTags, setSelectedTags] = useState([]);
    const [mapUrl, setMapUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const authenticateUser = useCallback(() => {
        checkAuthStatus(setUser, setLoading, router);
    }, [router]);

    useEffect(() => {
        authenticateUser();
    }, [authenticateUser]);

    useEffect(() => {
        if (venue) {
            const query = encodeURIComponent(venue);
            const googleMapsEmbedUrl = `https://www.google.com/maps?q=${query}&output=embed`;
            setMapUrl(googleMapsEmbedUrl);
        }
    }, [venue]);

    const handleTagClick = (tag) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventId = await createEvent(
            user.$id,
            title,
            date,
            time,
            venue,
            description,
            note,
            flier,
            selectedTags,
            numParticipants,
            router
        );
        router.push(`/dashboard`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <AuthNav user={user} />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
                <Head>
                    <title>Create New Event | NextConnect</title>
                    <meta name="description" content="Create a new event on NextConnect" />
                    <link rel="icon" href="/images/favicon.ico" />
                </Head>
                <main className="bg-white p-8 rounded shadow-md w-full max-w-lg relative">
                    {/* Back to Dashboard Button */}
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="flex items-center mb-4 text-purple-500 hover:text-purple-700 font-semibold absolute top-4 left-4"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Dashboard
                    </button>
                    <h2 className="text-3xl font-bold text-center mb-6 text-purple-600 pt-5">🎉 Create a New Event</h2>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        {/* Title */}
                        <label htmlFor="title" className="font-semibold text-gray-700 mb-2">
                            📝 Event Title
                        </label>
                        <input
                            name="title"
                            type="text"
                            className="border py-2 px-4 rounded mb-4 focus:border-purple-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        {/* Venue */}
                        <label htmlFor="venue" className="font-semibold text-gray-700 mb-2">
                            📍 Venue
                        </label>
                        <input
                            name="venue"
                            type="text"
                            className="border py-2 px-4 rounded mb-4 focus:border-purple-500"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            placeholder="Enter location (e.g., Craft Timisoara)"
                            required
                        />

                        {/* Google Maps iframe */}
                        {mapUrl && (
                            <div className="mt-6 w-full h-64">
                                <iframe
                                    title="Google Maps Location"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    src={mapUrl}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        {/* Time */}
                        <label htmlFor="time" className="font-semibold text-gray-700 mb-2">
                            ⏰ Time
                        </label>
                        <input
                            name="time"
                            type="time"
                            className="border py-2 px-4 rounded mb-4 focus:border-purple-500"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />

                        {/* Date */}
                        <label htmlFor="date" className="font-semibold text-gray-700 mb-2">
                            📅 Date
                        </label>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            className="border py-2 px-4 rounded mb-4 focus:border-purple-500 w-full"
                            minDate={new Date()}
                            required
                        />

                        {/* Description */}
                        <label htmlFor="description" className="font-semibold text-gray-700 mb-2">
                            🖊️ Event Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            className="border py-2 px-4 rounded mb-4 focus:border-purple-500"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                        {/* Note */}
                        <label htmlFor="note" className="font-semibold text-gray-700 mb-2">
                            📢 Note to Attendees
                        </label>
                        <textarea
                            name="note"
                            rows="4"
                            className="border py-2 px-4 rounded mb-4 focus:border-purple-500"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            required
                        />

                        {/* Tags */}
                        <label className="font-semibold text-gray-700 mb-2">🏷️ Tags</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {predefinedTags.map((tag) => (
                                <button
                                    type="button"
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className={`px-3 py-1 rounded-full border transition-all duration-300 ${
                                        selectedTags.includes(tag)
                                            ? "bg-purple-600 text-white hover:bg-purple-500"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Participants */}
                        <label htmlFor="numParticipants" className="font-semibold text-gray-700 mb-2">
                            👥 Number of Participants Required
                        </label>
                        <input
                            name="numParticipants"
                            type="number"
                            min="1"
                            className="border py-2 px-4 rounded mb-4 focus:border-purple-500"
                            value={numParticipants}
                            onChange={(e) => setNumParticipants(e.target.value)}
                            required
                        />

                        {/* Flier */}
                        <label htmlFor="file" className="font-semibold text-gray-700 mb-2">
                            📄 Event Flier (optional)
                        </label>
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => setFlier(e.target.files[0])}
                            className="border py-2 px-4 rounded mb-4 focus:border-purple-500"
                            accept="image/png, image/jpeg"
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-all duration-200 font-semibold"
                        >
                            Create Event 
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default CreateEventPage;
