import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '../components/icons';

const ComingSoonPage: React.FC = () => {
  return (
    <>
      
      <main className="min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-white dark:bg-[#050505] transition-colors duration-300 relative overflow-hidden">
        {/* Subtle top gradient */}
        <div
          className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-gray-100/50 to-transparent dark:from-white/[0.02] dark:to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-2xl mx-auto w-full text-center relative z-10">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-[#555] mb-6">
            In Development
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white mb-6">
            Coming Soon
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-[#AAA] mb-12 max-w-xl mx-auto leading-relaxed">
            This experience is not available here yet. Explore our research journal, or contact the team for product availability and access.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/blog" className="rounded-lg px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-medium">Read the journal</Link>
            <a href="mailto:enterprise@webspaceai.in?subject=Product%20availability" className="rounded-lg px-6 py-3 border border-gray-300 dark:border-gray-700 font-medium">Contact the team</a>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-[#222]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-[#AAA] hover:text-black dark:hover:text-white transition-colors group"
            >
              <ArrowRightIcon className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
              <span>Return to homepage</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ComingSoonPage;
