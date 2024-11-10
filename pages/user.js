// pages/user.js
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { getParticipantTags, saveParticipantTags, getEventsByTags, getUserEvents } from "../utils/functions";
import { predefinedTags } from "../utils/tags";
import UserNav from "../components/UserNav";
import RecommendedEvents from "../components/RecommendedEvents";
import ParticipatingEvents from "../components/ParticipatingEvents";
import EventsHeatmap from "../components/EventsHeatmap";

function UserDashboard() {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const [selectedTags, setSelectedTags] = useState([]);
    const [recommendedEvents, setRecommendedEvents] = useState([]);
    const [participatingEvents, setParticipatingEvents] = useState([]);

    useEffect(() => {
        // Redirect to login if user is not authenticated and not in loading state
        if (!isLoading && !user) {
            router.push("/api/auth/login?returnTo=/user");
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        const loadTagsAndEvents = async () => {
            if (user) {
                const tags = await getParticipantTags(user.sub);
                setSelectedTags(tags);

                const recommended = await getEventsByTags(tags);
                setRecommendedEvents(recommended);

                const participating = await getUserEvents(user.email);
                setParticipatingEvents(participating);
            }
        };
        loadTagsAndEvents();
    }, [user]);

    const handleTagClick = (tag) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    const handleSaveTags = async () => {
        if (user) {
            await saveParticipantTags(user.sub, selectedTags, user.email);
            const recommended = await getEventsByTags(selectedTags);
            setRecommendedEvents(recommended);
        }
    };

    // Show a loading state until we know if the user is authenticated or not
    if (isLoading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div>
            <UserNav />

            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name || user?.email}</h2>
                <p>Select your interests to find events:</p>
                <div className="flex flex-wrap gap-2 my-4">
                    {predefinedTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`px-4 py-2 rounded-md ${
                                selectedTags.includes(tag)
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleSaveTags}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md"
                >
                    Save Tags
                </button>

                {/* Render RecommendedEvents component */}
                <RecommendedEvents events={recommendedEvents} />

                {/* Render ParticipatingEvents component */}
                <ParticipatingEvents events={participatingEvents} />

                <EventsHeatmap />
            </div>
        </div>
    );
}

export default UserDashboard;
