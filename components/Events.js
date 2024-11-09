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
		<div className="w-full flex flex-wrap items-center justify-center">
			{events.map((event) => (
				<div
					className="relative md:w-[450px] w-full hover:shadow border-[1px] rounded-2xl m-3"
					key={event.$id}
				>
					<div
						className="p-4 w-full cursor-pointer"
						onClick={() => handleRoute(event.slug, event.$id)}
					>
						{/* Participant Icon and Count */}
						<div className="absolute top-4 right-4 flex items-center text-gray-500">
							<FaUser className="mr-1" />
							<span className="text-lg font-semibold">
								{event?.attendees?.length || 0} out of {event.participants || "N/A"}
							</span>
						</div>

						<div className="grid grid-cols-2 items-center mb-6">
							<h2 className="text-xl font-medium">{event.title}</h2>
							
						</div>
						<EventTags eventId={event.$id} />
						<p className="opacity-50">Date: {formatDate(event.date)}</p>
						<p className="opacity-50">Venue: {event.venue}</p>
					

						<p
							className={`mt-2 font-bold ${
								getEventStatus(event.date, event.disableRegistration) ===
								"ONGOING"
									? "text-green-600"
									: getEventStatus(event.date, event.disableRegistration) ===
									  "UPCOMING"
									? "text-blue-600"
									: "text-gray-600"
							}`}
						>
							{getEventStatus(event.date, event.disableRegistration)}
						</p>
					</div>

					<div className="w-full py-6 bg-blue-600 rounded-b-2xl flex items-center px-4 justify-between">
						<MdDelete
							className="text-gray-200 text-2xl cursor-pointer"
							onClick={() => deleteTicket(event.$id)}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default Events;
