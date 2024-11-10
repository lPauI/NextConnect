// components/UserNav.js
import Link from "next/link";

function UserNav() {
    return (
        <nav className="w-full bg-purple-600 p-4 shadow-md">
            <div className="max-w-3xl mx-auto flex justify-around items-center">
                <h1 className="text-white text-2xl font-bold">NextConnect - User</h1>
                <div className="flex space-x-4">
                    <Link legacyBehavior href="/api/auth/logout?returnTo=/">
                        <a className="bg-white text-red-600 px-4 py-2 rounded-md font-semibold hover:bg-red-200 transition duration-200">
                            Logout
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default UserNav;
