import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { registerAttendee } from "../../../utils/functions";
import { useRouter } from "next/router";
import RegClosed from "../../../components/RegClosed";
import ErrorPage from "../../../components/ErrorPage";
import Loading from "../../../components/Loading";
import { db } from "../../../utils/appwrite";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumber } from 'libphonenumber-js';

export async function getServerSideProps(context) {
	let event = {};
	try {
		const promise = await db.getDocument(
			process.env.NEXT_PUBLIC_DB_ID,
			process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID,
			context.query.id
		);
		event = promise;
	} catch (err) {
		event = {};
	}

	return {
		props: { event },
	};
}

const RegisterPage = ({ event }) => {
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");  // Phone state for react-phone-input-2
	const [phoneError, setPhoneError] = useState(""); // Phone validation error
	const { query } = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate phone number before proceeding
		try {
			const parsedNumber = parsePhoneNumber(`+${phone}`); // Ensure the phone number is parsed with country code
			if (parsedNumber.isValid()) {
				setPhoneError(""); // Clear error if valid
				registerAttendee(name, email, phone, query.id, setSuccess, setLoading); // Pass phone in the registration function
				setEmail("");
				setName("");
				setPhone(""); // Reset phone
			} else {
				setPhoneError("Please enter a valid phone number.");
			}
		} catch (error) {
			setPhoneError("Please enter a valid phone number.");
		}
	};

	if (loading) {
		return <Loading title='Generating your ticket🤞🏼' />;
	}
	if (!event.title) {
		return <ErrorPage />;
	}

	if (event.disableRegistration) {
		return <RegClosed event={event} />;
	}

	return (
		<div>
			<Head>
				<title>{`${event.title} | NextConnect`}</title>
				<meta
					name='description'
					content='An event ticketing system built with NextJS and Firebase'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/images/favicon.ico' />
			</Head>
			<main className='w-full flex items-center justify-between min-h-[100vh] relative'>
				<div className='md:w-[60%] w-full flex flex-col items-center justify-center min-h-[100vh] px-[30px] py-[30px] relative'>
					<h2 className='text-2xl font-medium mb-3'>
						Get your ticket for {event.title} 🎉
					</h2>
					<form
						className='w-full flex flex-col justify-center'
						onSubmit={handleSubmit}
					>
						<label htmlFor='name'>Full name</label>
						<div className='w-full relative'>
							<input
								type='text'
								name='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								className='border px-10 py-2 mb-3 rounded-md w-full'
								required
							/>
							<FaUserAlt className=' absolute left-4 top-3 text-gray-300' />
						</div>

						<label htmlFor='email'>Email address</label>
						<div className='w-full relative'>
							<input
								type='email'
								name='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='border px-10 py-2 mb-3 rounded-md w-full'
								required
							/>
							<HiMail className=' absolute left-4 top-3 text-gray-300 text-xl' />
						</div>

						<label htmlFor='phone'>Phone Number</label>
						<div className='w-full relative mb-3'>
							<PhoneInput
								country={'ro'}
								value={phone}
								onChange={(phone) => setPhone(phone)}
								inputClass="border rounded-md w-full"
								inputStyle={{ width: '100%', paddingLeft: '50px', height: '38px' }}
								buttonStyle={{ left: '5px' }}
								required
							/>
						</div>
						{phoneError && <p className="text-red-500 mb-3">{phoneError}</p>}

						<button
							type='submit'
							className='bg-blue-600 p-3 font-medium hover:bg-blue-600 hover:text-[#FFF8DE] text-white mb-3 rounded-md'
						>
							GET TICKET
						</button>
					</form>
					<div className='absolute bottom-5 left-5'>
						<p className='opacity-50 text-sm'>
							<Link href='/'>{event?.title}</Link> &copy; Copyright{" "}
							{new Date().getFullYear()}{" "}
						</p>
					</div>
				</div>
				<div className='login md:w-[40%] h-[100vh] relative'>
				</div>
				{success && (
					<div className='w-full h-[100vh] dim absolute top-0 flex items-center justify-center z-40'>
						<div className='w-[400px] bg-white h-[300px] flex items-center justify-center flex-col rounded-md shadown-blue-100 shadow-md'>
							<h2 className='text-2xl font-extrabold mb-4 text-center'>
								Registered Successfully! 🎉
							</h2>
							<p className='text-center mb-6'>
								Check your email for your ticket and event information.
							</p>
							<button
								className='px-4 py-2 bg-blue-600 rounded-md text-white'
								onClick={() => setSuccess(false)}
							>
								OK
							</button>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default RegisterPage;
