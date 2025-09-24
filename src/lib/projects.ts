import type { Project } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImageUrl = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? image.imageUrl : 'https://picsum.photos/seed/default/600/400';
};

export const projects: Project[] = [
  {
    id: '1',
    slug: 'ai-tutor-app',
    title: 'AI Tutor App',
    shortDescription: 'A personalized learning platform using generative AI.',
    description: 'A fully-featured AI Tutor application that provides personalized learning experiences. Users can interact with an AI chatbot, get explanations on complex topics, and receive customized study plans. The backend is powered by modern AI models to deliver a seamless and intelligent tutoring session.',
    tech: ['Next.js', 'Firebase', 'Genkit', 'Tailwind CSS'],
    thumbnailUrl: getImageUrl('ai-tutor-app-thumbnail'),
    demoUrl: '#',
    githubUrl: '#',
    caseStudy: {
      problem: 'Students often struggle with one-size-fits-all learning materials and lack access to personalized tutoring.',
      solution: 'Developed an AI-powered web app that offers adaptive learning paths, instant answers to questions, and progress tracking. Integrated a state-of-the-art language model to understand and respond to student queries in a natural, conversational way.',
      outcome: 'Initial user feedback showed a 30% increase in engagement compared to traditional online courses. The platform successfully answered over 95% of student queries accurately.',
      learnings: 'The importance of prompt engineering and fine-tuning AI models for specific educational contexts was a key takeaway. Balancing AI capabilities with a user-friendly interface is crucial for adoption.'
    }
  },
  {
    id: '2',
    slug: 'supply-link',
    title: 'Supply Link',
    shortDescription: 'A B2B supply chain management platform.',
    description: 'Supply Link is a robust B2B platform designed to optimize supply chain operations. It provides real-time tracking, inventory management, and analytics to help businesses streamline their logistics and reduce costs.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'GraphQL'],
    thumbnailUrl: getImageUrl('supply-link-thumbnail'),
    demoUrl: '#',
    githubUrl: '#',
    caseStudy: {
      problem: 'Businesses faced inefficiencies in their supply chain due to a lack of real-time visibility and fragmented communication channels.',
      solution: 'Built a centralized dashboard that integrates with various shipping carriers and warehouse systems. Implemented a GraphQL API to provide flexible data querying for clients.',
      outcome: 'Clients reported an average of 15% reduction in shipping delays and a 20% improvement in inventory turnover.',
      learnings: 'Handling large-scale, real-time data streams requires careful architecture design, particularly around database performance and API efficiency.'
    }
  },
  {
    id: '3',
    slug: 'dog-charity-ui',
    title: 'Dog Charity UI',
    shortDescription: 'UI/UX redesign for a non-profit animal rescue.',
    description: 'A complete UI/UX overhaul for a dog charity website. The goal was to create an emotionally engaging and easy-to-navigate experience to increase adoptions and donations. The design is clean, and focuses on high-quality imagery of the dogs.',
    tech: ['Figma', 'React', 'Storybook', 'Vercel'],
    thumbnailUrl: getImageUrl('dog-charity-thumbnail'),
    demoUrl: '#',
    githubUrl: '#',
    caseStudy: {
      problem: 'The existing website was outdated, difficult to use, and failed to effectively showcase the dogs available for adoption, leading to low user engagement.',
      solution: 'Conducted user research to identify pain points and redesigned the entire user flow. Created a component-based design system in Figma and implemented it with React and Storybook for consistency and scalability.',
      outcome: 'The new design led to a 50% increase in online adoption applications within the first three months. The average time on site also doubled.',
      learnings: 'User-centric design and compelling storytelling are powerful tools for non-profits to connect with their audience and drive action.'
    }
  },
  {
    id: '4',
    slug: 'mindful-mate-ui',
    title: 'Mindful Mate UI',
    shortDescription: 'A meditation and wellness mobile app concept.',
    description: 'Mindful Mate is a UI/UX concept for a mobile app aimed at helping users build a consistent meditation practice. The design emphasizes a calm, minimalist aesthetic to create a serene user experience.',
    tech: ['Figma', 'Adobe XD', 'User Research'],
    thumbnailUrl: getImageUrl('mindful-mate-thumbnail'),
    demoUrl: '#',
    githubUrl: '#',
    caseStudy: {
      problem: 'Many people find it difficult to start and maintain a meditation habit due to overwhelming apps and a lack of gentle guidance.',
      solution: 'Designed an interface that is simple, intuitive, and free of distractions. Features include guided meditations, progress tracking, and personalized reminders, all wrapped in a soothing color palette and typography.',
      outcome: 'User testing of the prototype received highly positive feedback on its ease of use and calming design. The onboarding flow was particularly praised for being welcoming to beginners.',
      learnings: 'In the wellness space, the "less is more" design philosophy can significantly enhance the user experience by reducing cognitive load and fostering a sense of peace.'
    }
  }
];
