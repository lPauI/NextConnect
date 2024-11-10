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
    const router = useRouter();
    const { suggestedTitle, suggestedDescription } = router.query;
    
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

    const authenticateUser = useCallback(() => {
        checkAuthStatus(setUser, setLoading, router);
    }, [router]);

    // Set initial values from router query
    useEffect(() => {
        if (suggestedTitle) {
            setTitle(suggestedTitle);
        }
        if (suggestedDescription) {
            setDescription(suggestedDescription);
        }
    }, [suggestedTitle, suggestedDescription]);

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
        
        try {
            await createEvent(
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
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Head>
                <title>Create Event | NextConnect</title>
                <meta
                    name="description"
                    content="Create a new volunteering event with NextConnect"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 mb-8"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back
                    </button>
                    
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-center">Create an event</h1>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Event Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                value={date.toISOString().split('T')[0]}
                                onChange={(e) => setDate(new Date(e.target.value))}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Time
                            </label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Venue
                            </label>
                            <input
                                type="text"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                            {mapUrl && (
                                <iframe
                                    src={mapUrl}
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    className="mt-2"
                                ></iframe>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows={4}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Additional Notes
                            </label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Event Flier
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setFlier(e.target.files[0])}
                                accept="image/*"
                                className="mt-1 block w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Number of Participants
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={numParticipants}
                                onChange={(e) => setNumParticipants(parseInt(e.target.value))}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {predefinedTags.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => handleTagClick(tag)}
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            selectedTags.includes(tag)
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Create Event
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateEventPage;
