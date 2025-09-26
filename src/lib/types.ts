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
