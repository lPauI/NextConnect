import { UserProvider, withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import VolunteerNav from '../components/VolunteerNav';

function VolunteerDashboard() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <VolunteerNav />
            <main className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
                    Welcome to Your Volunteer Dashboard
                </h1>
                <p className="text-lg text-gray-700 text-center mb-8">
                    Here you can see all your registered events and details.
                </p>
                <div className="flex flex-col items-center">
                    <p className="text-lg text-gray-800 font-semibold mb-2">
                        User Email: <span className="text-blue-500">{user?.email}</span>
                    </p>
                    {/* Placeholder for additional user-specific information */}
                    <p className="text-gray-600 text-sm mt-4">More details coming soon!</p>
                </div>
            </main>
        </div>
    );
}

// Wrap VolunteerDashboard with UserProvider and protect the page using withPageAuthRequired
export default withPageAuthRequired(function VolunteerDashboardWrapper() {
    return (
        <UserProvider>
            <VolunteerDashboard />
        </UserProvider>
    );
});
