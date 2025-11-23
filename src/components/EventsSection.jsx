import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 1,
    title: 'Dhaka Digital Art Workshop',
    date: '2025-12-05',
    time: '15:00',
    location: 'Dhaka Art Center, Dhaka',
    type: 'Workshop',
    description: 'Hands-on session for Bangladeshi digital artists to learn new techniques and tools.'
  },
  {
    id: 2,
    title: 'Bangladesh Neon Nights Exhibition',
    date: '2025-12-12',
    time: '18:30',
    location: 'Bengal Gallery, Dhaka',
    type: 'Exhibition',
    description: 'Showcase of neon-inspired artworks from top BD creators.'
  },
  {
    id: 3,
    title: 'Online Portfolio Review (BD)',
    date: '2025-12-20',
    time: '20:00',
    location: 'Online (Zoom)',
    type: 'Online',
    description: 'Get feedback on your portfolio from Bangladeshi professional artists and curators.'
  },
  {
    id: 4,
    title: 'Meet & Greet: BD Artists',
    date: '2026-01-10',
    time: '16:00',
    location: 'Chittagong Art Society, Chattogram',
    type: 'Meetup',
    description: 'Network and connect with fellow Bangladeshi artists in person.'
  },
  {
    id: 5,
    title: 'AI in Art: Bangladesh Trends',
    date: '2026-01-18',
    time: '19:00',
    location: 'Online (Teams)',
    type: 'Online',
    description: 'Panel discussion on AI and its impact on the future of art in Bangladesh.'
  },
];

const typeColors = {
  Workshop: 'bg-indigo-500',
  Exhibition: 'bg-pink-500',
  Online: 'bg-cyan-500',
  Meetup: 'bg-green-500',
};

const EventsSection = () => {
  React.useEffect(() => {
    gsap.fromTo(
      '.event-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#events-section',
          start: 'top 80%',
        },
      }
    );
    console.log('EventsSection rendered:', events.length, 'events');
  }, []);

  return (
    <section id="events-section" className="pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-50 mb-2 tracking-tight">Upcoming Events</h2>
        <p className="text-base md:text-lg text-slate-400 mb-8">Workshops, exhibitions and meetups for ARTIFY artists.</p>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <div key={event.id} className="event-card rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-lg flex flex-col overflow-hidden min-h-[340px] w-full">
              {/* Dummy event image (for design consistency) */}
              <div className="w-full h-48 bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center">
              </div>
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${typeColors[event.type] || 'bg-gray-700'}`}>{event.type}</span>
                  <span className="text-sm text-white">{event.date} &bull; {event.time}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {/* Dummy icons for event type */}
                  <span>{event.type === 'Workshop' && (<svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>)}</span>
                  <span>{event.type === 'Exhibition' && (<svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" /></svg>)}</span>
                  <span>{event.type === 'Online' && (<svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth={2} fill="none" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" /></svg>)}</span>
                  <span>{event.type === 'Meetup' && (<svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20H4v-2a4 4 0 013-3.87" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth={2} fill="none" /></svg>)}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 truncate">{event.title}</h3>
                <p className="text-sm text-white mb-2">{event.location}</p>
                <p className="text-base text-white mb-4">{event.description}</p>
              </div>
              <div className="flex flex-col gap-2 px-5 pb-4">
                <button className="btn btn-primary rounded-xl px-4 py-2 mt-2 self-start text-sm font-semibold shadow-md">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
