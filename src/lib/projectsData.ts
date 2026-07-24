export interface ProjectTech {
  name: string;
  iconKey?: string;
  iconColor?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  images: string[];
  technologies: ProjectTech[];
  features: string[];
  challenges?: string[];
  futureImprovements?: string[];
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
  isFeatured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "scholarbridge",
    slug: "scholarbridge",
    title: "ScholarBridge",
    subtitle: "Scholarship Management & Application Portal",
    description:
      "A comprehensive scholarship management platform connecting students with financial aid opportunities and real-time application tracking.",
    longDescription:
      "ScholarBridge streamlines the entire scholarship search and application cycle. Built with modern full-stack architecture, it empowers students to match with tailored funding options while providing institution administrators with automated verification, application scoring, and live status updates.",
    images: [
      "/projects/scholarbridge1.png",
      "/projects/scholarbridge2.png",
      "/projects/scholarbridge3.png",
      "/projects/scholarbridge4.png",
      "/projects/scholarbridge5.png",
    ],
    badge: "Full-Stack Portal",
    isFeatured: false,
    technologies: [
      { name: "Next.js", iconKey: "nextjs", iconColor: "text-slate-900 dark:text-white" },
      { name: "TypeScript", iconKey: "typescript", iconColor: "text-blue-500" },
      { name: "MongoDB", iconKey: "mongodb", iconColor: "text-emerald-500" },
      { name: "Express.js", iconKey: "express", iconColor: "text-slate-700 dark:text-slate-300" },
      { name: "Tailwind CSS", iconKey: "tailwind", iconColor: "text-sky-400" },
    ],
    features: [
      "AI-assisted scholarship matching algorithm based on student profile data",
      "Real-time application status dashboard with automated email notifications",
      "Secure encrypted document upload and multi-stage verification workflows",
      "Role-based access control (RBAC) for students, reviewers, and super admins",
    ],
    challenges: [
      "Designing complex multi-role authorization matrix with fine-grained document access permissions.",
      "Optimizing MongoDB database indexing for fast faceted filtering across thousands of active scholarship listings.",
    ],
    futureImprovements: [
      "Integrating direct bank API disbursement for automated scholarship fund transfers.",
      "Adding AI resume parser to auto-fill application fields directly from uploaded PDFs.",
    ],
    liveUrl: "https://scholarbridge-client.vercel.app",
    githubUrl: "https://github.com/amitchandradas2004/ScholarBridge-A-Scholarship-Discovery-and-Management-Platform",
  },
  {
    id: "startupforge",
    slug: "startupforge",
    title: "StartupForge",
    subtitle: "SaaS Boilerplate & Founder Launchpad",
    description:
      "An end-to-end SaaS launch platform equipped with multi-tenant auth, automated Stripe subscription billing, and founder workspace analytics.",
    longDescription:
      "StartupForge accelerates SaaS deployment by providing a battle-tested foundation. Featuring seamless authentication via Better Auth, subscription tier billing via Stripe, and database management with MongoDB, founders can launch production-ready products in record time.",
    images: [
      "/projects/startupforge1.png",
      "/projects/startupforge2.png",
      "/projects/startupforge3.png",
      "/projects/startupforge4.png",
      "/projects/startupforge5.png",
    ],
    badge: "SaaS Platform",
    isFeatured: true,
    technologies: [
      { name: "Next.js", iconKey: "nextjs", iconColor: "text-slate-900 dark:text-white" },
      { name: "Better Auth", iconKey: "betterauth", iconColor: "text-indigo-400" },
      { name: "Stripe", iconKey: "stripe", iconColor: "text-purple-400" },
      { name: "MongoDB", iconKey: "mongodb", iconColor: "text-emerald-500" },
    ],
    features: [
      "Multi-tenant session management with OAuth social login integrations",
      "Stripe Customer Portal & real-time webhook subscription tier synchronization",
      "Interactive growth metric analytics and founder revenue performance tracking",
      "Fully responsive dark/light theme dashboard with customizable widgets",
    ],
    challenges: [
      "Handling Stripe webhook event race conditions during immediate upgrade/downgrade subscription events.",
      "Ensuring zero latency state updates across distributed multi-tenant workspace environments.",
    ],
    futureImprovements: [
      "Implementing multi-region database replication for global SaaS deployments.",
      "Adding automated team seat billing and usage-based invoice calculation.",
    ],
    liveUrl: "https://startupforge-client-swart.vercel.app",
    githubUrl: "https://github.com/amitchandradas2004/StartupForge-Startup-Team-Builder-Platform-ClientSide",
  },
  {
    id: "hireloop",
    slug: "hireloop",
    title: "HireLoop",
    subtitle: "Smart Applicant Tracking & Recruitment Engine",
    description:
      "An intelligent applicant tracking solution simplifying candidate pipelines, automated screening, and recruitment scheduling.",
    longDescription:
      "HireLoop transforms talent acquisition by offering recruiters an intuitive Kanban-style candidate pipeline, automated resume parsed summaries, interview scheduling tools, and team candidate evaluation scorecards.",
    images: [
      "/projects/hireloop1.png",
      "/projects/hireloop2.png",
      "/projects/hireloop3.png",
      "/projects/hireloop4.png",
      "/projects/hireloop5.png",
    ],
    badge: "Recruitment Tool",
    isFeatured: true,
    technologies: [
      { name: "React", iconKey: "react", iconColor: "text-cyan-400" },
      { name: "Node.js", iconKey: "nodejs", iconColor: "text-emerald-500" },
      { name: "Express.js", iconKey: "express", iconColor: "text-slate-700 dark:text-slate-300" },
      { name: "MongoDB", iconKey: "mongodb", iconColor: "text-emerald-500" },
    ],
    features: [
      "Drag-and-drop Kanban candidate stage pipeline management",
      "Automated candidate email communications & interview calendar synchronization",
      "Structured team interview evaluation scorecard matrix",
      "Scalable RESTful API backend with modular service layer architecture",
    ],
    challenges: [
      "Maintaining smooth 60fps drag-and-drop performance when rendering hundreds of candidate cards.",
      "Synchronizing concurrent recruiter score edits without state drift.",
    ],
    futureImprovements: [
      "Integrating automated video interview screening powered by speech-to-text AI.",
      "Building 1-click job board syndication to LinkedIn & Indeed APIs.",
    ],
    liveUrl: "https://hireloop-client-one.vercel.app",
    githubUrl: "https://github.com/amitchandradas2004/Hireloop-Client",
  },
  {
    id: "nextmatch",
    slug: "nextmatch",
    title: "NextMatch",
    subtitle: "AI-Powered Property Rental Platform",
    description:
      "A full-stack rental discovery platform where users browse, filter, and list properties, enhanced by two agentic AI features: a context-aware chat assistant and a feedback-driven recommendation engine.",
    longDescription:
      "NextMatch reimagines property rental discovery by combining a polished full-stack marketplace with genuine AI reasoning. Users can search and filter verified listings, publish their own properties, and manage them through a personal dashboard — all secured with Better Auth and Google OAuth. What sets it apart is the AI layer: a conversational assistant that understands live listing data and answers grounded, context-aware questions with full conversation memory, alongside a smart recommendation engine that ranks properties against user preferences and continuously improves from thumbs up/down feedback.",
    images: [
      "/projects/nextmatch1.png",
      "/projects/nextmatch2.png",
      "/projects/nextmatch3.png",
      "/projects/nextmatch4.png",
      "/projects/nextmatch5.png",
      "/projects/nextmatch6.png",
    ],
    badge: "Full Stack AI Platform",
    isFeatured: true,
    technologies: [
      { name: "Next.js", iconKey: "nextjs", iconColor: "text-slate-900 dark:text-white" },
      { name: "TypeScript", iconKey: "typescript", iconColor: "text-blue-500" },
      { name: "Express.js", iconKey: "express", iconColor: "text-slate-500 dark:text-slate-300" },
      { name: "MongoDB", iconKey: "mongodb", iconColor: "text-emerald-500" },
      { name: "Better Auth", iconKey: "betterauth", iconColor: "text-indigo-400" },
      { name: "Gemini API", iconKey: "gemini", iconColor: "text-teal-400" },
    ],
    features: [
      "AI Chat Assistant with persistent conversation history, live database-grounded answers, and suggested follow-up prompts",
      "Smart Recommendation Engine that ranks listings by user preferences and improves from ongoing feedback",
      "Full listing CRUD with search, multi-field filtering, sorting, and pagination",
      "Secure authentication via Better Auth with Google OAuth and a one-click demo login",
      "Fully responsive dark/light theme UI across homepage, explore, details, and dashboard pages",
    ],
    challenges: [
      "Resolving cross-domain session cookie handling between a separately deployed Next.js frontend and Express backend, including SameSite, Secure, and __Secure- prefixed cookie naming in production.",
      "Migrating from a deprecated Gemini SDK and model version mid-development while preserving streaming responses and conversation memory.",
    ],
    futureImprovements: [
      "Adding a map-based explore view using existing listing geolocation data.",
      "Expanding the recommendation engine with a persisted user favorites/saved listings feature.",
    ],
    liveUrl: "https://next-match-a-property-room-rental-d.vercel.app",
    githubUrl: "https://github.com/amitchandradas2004/NextMatch-A-Property-Room-Rental-Discovery-Platform.",
  },
  {
    id: "sportnest",
    slug: "sportnest",
    title: "SportNest",
    subtitle: "Sports Community & Event Management Platform",
    description:
      "A modern sports platform that helps users discover events, manage teams, track activities, and connect with the sports community.",
    longDescription:
      "SportNest is a full-stack sports management platform designed to bring athletes, teams, and organizers together. It provides an intuitive experience for discovering sports events, managing team activities, and creating a connected sports ecosystem with modern web technologies.",
    images: [
      "/projects/sportnest1.png",
      "/projects/sportnest2.png",
      "/projects/sportnest3.png",
      "/projects/sportnest4.png",
      "/projects/sportnest5.png",
    ],
    badge: "Sports Platform",
    isFeatured: false,
    technologies: [
      { name: "Next.js", iconKey: "nextjs", iconColor: "text-black dark:text-white" },
      { name: "Tailwind CSS", iconKey: "tailwind", iconColor: "text-cyan-400" },
      { name: "Node.js", iconKey: "nodejs", iconColor: "text-green-500" },
      { name: "Express.js", iconKey: "express", iconColor: "text-slate-700 dark:text-slate-300" },
      { name: "MongoDB", iconKey: "mongodb", iconColor: "text-emerald-500" },
    ],
    features: [
      "User authentication and personalized sports profiles",
      "Sports event discovery and registration system",
      "Team creation, management, and player coordination",
      "Responsive dashboard for tracking sports activities",
      "REST API architecture for efficient data management",
    ],
    challenges: [
      "Designing a scalable database structure for users, teams, and sports events.",
      "Building reusable components and maintaining consistent UI across multiple pages.",
      "Implementing efficient API communication between frontend and backend.",
    ],
    futureImprovements: [
      "Real-time team chat and communication system using WebSockets.",
      "AI-powered sports recommendations based on user interests and activities.",
      "Live match tracking and advanced performance analytics.",
      "Mobile application support for Android and iOS users.",
    ],
    liveUrl: "https://sportnest-black.vercel.app",
    githubUrl: "https://github.com/amitchandradas2004/SportNest-Sports-Facility-Booking-Management-System",
  },
  {
    id: "bookverse",
    slug: "bookverse",
    title: "BookVerse",
    subtitle: "Online Book Management & Discovery Platform",
    description:
      "A modern online bookstore platform where users can explore, manage, and discover books with seamless browsing and personalized experiences.",
    longDescription:
      "BookVerse is a full-stack book management platform designed for book lovers and administrators. It provides a smooth experience for discovering books, managing collections, and organizing digital libraries with a responsive interface and efficient backend architecture.",
    images: [
      "/projects/bookverse.png",
      "/projects/bookverse1.png",
    ],
    badge: "Book Platform",
    isFeatured: false,
    technologies: [
      {
        name: "Next.js",
        iconKey: "nextjs",
        iconColor: "text-cyan-400"
      },
      {
        name: "Node.js",
        iconKey: "nodejs",
        iconColor: "text-green-500"
      },
      {
        name: "MongoDB",
        iconKey: "mongodb",
        iconColor: "text-emerald-500"
      },
    ],
    features: [
      "Advanced book browsing with category-based filtering and search functionality",
      "User-friendly book management system with CRUD operations",
      "Responsive interface optimized for desktop, tablet, and mobile devices",
      "Secure REST API backend for managing books and user data",
    ],
    challenges: [
      "Designing an efficient database structure for managing large collections of books and related information.",
      "Creating a smooth user experience while handling dynamic search, filtering, and real-time data updates.",
    ],
    futureImprovements: [
      "Adding online payment integration for purchasing books.",
      "Implementing AI-powered book recommendations based on user preferences and reading history.",
      "Adding user reviews, ratings, and personalized reading lists.",
    ],
    liveUrl: "https://book-verse-online-book-borrowing-se.vercel.app",
    githubUrl: "https://github.com/amitchandradas2004/BookVerse-Online-Book-Borrowing-Service",
  }
];
