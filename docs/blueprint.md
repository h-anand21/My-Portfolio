# **App Name**: Portfolio Pro

## Core Features:

- Hero Section: Showcase a photo, name, and a one-line value proposition to introduce the user.
- Projects Grid: Display projects in a grid layout, including title, short description, tech tags, thumbnail, and links.
- Project Detail (Case Study): Provide detailed case studies for selected projects.
- About Section: Include an 'About' section with information about the user's background and skills.
- Resume Download: Enable users to download a resume.
- Contact Form: Implement a contact form that posts to `/api/contact` serverless endpoint, storing data in Firestore.
- AI Case Study Summary: Generate short case study summaries using Firebase AI Logic / Vertex via a POST request to /api/ai/generate-case-summary tool.

## Style Guidelines:

- Primary color: Deep indigo (#3F51B5) to convey trust, intelligence, and professionalism.
- Background color: Very light grey (#F5F5F5), almost white, to create a clean and modern feel.
- Accent color: Vibrant magenta (#E91E63) for call-to-action buttons and highlights.
- Headline font: 'Space Grotesk', a geometric sans-serif for a modern, tech-forward feel.
- Body font: 'Inter', a grotesque-style sans-serif providing a neutral and readable text experience.
- Code font: 'Source Code Pro', a monospaced sans-serif font, ideal for displaying code snippets.
- Use simple, line-based icons from Uiverse to maintain a consistent and clean design.
- Employ a responsive single-page layout with clear sections and smooth transitions.
- Implement entrance animations for the hero section and staggered reveals for project cards using Framer Motion.