import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NoEvent from "../components/NoEvent";
import Loading from "../components/Loading";
import SideNav from "../components/SideNav";
import AuthNav from "../components/AuthNav";
import { checkAuthStatusDashboard } from "../utils/functions";
import { useRouter } from "next/router";
import Events from "../components/Events";
import { getAllEvents } from "../utils/functions";

const Dashboard = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({});
    const [suggestedCategory, setSuggestedCategory] = useState("");

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
                return;
            }

            const randomTag = topTags[Math.floor(Math.random() * topTags.length)];
            console.log("Randomly selected tag:", randomTag);

            setSuggestedCategory(randomTag);
        } catch (error) {
            console.error("Error in getTopTag:", error);
        }
    };

    useEffect(() => {
        authenticateUser();
        getTopTag();
    }, [authenticateUser]);

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
                            <p className='mb-4'>I suggest you create an event in category {suggestedCategory}.</p>
                            <p className='mb-8'>Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> {/* TODO */}
                            <button
                                className='bg-blue-500 text-white px-4 py-2 rounded'
                                onClick={() => router.push('/create/event')}
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