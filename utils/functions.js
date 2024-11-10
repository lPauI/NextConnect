import { useState } from "react"; // Import useState
import { account, db, storage } from "./appwrite";
import { toast } from "react-toastify";
import { ID, Query } from "appwrite";
import emailjs from "@emailjs/browser";
import QRCode from "qrcode"; 
import opencage from 'opencage-api-client';

//👇🏻 generate random strings as ID
const generateID = () => Math.random().toString(36).substring(2, 24);

//👇🏻 extract file ID from the document
const extractIdFromUrl = (url) => {
    const regex = /files\/([^/]+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
};

//👇🏻 alerts a success message
const successMessage = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

//👇🏻 alerts an error message
const errorMessage = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

//👇🏻 convert the date to human-readable form
export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);

    const day = date.getDate();
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) {
        suffix = "st";
    } else if (day === 2 || day === 22) {
        suffix = "nd";
    } else if (day === 3 || day === 23) {
        suffix = "rd";
    }

    const formattedDateWithSuffix = formattedDate.replace(/\d+/, day + suffix);

    return formattedDateWithSuffix;
};

// Function to generate QR code as a Base64 image
async function generateQrCodeBase64(passcode, eventtitle) {
    const qrData = `${passcode}-${eventtitle}`;
    try {
        const qrCodeBase64 = await QRCode.toDataURL(qrData);
        return qrCodeBase64;
    } catch (error) {
        console.error("Error generating QR code:", error);
    }
}

