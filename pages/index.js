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
				<title>NextConnect</title>
				<meta
					name="description"
					content="Join our mission to make a difference through community support."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/favicon.ico" />
			</Head>
			<main className="home bg-gradient-to-br from-purple-50 via-white to-purple-100 min-h-screen">
				<Nav />
				{/* Hero Section */}
				<section className="h-dvh flex flex-col justify-center items-center text-center bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 animated-gradient">
					<h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">Connect, Include, Belong</h1>
					<p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100">
						NextConnect brings together diverse communities, creating safe and empowering spaces for everyone, especially minorities, to connect and thrive. Join us in fostering inclusivity, celebrating identity, and building a world where everyone truly belongs.
					</p>
					<div className="flex gap-6 mt-4">
						<button
							onClick={() => router.push("/dashboard")}
							className="px-10 py-4 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-purple-300 transition-all duration-300 animate-bounce delay-200"
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
						<h2 className="text-3xl md:text-4xl font-extrabold text-purple-600 mb-6 animate-fade-in">
							What Makes Us Unique
						</h2>
						<p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-in delay-100">
						Nextconnect redefines social connection by creating spaces for all individuals, especially minorities, to belong, connect, and celebrate their identities. Here, inclusion goes beyond simple acceptance—it’s about building a supportive community where everyone is valued and diversity is embraced.
						</p>
						<div className="flex flex-col md:flex-row justify-center gap-8">
							{[
								{
									icon: <FaHandsHelping />,
									title: "Collaborative Spaces",
									description:
										"We bring people from all backgrounds together, fostering connections through shared experiences and mutual respect.",
								},
								{
									icon: <FaHeartbeat />,
									title: "Meaningful Impact",
									description:
										"Our focus is on creating events and connections that make a lasting difference in the lives of LGBTQ+ individuals, ethnic minorities, people with disabilities, and all those seeking a welcoming community.",
								},
								{
									icon: <FaGlobe />,
									title: "Expanding Connections",
									description:
										"Our platform connects people locally and globally, empowering individuals to find inclusive events and communities across different cities and cultures.",
								},
							].map((item, index) => (
								<div
									key={index}
									className="p-8 rounded-lg shadow-lg bg-purple-50 transition-all duration-300 hover:shadow-2xl animate-fade-in delay-200 flex flex-col items-center text-center"
								>
									<div className="text-4xl text-purple-600 mb-4 animate-scale-up">{item.icon}</div>
									<h3 className="text-2xl font-semibold text-purple-600 mb-4">{item.title}</h3>
									<p className="text-gray-600">{item.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Areas of Focus */}
				<section className="py-20 bg-purple-50">
					<div className="container mx-auto px-6 md:px-12">
						<h2 className="text-3xl md:text-4xl font-extrabold text-purple-600 text-center mb-10 animate-fade-in">
							Our Areas of Focus
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
							<div className='p-8 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300'>
								<MdIncompleteCircle className='text-4xl text-purple-600 mb-4 mx-auto' />
								<h3 className='text-2xl font-semibold text-purple-600 mb-4'>
								Find Events
								</h3>
								<p className='text-gray-600'>
								Browse a wide variety of events tailored for diverse communities—whether you’re looking for LGBTQ+ meetups, cultural celebrations, support groups, workshops, or just a fun night out. 
								</p>
							</div>
							<div className='p-8 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300'>
								<FaLeaf className='text-4xl text-purple-600 mb-4 mx-auto' />
								<h3 className='text-2xl font-semibold text-purple-600 mb-4'>
								Join a Community
								</h3>
								<p className='text-gray-600'>
								Connect with people based on your interests, identity, or location.
								</p>
							</div>
							<div className='p-8 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300'>
								<FaChalkboardTeacher className='text-4xl text-purple-600 mb-4 mx-auto' />
								<h3 className='text-2xl font-semibold text-purple-600 mb-4'>
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
				<section className='py-20 bg-gradient-to-r from-purple-500 to-purple-600 text-white'>
					<div className='container mx-auto px-6 md:px-12 text-center'>
						<h2 className='text-3xl md:text-4xl font-extrabold mb-4'>Our Impact</h2>
						<p className='text-lg md:text-xl max-w-2xl mx-auto mb-10'>
						We believe in the power of inclusion to create a society where every individual feels valued and respected. Embracing our differences strengthens our communities, fosters empathy, and allows us all to grow together. Together, we can build a world where everyone belongs.







						</p>
						<button
							onClick={() => router.push("/about")}
							className="px-10 py-4 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-purple-700 hover:text-white transition-all duration-300 animate-bounce delay-200"
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
