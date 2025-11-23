import { Link } from 'react-router-dom';


const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 dark:from-primary/5 dark:via-secondary/5 dark:to-accent/5 relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none z-0">
      
        <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full">
          <circle cx="200" cy="150" r="80" fill="#f472b6" fillOpacity="0.18" />
          <ellipse cx="1200" cy="650" rx="120" ry="60" fill="#60a5fa" fillOpacity="0.15" />
          <circle cx="900" cy="200" r="60" fill="#34d399" fillOpacity="0.15" />
          <ellipse cx="400" cy="700" rx="90" ry="40" fill="#fbbf24" fillOpacity="0.13" />
        </svg>
        
        <div className="absolute top-10 left-10 text-6xl opacity-20 select-none">🎨</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 select-none">🖼️</div>
        <div className="absolute bottom-20 left-20 text-7xl opacity-20 select-none">✨</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 select-none">🎭</div>
        <div className="absolute top-1/2 left-1/4 text-5xl opacity-20 select-none">🖌️</div>
        <div className="absolute top-1/3 right-1/4 text-6xl opacity-20 select-none">🎪</div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-8 drop-shadow-lg">404 Not Found</h1>
        <Link
          to="/"
          className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
