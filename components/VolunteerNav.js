import Link from 'next/link';

function VolunteerNav() {
    return (
        <nav className="w-full bg-blue-600 p-4 shadow-md">
            <div className="max-w-3xl mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">NextConnect Volunteer Dashboard</h1>
                <div className="flex space-x-4">
                    <Link legacyBehavior href="/api/auth/login?returnTo=/volunteer">
                        <a className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-200 transition duration-200">
                            Login
                        </a>
                    </Link>
                    <Link legacyBehavior href="/api/auth/logout?returnTo=/volunteer">
                        <a className="bg-white text-red-600 px-4 py-2 rounded-md font-semibold hover:bg-red-200 transition duration-200">
                            Logout
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default VolunteerNav;