//format phoneNumber
export function formatPhoneNumber(input) {
    try {
        const cleaned = input.replace(/\D/g, '');
        const countryCode = cleaned.substring(0, 2); // First two digits
        const number = cleaned.substring(2); // Remaining digits
        const formatted = `+${countryCode} ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;

        return formatted;
    } catch (err) {
        return "N/A";
    };
}

// Send email via EmailJS with QR code in Base64 format
export const sendEmail = async (
    name,
    email,
    title,
    time,
    date,
    note,
    description,
    passcode,
    flier_url,
    setSuccess,
    setLoading
) => {
    try {
        setLoading(true);

        // Await the QR code Base64 result before sending
        const qrcodeBase64 = await generateQrCodeBase64(passcode, title);

        await emailjs.send(
            process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
            {
                name,
                email,
                title,
                time,
                date: formatDate(date),
                note,
                description,
                passcode,
                qrcode: qrcodeBase64, // Attach the Base64 QR code
                flier_url
            },
            process.env.NEXT_PUBLIC_EMAIL_API_KEY
        );

        setLoading(false);
        setSuccess(true);
    } catch (error) {
        console.error("Email send error:", error);
        errorMessage(error.text || "Error sending email.");
        setSuccess(false);
        setLoading(false);
    }
};

//👇🏻 converts JSON string to JavaScript objects
export const parseJSON = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
};

//👇🏻 generate slug
export const createSlug = (sentence) => {
    let slug = sentence.toLowerCase().trim();
    slug = slug.replace(/[^a-z0-9]+/g, "-");
    slug = slug.replace(/^-+|-+$/g, "");
    return slug;
};

//👇🏻 Appwrite signUp function
export const signUp = async (name, email, password, router) => {
    try {
        // Step 1: Create a new account
        await account.create(ID.unique(), email, password, name);
        successMessage("Account created! 🎉");

        await account.createEmailSession(email, password);

        // Step 3: Send verification email with redirect URL
        try {
            const redirectUrl = `${window.location.origin}/verified`;
            await account.createVerification(redirectUrl);
            successMessage("Verification email sent! Please check your inbox.");
            router.push("/verify-email");
        } catch (verificationError) {
            console.error("Error sending verification email:", verificationError.message);
            errorMessage("Failed to send verification email. Please try again later.");
        }
    } catch (err) {
        console.error("Error creating account:", err.message);
        errorMessage("Check your network / User already exists ❌");
        router.push("/login");
    }
};

//👇🏻 Appwrite login function
export const logIn = async (email, setEmail, password, setPassword, router) => {
    try {
        // Check if there is already an active session
        const currentSession = await account.getSession("current");

        if (currentSession) {
            successMessage(`Welcome back 🎉`);
            router.push("/dashboard");
            return;
        }
    } catch (error) {
        //do nothing lol
    }

    // No active session, proceed with login
    try {
        await account.createEmailSession(email, password);
        successMessage(`Welcome back 🎉`);
        setEmail("");
        setPassword("");
        router.push("/dashboard");
    } catch (err) {
        errorMessage(err.message || "Invalid credentials ❌");
    }
};

//👇🏻 delete an event
export const deleteTicket = async (id) => {
	try {
		const getDoc = await db.getDocument(
			process.env.NEXT_PUBLIC_DB_ID,
			process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
			id
		);
		if (getDoc.flier_url === "https://google.com") {
			await db.deleteDocument(
				process.env.NEXT_PUBLIC_DB_ID,
				process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
				id
			);
		} else {
			const fileID = extractIdFromUrl(getDoc.flier_url);
			await storage.deleteFile(process.env.NEXT_PUBLIC_BUCKET_ID, fileID);
			await db.deleteDocument(
				process.env.NEXT_PUBLIC_DB_ID,
				process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
				id
			);
		}
		successMessage("Ticket deleted! 🎉");
		location.reload();
	} catch (err) {
		//console.error(err); // Failure
		errorMessage("Action declined ❌");
	}
};


//👇🏻 Appwrite logout function
export const logOut = async (router) => {
    try {
        await account.deleteSession("current");
        router.push("/");
        successMessage("See ya later 🎉");
    } catch (err) {
        errorMessage("Encountered an error 😪");
    }
};

//👇🏻 Appwrite authenticate user
export const checkAuthStatus = async (setUser, setLoading, router) => {
    try {
        const request = await account.get();
        setUser(request);
        setLoading(false);
    } catch (err) {
        router.push("/");
    }
};

//👇🏻 before dashboard, check if loggedin
export const checkAuthStatusDashboard = async (setUser, setLoading, setEvents, router) => {
    try {
        const request = await account.get();
        getTickets(request.$id, setEvents, setLoading);
        setUser(request);
        setLoading(false);
        return true; 
    } catch (err) {
        setLoading(false);
        return false; 
    }
};

export const setVenueCoordinates = async (eventId, venue) => {
    const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_KEY; // Ensure your .env file has the correct key without quotes

    try {
        // Fetch coordinates using opencage-api-client
        const data = await opencage.geocode({ q: venue, key: apiKey });

        if (data && data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;

            // Update the event document with coordinates in Appwrite, converting lat and lng to strings
            await db.updateDocument(
                process.env.NEXT_PUBLIC_DB_ID,
                process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
                eventId,
                {
                    VENUE_LAT: lat.toString(),
                    VENUE_LONG: lng.toString(),
                }
            );
            console.log("Coordinates set successfully!");
        } else {
            console.error("No coordinates found for the specified venue.", data);
        }
    } catch (error) {
        console.log("OpenCage API Key:", apiKey);
        console.error("Error fetching or updating coordinates:", error.message);
        errorMessage("Failed to fetch or set coordinates for venue ❌");
    }
};


//👇🏻 create a new event
export const createEvent = async (
    userId,
    title,
    date,
    time,
    venue,
    description,
    note,
    flier,
    tags,
    participants,
    router
) => {
    const createDocument = async (flier_url = "https://google.com") => {
        try {
            const response = await db.createDocument(
                process.env.NEXT_PUBLIC_DB_ID,
                process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
                ID.unique(),
                {
                    user_id: userId,
                    title,
                    date: date.toISOString().split('T')[0],
                    time,
                    venue,
                    description,
                    note,
                    slug: createSlug(title),
                    attendees: [],
                    disableRegistration: false,
                    flier_url,
                    tags,
                    participants: parseInt(participants, 10), // Ensuring the value is an integer
                }
            );

            // Call the function to set coordinates after creating the event
            await setVenueCoordinates(response.$id, venue);

            successMessage("Event created successfully 🎉");
            return response.$id;
        } catch (error) {
            errorMessage("Error creating event ❌");
            throw error;
        }
    };

    let flier_url;
    if (flier) {
        try {
            const response = await storage.createFile(
                process.env.NEXT_PUBLIC_BUCKET_ID,
                ID.unique(),
                flier
            );
            flier_url = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}&mode=admin`;
        } catch (error) {
            errorMessage("Failed to upload event flier ❌");
            throw error;
        }
    }

    return await createDocument(flier_url);
};


