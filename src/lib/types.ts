
export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string; // Kept for local data compatibility
  shortSummary?: string;     // From Firestore
  tech: string[];
  thumbnailUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudy?: {
    problem: string;
    solution: string;
    outcome: string;
    learnings: string;
  };
  published?: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  designation: string;
  src: string; // URL for the image
};

export type Skill = {
  id: string;
  name: string;
  icon: string; // SVG content
};
