import Head from "next/head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FaHandsHelping, FaLeaf, FaChalkboardTeacher, FaGlobe, FaHeartbeat} from "react-icons/fa";
import { MdIncompleteCircle } from "react-icons/md";
import {useRouter} from 'next/router'

export default function Home() {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>NextConnect - Volunteering for a Better World</title>
				<meta
					name="description"
					content="Join our mission to make a difference through volunteering and community support."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/favicon.ico" />
			</Head>
			<main className="home bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen">
				<Nav />
				{/* Hero Section */}
				<section className="h-dvh flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 animated-gradient">
					<h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">Connect, Volunteer, Impact</h1>
					<p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100">
						NextConnect brings passionate people together to make a lasting difference.
						Join us in empowering communities, protecting our planet, and building a brighter future.
					</p>
					<div className="flex gap-6 mt-4">
						<button
							onClick={() => router.push("/dashboard")}
							className="px-10 py-4 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-blue-300 transition-all duration-300 animate-bounce delay-200"
						>
							Create your event
						</button>
						<button
							onClick={() => router.push("/events")}
							className="px-10 py-4 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-purple-300 transition-all duration-300 animate-bounce delay-300"
						>
							See All Events
						</button>
					</div>
				</section>

				{/* Why We’re Different */}
				<section className="py-20 bg-white">
					<div className="container mx-auto px-6 md:px-12 text-center">
						<h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-6 animate-fade-in">
							What Makes Us Unique
						</h2>
						<p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-in delay-100">
							NextConnect redefines volunteering by connecting individuals with meaningful causes
							that match their talents. With us, volunteering is more than just giving back; it’s
							about building a supportive community and creating real change.
						</p>
						<div className="flex flex-col md:flex-row justify-center gap-8">
							{[
								{
									icon: <FaHandsHelping />,
									title: "Collaborative Projects",
									description:
										"We bring people together to achieve more through collaboration, turning individual actions into powerful change.",
								},
								{
									icon: <FaHeartbeat />,
									title: "Sustainable Impact",
									description:
										"Our focus is on projects that make a lasting difference, prioritizing sustainability and community welfare.",
								},
								{
									icon: <FaGlobe />,
									title: "Global Reach",
									description:
										"Our platform connects volunteers from around the world, expanding the impact of each project beyond borders.",
								},
							].map((item, index) => (
								<div
									key={index}
									className="p-8 rounded-lg shadow-lg bg-blue-50 transition-all duration-300 hover:shadow-2xl animate-fade-in delay-200 flex flex-col items-center text-center"
								>
									<div className="text-4xl text-blue-600 mb-4 animate-scale-up">{item.icon}</div>
									<h3 className="text-2xl font-semibold text-blue-600 mb-4">{item.title}</h3>
									<p className="text-gray-600">{item.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Areas of Focus */}
				<section className="py-20 bg-blue-50">
					<div className="container mx-auto px-6 md:px-12">
						<h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 text-center mb-10 animate-fade-in">
							Our Areas of Focus
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
							<div className='p-8 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300'>
								<MdIncompleteCircle className='text-4xl text-blue-600 mb-4 mx-auto' />
								<h3 className='text-2xl font-semibold text-blue-600 mb-4'>
								Find Events
								</h3>
								<p className='text-gray-600'>
								Browse meetups, parties, workshops, and more.
								</p>
							</div>
							<div className='p-8 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300'>
								<FaLeaf className='text-4xl text-blue-600 mb-4 mx-auto' />
								<h3 className='text-2xl font-semibold text-blue-600 mb-4'>
								Join a Community
								</h3>
								<p className='text-gray-600'>
								Connect with people based on your interests, identity, or location.
								</p>
							</div>
							<div className='p-8 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300'>
								<FaChalkboardTeacher className='text-4xl text-blue-600 mb-4 mx-auto' />
								<h3 className='text-2xl font-semibold text-blue-600 mb-4'>
								Host Your Event
								</h3>
								<p className='text-gray-600'>
								Organize your own event and reach a supportive audience.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Impact Section */}
				<section className='py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
					<div className='container mx-auto px-6 md:px-12 text-center'>
						<h2 className='text-3xl md:text-4xl font-extrabold mb-4'>Our Impact</h2>
						<p className='text-lg md:text-xl max-w-2xl mx-auto mb-10'>
						We believe in the power of inclusion to create a society where every individual feels valued and respected. Embracing our differences strengthens our communities, fosters empathy, and allows us all to grow together. Together, we can build a world where everyone belongs.







						</p>
						<button
							onClick={() => router.push("/about")}
							className="px-10 py-4 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 animate-bounce delay-200"
						>
							Who we are
						</button>
					</div>
				</section>

				<Footer />
			</main>

			<style jsx>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes scale-up {
					from {
						transform: scale(0.95);
					}
					to {
						transform: scale(1);
					}
				}

				@keyframes bounce {
					0%, 100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-5px);
					}
				}

				.animate-fade-in {
					animation: fade-in 1s ease-out forwards;
				}

				.animate-fade-in-up {
					animation: fade-in 1s ease-out forwards;
				}

				.animate-scale-up {
					animation: scale-up 0.7s ease-out forwards;
				}

				.animate-bounce {
					animation: bounce 1.5s infinite;
				}
			`}</style>
		</>
	);
}