//👇🏻 register a participant
export const registerAttendee = async (
    name,
    email,
    phoneNumber,
    documentId,
    setSuccess,
    setLoading
) => {
    try {
        setLoading(true);

        // Retrieve the event document
        const doc = await db.getDocument(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
            documentId
        );

        // Generate a unique attendee ID
        const attendeeID = generateID();

        // Check if the email already exists in attendees
        const isRegistered = doc.attendees.some((item) => JSON.parse(item).email === email);

        if (!isRegistered) { 
            // If not registered, add the new attendee
            await db.updateDocument(
                process.env.NEXT_PUBLIC_DB_ID,
                process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
                documentId,
                {
                    attendees: [
                        ...doc.attendees,
                        JSON.stringify({ name, email, phoneNumber, id: attendeeID, isPresent:"false"}),
                    ],
                }
            );

            const flierURL = doc.flier_url !== "https://google.com"
                ? doc.flier_url
                : "Nothing uploaded for this event";

            // Send the email notification with emailjs
            sendEmail(
                name,
                email,
                doc.title,
                doc.time,
                doc.date,
                doc.note,
                doc.description,
                attendeeID,
                flierURL,
                setSuccess,
                setLoading
            );
        } else {
            errorMessage("User already registered ❌");
            setLoading(false);
        }
    } catch (err) {
        errorMessage("Encountered an error!");
        setLoading(false); // Stop loading on error
    }
};

//👇🏻 get all events
export const getEvents = async (setEvents, setLoading) => {
    setLoading(true);
    try {
        const response = await db.listDocuments(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
            [Query.orderDesc("date")]
        );
        setEvents(response.documents);
    } catch (error) {
        console.error("Error fetching events:", error);
        errorMessage("Failed to fetch events ❌");
    } finally {
        setLoading(false);
    }
};

//👇🏻 get specific event
export const getEvent = async (id, setEvent, setLoading) => {
    setLoading(true);
    try {
        const response = await db.getDocument(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
            id
        );
        setEvent(response);
    } catch (error) {
        console.error("Error fetching event:", error);
        errorMessage("Failed to fetch event ❌");
    } finally {
        setLoading(false);
    }
};

//👇🏻 get events the user is registered to
export const getTickets = async (userId, setEvents, setLoading) => {
    setLoading(true);
    try {
        const response = await db.listDocuments(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
            [Query.equal("user_id", userId)]
        );
        setEvents(response.documents);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        errorMessage("Failed to fetch tickets ❌");
    } finally {
        setLoading(false);
    }
};

//👇🏻 search events
export const searchEvents = async (query, setEvents, setLoading) => {
    setLoading(true);
    try {
        const response = await db.listDocuments(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
            [Query.search("title", query)]
        );
        setEvents(response.documents);
    } catch (error) {
        console.error("Error searching events:", error);
        errorMessage("Failed to search events ❌");
    } finally {
        setLoading(false);
    }
};

//👇🏻 filter events
export const filterEvents = async (filters, setEvents, setLoading) => {
    setLoading(true);
    try {
        const queries = filters.map(filter => Query.equal(filter.field, filter.value));
        const response = await db.listDocuments(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
            queries
        );
        setEvents(response.documents);
    } catch (error) {
        console.error("Error filtering events:", error);
        errorMessage("Failed to filter events ❌");
    } finally {
        setLoading(false);
    }
};

//👇🏻 delete event
export const deleteEvent = async (eventId, setEvents, setLoading) => {
    setLoading(true);
    try {
        await db.deleteDocument(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
            eventId
        );
        successMessage("Event deleted successfully 🎉");
        getEvents(setEvents, setLoading); // Refresh event list after deletion
    } catch (error) {
        console.error("Error deleting event:", error);
        errorMessage("Failed to delete event ❌");
    } finally {
        setLoading(false);
    }
};

//👇🏻 update event

export const updateEvent = async (eventID, updatedData, router) => {
    try {
        await db.updateDocument(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
            eventID,
            updatedData
        );
        successMessage("Event updated successfully!");
        router.push("/dashboard"); // Redirect to the dashboard after update
    } catch (error) {
        errorMessage("Error updating event:", error);
    }
};

