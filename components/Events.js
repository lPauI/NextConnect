import React from "react";
import { MdDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/router";
import { deleteTicket, formatDate } from "../utils/functions";
import EventTags from "./Tags";

const Events = ({ events }) => {
	const router = useRouter();

	const handleRoute = (slug, id) =>
		router.push({ pathname: `/events/${id}/${slug}` });

	// Helper function to determine event status
	const getEventStatus = (eventDate, disableRegistration) => {
		const today = new Date();
		const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
		const eventDateObj = new Date(eventDate);

		if (!disableRegistration) {
			if (eventDateObj <= todayWithoutTime) {
				return "ONGOING"; 
			} else {
				return "UPCOMING"; 
			}
		} else {
			return "FINISHED"; 
		}
	};

	return (
		<div className="w-full flex flex-wrap items-center justify-center p-4">
			{events.map((event) => {
				// Calculate the progress percentage for the participants
				const totalParticipants = event.participants || 0;
				const currentParticipants = event.attendees?.length || 0;
				const progressPercentage = totalParticipants > 0 
					? Math.min((currentParticipants / totalParticipants) * 100, 100) 
					: 0;

				return (
					<div
						className="relative md:w-[450px] w-full bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl m-4 border border-gray-200"
						key={event.$id}
					>
						<div
							className="p-6 w-full cursor-pointer rounded-t-xl"
							onClick={() => handleRoute(event.slug, event.$id)}
						>
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

							<EventTags eventId={event.$id} />
							<p className="text-gray-600 mt-4">📅 <span className="font-medium">{formatDate(event.date)}</span></p>
							<p className="text-gray-600 mt-2">📍 <span className="font-medium">{event.venue}</span></p>

							<p
								className={`mt-4 font-bold text-lg ${
									getEventStatus(event.date, event.disableRegistration) === "ONGOING"
										? "text-green-500"
										: getEventStatus(event.date, event.disableRegistration) === "UPCOMING"
										? "text-blue-500"
										: "text-gray-500"
								}`}
							>
								{getEventStatus(event.date, event.disableRegistration)}
							</p>
						</div>

						<div className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-xl flex items-center justify-between px-6">
							<MdDelete
								className="text-white text-2xl cursor-pointer hover:text-red-400 transition duration-300"
								onClick={() => deleteTicket(event.$id)}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Events;
