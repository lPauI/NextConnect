import React from "react";
import Link from "next/link"; // Import the Link component
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="home bg-gradient-to-br from-purple-50 via-white to-purple-100 min-h-screen">
      {/* Hero Section */}
      <Nav />
      <section className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-20 text-center px-6">
        <h1 className="text-5xl font-bold">About Us</h1>
        <p className="mt-4 text-xl">
        We believe in the power of connection. Nextconnect is here to create a world where everyone feels welcomed and valued, regardless of background or identity.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid gap-8 lg:grid-cols-3">
        <h2 className="text-3xl font-semibold text-center lg:col-span-3">Our Core Values</h2>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
          <img src="/images/icon-quality.svg" alt="Quality" className="h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2 ">Inclusion</h3>
          <p className="text-gray-600 text-center">
          Making space for everyone, no matter who they are or where they come from.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
          <img src="/images/icon-innovation.svg" alt="Innovation" className="h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2">Community Support</h3>
          <p className="text-gray-600 text-center">
          Building a network of support, so no one feels alone.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
          <img src="/images/icon-support.svg" alt="Support" className="h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2">Unity in Diversity</h3>
          <p className="text-gray-600 text-center">
            Our team is here to assist you at every step, ensuring a hassle-free experience.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
<section className="w-full bg-gray-100 py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-semibold">Meet Our Team</h2>
    <p className="text-gray-700 mt-2 mb-8">
      A passionate team working together to create a remarkable platform.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img src="/images/team-member-1.png" alt="Cimbru Darius" className="h-32 w-32 rounded-full mx-auto object-cover" />
        <h3 className="text-xl font-bold mt-4">Cimbru Darius</h3>
        <p className="text-gray-600">Lead Developer</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img src="/images/team-member-2.png" alt="Lascu Paul" className="h-32 w-32 rounded-full mx-auto object-cover" />
        <h3 className="text-xl font-bold mt-4">Lascu Paul</h3>
        <p className="text-gray-600">Developer</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img src="/images/team-member-3.png" alt="Barbu Razvan" className="h-32 w-32 rounded-full mx-auto object-cover" />
        <h3 className="text-xl font-bold mt-4">Barbu Razvan</h3>
        <p className="text-gray-600">Diversity & Inclusion Specialist</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <img src="/images/team-member-4.jpg" alt="Alex Cortojan" className="h-32 w-32 rounded-full mx-auto object-cover" />
        <h3 className="text-xl font-bold mt-4">Alex Cortojan</h3>
        <p className="text-gray-600">UX/UI Designer</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <img src="/images/team-member-6.png" alt="Erol Ciucur" className="h-32 w-32 rounded-full mx-auto object-cover" />
        <h3 className="text-xl font-bold mt-4">Erol Ciucur</h3>
        <p className="text-gray-600">Developer</p>
      </div>
    </div>
  </div>
</section>


      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold text-center">What Our Users Say</h2>
        <div className="mt-8 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 italic">"Nextconnect gave me a space where I can be myself and connect with others who understand my journey. It’s been life-changing"</p>
            <p className="text-right mt-4 text-purple-700 font-semibold">– Alex Johnson</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 italic">"Finding a community that celebrates diversity has never been this easy. I feel seen and valued here."</p>
            <p className="text-right mt-4 text-purple-700 font-semibold">– Maria Gomez</p>
          </div>
          {/* Add more testimonials */}
        </div>
      </section>

      {/* Technology Used Section */}
      <section className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-3xl font-semibold">Technologies We Use</h2>
    <p className="mt-4 mb-8 max-w-2xl mx-auto">
      Our platform leverages cutting-edge tools and frameworks to deliver a reliable, responsive, and high-performance user experience.
    </p>
    <div className="flex flex-wrap justify-center gap-8 text-white">
      
      
      <div className="text-center max-w-xs">
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          <img src="/images/nextjs-logo.svg" alt="Next.js" className="h-12 filter invert mx-auto mb-3" />
          <h3 className="text-xl font-semibold">Next.js</h3>
        </a>
        <p className="text-sm mt-2">A React framework for building fast, SEO-friendly websites with server-side rendering and static site generation.</p>
      </div>

      
      <div className="text-center max-w-xs">
        <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">
          <img src="/images/tailwind-logo.svg" alt="Tailwind CSS" className="h-12 filter invert mx-auto mb-3" />
          <h3 className="text-xl font-semibold">Tailwind CSS</h3>
        </a>
        <p className="text-sm mt-2">An utility-first CSS framework that allows us to design responsive, fast-loading, and modern interfaces directly within the HTML structure.</p>
      </div>

      
      <div className="text-center max-w-xs">
        <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
          <img src="/images/nodejs-logo.svg" alt="Node.js" className="h-12 filter invert mx-auto mb-3" />
          <h3 className="text-xl font-semibold">Node.js</h3>
        </a>
        <p className="text-sm mt-2">A JavaScript runtime that allows us to build scalable, high-performance backends with asynchronous, event-driven architecture.</p>
      </div>

      
      
    </div>
  </div>
</section>
<Footer />
    </div>
  );
};

export default About;
