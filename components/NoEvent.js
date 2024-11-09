import React from "react";
import party from "../images/party.svg";
import Image from "next/image";
import Link from "next/link";

const NoEvent = () => {
	return (
		<div className='w-full min-h-[70vh] flex flex-col items-center justify-center p-4'>
			<Image src={party} alt='Create an event' width={300} />
			<h3 className='my-4 text-center'>You have no existing events.</h3>
			<Link href='create/event'>
				<button className='bg-blue-600 px-6 py-4 rounded text-white'>
					Create an event!
				</button>
			</Link>
		</div>
	);
};

export default NoEvent;
