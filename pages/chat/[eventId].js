import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Client, Databases } from "appwrite";

const ChatPage = () => {
    const router = useRouter();
    const { eventId } = router.query; // Get the event ID from the router
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const client = new Client();
    const databases = new Databases(client);
    
    // Ensure you have the user ID
    const userId = "6723f8a218494d6800de"; // Replace with your method of obtaining the user ID

    useEffect(() => {
        // Initialize the Appwrite client
        client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

        // Check if eventId is available
        if (!eventId) return;

        // Fetch messages for the specific event
        const fetchMessages = async () => {
            try {
                const response = await databases.listDocuments(process.env.NEXT_PUBLIC_DB_ID, "chat", [
                    {
                        key: "eventId",
                        value: eventId,
                    },
                ]);
                setMessages(response.documents);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchMessages();
    }, [eventId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;
    
        const messageData = {
            eventId: eventId,
            userId: userId,
            message: newMessage,
            timestamp: new Date().toISOString(),
        };
    
        try {
            await databases.createDocument(process.env.NEXT_PUBLIC_DB_ID, "chat", "unique()", messageData);
            setMessages((prevMessages) => [...prevMessages, messageData]);
            setNewMessage("");
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-200 to-purple-300 flex flex-col">
            <div className="flex-grow max-w-10xl mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Chat for Event {eventId}</h1>
                <div className="messages mb-4 overflow-y-auto flex-grow h-96">
                    {messages.map((msg) => (
                        <div key={msg.$id} className="message p-4 mb-2 border rounded-lg shadow-sm bg-gray-100">
                            <strong className="text-purple-600">User {msg.userId}:</strong> <span>{msg.message}</span>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex mt-4">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button type="submit" className="bg-purple-600 text-white p-2 rounded-r-lg hover:bg-purple-700 transition duration-200">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
