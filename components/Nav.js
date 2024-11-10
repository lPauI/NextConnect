import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { BsGithub, BsTwitter } from "react-icons/bs";
import Image from "next/image";

const Nav = () => {
    const [hamburger, setHamburger] = useState(false);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const router = useRouter();

    const handleDashboardClick = () => {
        setShowRoleModal(true); // Show the role selection modal
    };

    const handleRoleSelection = (role) => {
        // Store the role in session storage
        sessionStorage.setItem("userRole", role);

        // Redirect based on the selected role
        if (role === "organiser") {
            router.push("/dashboard");
        } else if (role === "participant") {
            router.push("/user");
        }

        setShowRoleModal(false); // Close the modal
    };

    return (
        <div className='h-[10vh] flex items-center justify-between px-[20px] sticky top-0 bg-white z-50'>
            <Link href='/'>
                <h1 className='text-xl font-bold text-black'>
                    <Image
                        src='/images/logo.png'
                        alt='Logo'
                        width={80}
                        height={80}
                        className='mr-2 ml-2'
                    />
                </h1>
            </Link>
            <div className='md:flex items-center justify-between hidden space-x-8'>
                {/* Dashboard Button with Role Selection */}
                <button
                    onClick={handleDashboardClick}
                    className='px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300'
                >
                    Dashboard
                </button>
            </div>
            <div className='md:hidden block'>
                <GiHamburgerMenu
                    className='cursor-pointer text-2xl text-gray-400'
                    onClick={() => setHamburger(true)}
                />
            </div>
            {hamburger && (
                <nav className='fixed top-0 right-0 w-1/2 h-[100vh] p-6 bg-white z-50'>
                    <div className='w-full flex items-center justify-end mb-8'>
                        <MdCancel
                            className='text-4xl text-blue-600 cursor-pointer hover:text-white'
                            onClick={() => setHamburger(false)}
                        />
                    </div>
                    <div className='flex w-full flex-col space-y-8'>
                        <button
                            onClick={handleDashboardClick}
                            className='text-gray-700 hover:text-blue-600'
                        >
                            Dashboard
                        </button>
                    </div>
                </nav>
            )}
            {/* Role Selection Modal */}
            {showRoleModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <h2 className='text-xl font-semibold mb-4'>Select Your Role</h2>
                        <div className='flex space-x-4'>
                            <button
                                onClick={() => handleRoleSelection("organiser")}
                                className='px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200'
                            >
                                Event Organiser
                            </button>
                            <button
                                onClick={() => handleRoleSelection("participant")}
                                className='px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition duration-200'
                            >
                                Participant
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nav;
