
import React, { useState } from 'react';

interface SupportPagesProps {
  activePage: string;
  onBack: () => void;
}

const SupportPages: React.FC<SupportPagesProps> = ({ activePage, onBack }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'About Us':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
              Crafting the <span className="text-purple-600">Perfect</span> Browsing Experience
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              AnimeSite was born out of a passion for high-performance design and a love for the anime medium. 
              We believe that finding your next favorite show shouldn't be a chore—it should be an adventure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              {[
                { title: 'Community Driven', desc: 'Every feature is built with the feedback of thousands of anime fans worldwide.' },
                { title: 'Blazing Fast', desc: 'Our platform is optimized for speed, ensuring you spend less time waiting and more time watching.' },
                { title: 'Privacy First', desc: 'We respect your data. Your viewing habits belong to you and nobody else.' }
              ].map(item => (
                <div key={item.title} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">{item.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Contact':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-fade-in-up">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Get in Touch</h1>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Have questions, feature requests, or just want to say hello? Our team is always ready to hear from you.
              </p>
              
              <div className="space-y-6">
                {[
                  { label: 'Email', value: 'support@animesite.demo', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                  { label: 'Location', value: 'Cyber City, Neo Tokyo', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-slate-400 tracking-widest">{item.label}</p>
                      <p className="text-slate-900 dark:text-slate-100 font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-xl">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-4 animate-bounce">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Full Name</label>
                    <input type="text" required className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Email Address</label>
                    <input type="email" required className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Message</label>
                    <textarea required rows={4} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none" placeholder="How can we help?"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black py-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all active:scale-[0.98]">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        );

      case 'Terms of Service':
      case 'Privacy Policy':
        return (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-12">{activePage}</h1>
            <div className="prose dark:prose-invert max-w-none space-y-12">
              <section>
                <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4 uppercase tracking-wider">1. Acceptance of Terms</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  By accessing and using AnimeSite, you acknowledge that you have read, understood, and agree to be bound by these terms. This platform is a dummy UI demonstration and does not host copyrighted content.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4 uppercase tracking-wider">2. User Conduct</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Users are expected to interact with the platform in a respectful manner. Any attempt to disrupt the service, scrape data, or distribute harmful code is strictly prohibited.
                </p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4 uppercase tracking-wider">3. Intellectual Property</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The visual design, brand assets, and custom logic of AnimeSite are the intellectual property of the creators. All placeholder images are provided via external APIs for demonstration purposes only.
                </p>
              </section>
              <section className="bg-purple-50 dark:bg-purple-900/10 p-8 rounded-2xl border-l-4 border-purple-500">
                <p className="text-sm italic text-slate-500 dark:text-slate-400">
                  Last updated: October 2024. These policies are subject to change as the platform evolves.
                </p>
              </section>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[80vh] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-12 font-bold"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        {renderContent()}
      </div>
    </div>
  );
};

export default SupportPages;
