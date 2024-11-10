import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NoEvent from "../components/NoEvent";
import Loading from "../components/Loading";
import SideNav from "../components/SideNav";
import AuthNav from "../components/AuthNav";
import { checkAuthStatusDashboard, getAllEvents } from "../utils/functions";
import { useRouter } from "next/router";
import Events from "../components/Events";
import axios from 'axios';

const Dashboard = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({});
    const [suggestedCategory, setSuggestedCategory] = useState("");
    const [customIdea, setCustomIdea] = useState("");

    const authenticateUser = useCallback(async () => {
        const isAuthenticated = await checkAuthStatusDashboard(setUser, setLoading, setEvents, router);
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [router]);

    const getTopTag = async () => {
        try {
            const tags = await getAllEvents();
            console.log("Tags fetched from all events:", tags);

            const tagCount = tags.reduce((acc, tag) => {
                acc[tag] = (acc[tag] || 0) + 1;
                return acc;
            }, {});
            console.log("Tag count:", tagCount);

            const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
            console.log("Sorted tags:", sortedTags);

            const topTags = sortedTags.slice(0, 3).map(tag => tag[0]);
            console.log("Top 3 tags:", topTags);

            if (topTags.length === 0) {
                console.error("No tags found.");
                setSuggestedCategory("No categories available");
                setCustomIdea("No idea available at the moment.");
                return;
            }

            const randomTag = topTags[Math.floor(Math.random() * topTags.length)];
            console.log("Randomly selected tag:", randomTag);
            setSuggestedCategory(randomTag);

            const response = await axios.post('/api/getCustomIdea', { category: randomTag });
            console.log("Custom idea response:", response.data);
            setCustomIdea(response.data.idea);
        } catch (error) {
            console.error("Error in getTopTag:", error.response ? error.response.data : error.message);
            setCustomIdea("No idea available at the moment.");
        }
    };

    useEffect(() => {
        authenticateUser();
        getTopTag();
    }, [authenticateUser]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Head>
                <title>Dashboard | NextConnect</title>
                <meta
                    name='description'
                    content='Take your volunteering event to the Next level with NextConnect'
                />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/images/favicon.ico' />
            </Head>
            <main>
                <AuthNav user={user} />
                <div className='w-full flex items-center'>
                    <div className='md:w-[20%] md:block hidden'>
                        <SideNav />
                    </div>
                    <div className='md:w-[80%] w-full min-h-[90vh] py-10 px-4'>
                        {events.length > 0 ? <Events events={events} /> : <NoEvent />}
                    </div>

                    <div className='md:w-[80%] w-full min-h-[90vh] py-10 px-4'>
                        <div className='bg-white shadow-md rounded-lg p-6'>
                            <h2 className='text-2xl font-bold mb-4'>Suggested Event</h2>
                            <p className='mb-4'>I suggest you create an event in category <strong>{suggestedCategory}</strong>.</p>
                            <p className='mb-8'>Details: {customIdea}</p>
							<button
								className='bg-blue-500 text-white px-4 py-2 rounded'
								onClick={() => router.push({
									pathname: '/create/event',
									query: { 
										suggestedTitle: suggestedCategory,
										suggestedDescription: customIdea
									}
								})}
							>
								Create New Event
							</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