//👇🏻 send to make.com scenario and send form to user
export const sendtoGforms = async (documentId) => {
    try {
        // Retrieve the document from the database
        const document = await db.getDocument(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
            documentId
        );
        if (document && document.attendees) {
            const attendees = document.attendees;
            // Send the attendees array as JSON
            const response = await fetch('https://hook.eu2.make.com/zg2fsbrviuqb7f6ae0ld6gmbekg7ixh4', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({"eventTitle":document.title, attendees})
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            //console.log('Response from server:', responseData);
        } else {
            throw new Error('Document does not exist or has no attendees.');
        }
    } catch (error) {
        errorMessage("Encountered an error sending to GForms: " + error.message);
    }
};

//👇🏻 disable an event registration
export const disableRegistration = async (documentId) => {
	try {
		await db.updateDocument(
			process.env.NEXT_PUBLIC_DB_ID,
			process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
			documentId,
			{
				disableRegistration: true,
			}
		);
        sendtoGforms(documentId);
		successMessage("New registration disabled! 🎉");
	} catch (err) {
		console.error(err); // Failure
		errorMessage("Encountered an error 😪");
	}
};

// DONT TOUCH
export const getEventTags = async (id) => {
    try {
        const getDoc = await db.getDocument(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
            id
        );
        const tags = getDoc.tags || [];

        return tags;
    } catch (err) {
        errorMessage("Unable to fetch event tags ❌");
        console.error(err);
        return [];
    }
};

export const saveParticipantTags = async (auth0UserId, tags, email) => {
    try {
        // Check if the user already has a document in the ParticipantTags collection
        const existingDoc = await db.listDocuments(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_PARTICIPANT_TAGS_COLLECTION_ID,
            [Query.equal("auth0_user_id", auth0UserId)]
        );

        if (existingDoc.total > 0) {
            // If a document exists, update it
            await db.updateDocument(
                process.env.NEXT_PUBLIC_DB_ID,
                process.env.NEXT_PUBLIC_PARTICIPANT_TAGS_COLLECTION_ID,
                existingDoc.documents[0].$id,
                { tags, email }
            );
        } else {
            // If no document exists, create a new one
            await db.createDocument(
                process.env.NEXT_PUBLIC_DB_ID,
                process.env.NEXT_PUBLIC_PARTICIPANT_TAGS_COLLECTION_ID,
                ID.unique(),
                { auth0_user_id: auth0UserId, tags, email }
            );
        }
        successMessage("Successfuly saved tags!");
    } catch (error) {
        console.error("Error saving participant tags:", error.message);
        throw new Error("Could not save participant tags");
    }
};

// Fetch participant tags from Appwrite
export const getParticipantTags = async (auth0UserId) => {
    try {
        const response = await db.listDocuments(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_PARTICIPANT_TAGS_COLLECTION_ID,
            [Query.equal("auth0_user_id", auth0UserId)]
        );
        return response.documents[0]?.tags || [];
    } catch (error) {
        console.error("Error fetching participant tags:", error.message);
        throw new Error("Could not fetch participant tags");
    }
};

// Fetch events matching any of the selected tags
export const getEventsByTags = async (tags) => {
    try {
        const uniqueEvents = new Map();

        for (const tag of tags) {
            const response = await db.listDocuments(
                process.env.NEXT_PUBLIC_DB_ID,
                process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
                [Query.search("tags", tag)]
            );

            // Add each document to the uniqueEvents map using its ID as the key to avoid duplicates
            response.documents.forEach((event) => {
                uniqueEvents.set(event.$id, event);
            });
        }

        // Convert the map values to an array to return unique events
        return Array.from(uniqueEvents.values());
    } catch (error) {
        console.error("Error fetching events by tags:", error);
        return [];
    }
};

export const getAllEvents = async () => {
    try {
        const response = await db.listDocuments(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID
        );

        // Extract tags from all events
        const tags = response.documents.flatMap(event => event.tags);

        return tags;
    } catch (error) {
        console.error("Error fetching all events:", error);
        return [];
    }
};

export const getUserEvents = async (userEmail) => {
    try {
        const response = await db.listDocuments(
            process.env.NEXT_PUBLIC_DB_ID,
            process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID
        );

        // Filter events to find those where the attendees array includes the user’s email
        const participatingEvents = response.documents.filter(event => {
            return event.attendees.some(attendee => {
                const parsedAttendee = JSON.parse(attendee); // parse if attendees are stored as JSON strings
                return parsedAttendee.email === userEmail;
            });
        });

        // Extract tags from participating events
        const tags = participatingEvents.flatMap(event => event.tags);

        return tags;
    } catch (error) {
        console.error("Error fetching user events:", error);
        return [];
    }
};