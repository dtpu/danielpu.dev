
export type Project = {
    title: string;
    description: string;
    link: string;
    tech: string[];
    image: string;
    gridSize: "1x1" | "2x1" | "1x2" | "2x2";
};

export const projects: Project[] = [
    {
        title: "Personal Website",
        description: "A personal portfolio website built with SvelteKit and hosted on Vercel. Features a modern design with smooth animations, 3D card effects, and a responsive bento grid layout for showcasing projects.",
        link: "https://www.example.com",
        tech: ["SvelteKit", "TypeScript", "TailwindCSS", "Vercel"],
        image: "/images/projects/personalWebsite.png",
        gridSize: "2x2"
    },
    {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.",
        link: "https://www.example.com",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        gridSize: "1x2"
    },
    {
        title: "Weather App",
        description: "Real-time weather application with location services and 7-day forecasts.",
        link: "https://www.example.com",
        tech: ["Vue.js", "OpenWeather API"],
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
        gridSize: "1x1"
    },
    {
        title: "Task Manager",
        description: "Collaborative task management tool with drag-and-drop functionality, real-time updates, and team collaboration features.",
        link: "https://www.example.com",
        tech: ["Next.js", "Prisma", "PostgreSQL", "tRPC"],
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
        gridSize: "2x1"
    },
    {
        title: "Fitness Tracker",
        description: "Mobile-first fitness tracking app with workout logging and progress visualization.",
        link: "https://www.example.com",
        tech: ["React Native", "Firebase"],
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
        gridSize: "1x1"
    },
    {
        title: "AI Chat Bot",
        description: "Intelligent chatbot powered by GPT-4 with context awareness and natural language processing capabilities.",
        link: "https://www.example.com",
        tech: ["Python", "OpenAI", "FastAPI", "Redis"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        gridSize: "1x2"
    },
    {
        title: "Music Player",
        description: "Sleek music streaming application with playlist management and recommendations.",
        link: "https://www.example.com",
        tech: ["Angular", "Spotify API"],
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
        gridSize: "1x1"
    },
    {
        title: "Code Editor",
        description: "Browser-based code editor with syntax highlighting, live preview, and collaborative editing features.",
        link: "https://www.example.com",
        tech: ["Monaco Editor", "WebSockets", "Docker"],
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
        gridSize: "2x1"
    },
    {
        title: "Recipe Finder",
        description: "Discover recipes based on ingredients with nutritional information and meal planning.",
        link: "https://www.example.com",
        tech: ["Svelte", "Spoonacular API"],
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
        gridSize: "1x1"
    }
]