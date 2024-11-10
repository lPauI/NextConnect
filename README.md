# Safe Spaces Application with Next.js and Appwrite Cloud

Safe Spaces is a web application built with Next.js, Appwrite Cloud, and other modern tools to facilitate the organization and management of events. It offers a secure and user-friendly experience for creating events, managing attendees, and verifying ticket authenticity. This app is ideal for users looking to organize both private and public gatherings, with simple sharing and registration capabilities.

## Features

- **User Authentication**  
  Users can register and log in using their email and password through Appwrite Cloud’s authentication system, ensuring data security and ease of access.

- **Event Creation and Management**  
  Users can create new events with customizable details, such as event name, description, date, and location. Each event generates a unique registration link that can be shared with friends, family, or the public for easy access to registration.

- **Registration and Ticketing System**  
  When a user registers for an event via the shared invite link, they receive a confirmation email that includes an event ticket with a unique QR code. The QR code can be scanned at the event to verify ticket authenticity, helping organizers maintain event security.

- **Dashboard for Event Organizers**  
  Organizers have access to a dashboard where they can view the total number of registrants for each event. The dashboard allows organizers to validate attendees' tickets by scanning their QR codes at the event entrance. Organizers can disable the registration link when the maximum number of attendees has been reached, preventing further registrations.

- **Event Archiving and Deletion**  
  After an event concludes, organizers can delete it from the system to keep their dashboard organized and relevant. Disabling the registration link before an event or deleting the event after it has ended helps maintain control over attendance and data privacy.

## Tech Stack

- **Next.js 15** - A React framework that provides server-side rendering, static site generation, and routing features, allowing the Safe Spaces application to perform optimally.  
- **Tailwind CSS** - A utility-first CSS framework that enables rapid and responsive design, making the app visually appealing and consistent.  
- **Appwrite Cloud** - A backend-as-a-service (BaaS) that provides secure authentication, database management, and storage functionalities, enabling a streamlined and scalable backend infrastructure.  

## Additional Libraries

- **[React Table](https://react-table-v7.tanstack.com)** - Used to organize and display event data in a clean, sortable, and searchable table format on the dashboard, improving user experience for event organizers.  
- **[React Icons](https://react-icons.github.io/react-icons)** - Provides a collection of commonly used icons to enhance the application's UI, making it more intuitive and visually engaging.  
- **[EmailJS](https://www.emailjs.com)** - Allows the app to send automated emails, such as registration confirmations with QR-coded tickets, without requiring a backend email server.  
- **[React Toastify](https://fkhadra.github.io/react-toastify/introduction)** - Enables customizable toast notifications that inform users of actions and status changes in real-time (e.g., successful registration, event deletion).  
- **[React Copy To Clipboard](https://github.com/nkbt/react-copy-to-clipboard)** - Facilitates easy copying of registration links to the clipboard, simplifying the sharing process for users who want to distribute their event’s invite link.  

## Getting Started

### Prerequisites

- Make sure you have Node.js installed on your system. You can download it [here](https://nodejs.org/).
- You will also need an Appwrite Cloud account to set up authentication and database features.

### Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/safe-spaces-app.git
   cd safe-spaces-app


## Tools
- [NextJS 15](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Appwrite Cloud](https://appwrite.io)
- [React Table](https://react-table-v7.tanstack.com)
- [React Icons](https://react-icons.github.io/react-icons)
- [EmailJS](https://www.emailjs.com)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
- [React Copy To Clipboard](https://github.com/nkbt/react-copy-to-clipboard)
