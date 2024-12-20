import React, { useState } from "react";
import { MdEvent } from "react-icons/md";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { IoIosCreate } from "react-icons/io";
import { useRouter } from "next/router";
import { logOut } from "../utils/functions";
import { FaQrcode } from "react-icons/fa";

const SideNav = () => {
	const router = useRouter();
	return (
		<nav className='w-[20%] fixed top-[10vh] bg-white left-0 h-[90vh] py-10 px-2 border-[1px] border-r-gray-200 cursor-pointer'>
			<Link
				href='/dashboard'
				className='py-2 px-6 hover:bg-purple-600 hover:text-[#F1F6F9] w-full rounded mb-6 flex items-start'
			>
				<AiFillHome className='mr-2' size={22} />
				Dashboard
			</Link>
			<Link
				href='/events'
				className='py-2 px-6 hover:bg-purple-600  hover:text-[#F1F6F9] w-full rounded mb-6 flex items-start'
			>
				<MdEvent className='mr-2' size={22} />
				Events
			</Link>
			<Link
				href='/create/event'
				className='py-2 px-6 hover:bg-purple-600  hover:text-[#F1F6F9] w-full rounded mb-6 flex items-start'
			>
				<IoIosCreate className='mr-2' size={22} />
				New
			</Link>
			<Link
				href='/scan'
				className='py-2 px-6 hover:bg-purple-600  hover:text-[#F1F6F9] w-full rounded mb-6 flex items-start'
			>
				<FaQrcode className='mr-2' size={22} />
				Scan QR
			</Link>
			<p
				className='py-2 px-6 hover:bg-purple-600 hover:text-[#F1F6F9] w-full rounded mb-6 flex items-start'
				onClick={() => logOut(router)}
			>
				<ImExit className='mr-2' size={22} />
				Log out
			</p>
		</nav>
	);
};

export default SideNav;
