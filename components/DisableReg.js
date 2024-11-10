import React from "react";
import { MdCancel } from "react-icons/md";
import { disableRegistration } from "../utils/functions";

const DisableReg = ({ setDisableRegModal, setClick, id }) => {
	return (
		<div className='w-full h-[100vh] dim absolute top-0 left-0 flex items-center justify-center p-4 z-40'>
			<div className='md:w-[500px] w-full bg-white h-[300px] flex items-center justify-center flex-col rounded-md shadown-purple-100 shadow-md space-y-4 relative '>
				<h2 className='text-xl font-bold text-center'>
					You want to End Event registration link?
				</h2>
				<p className='text-center'>This action cannot be reversed.</p>
				<button
					className='px-4 py-2 rounded-md shadow-md bg-green-500 hover:bg-orange-500 text-white
				'
					onClick={() => {
						disableRegistration(id);
						setClick(true);
						setDisableRegModal(false);
					}}
				>
					Yes, Disable
				</button>
				<MdCancel
					className='text-4xl text-purple-600 cursor-pointer hover:text-purple-600 top-3 absolute right-4'
					onClick={() => setDisableRegModal(false)}
				/>
			</div>
		</div>
	);
};

export default DisableReg;
