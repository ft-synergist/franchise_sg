import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800 py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Brand & Context */}
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-extrabold text-white text-lg tracking-tight">Franchise.sg</span>
            <span className="bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] uppercase px-2 py-0.5 rounded-full font-semibold">
              Singapore Portal
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Singapore&apos;s premier portal for verified franchise listings, capital setup requirements, and enterprise franchise insights.
          </p>
        </div>

        {/* Visible Contextual Backlink & Advisory Attribution */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-xs text-slate-400">
            Strategic Advisory Partner:{' '}
            <a
              href="https://www.ftsynergist.com/franchise-consultant"
              target="_blank"
              rel="noopener"
              className="font-semibold underline text-slate-300 hover:text-[#8F801B] transition-colors"
            >
              FT Synergist – Certified Franchise Consultant Singapore
            </a>
          </p>
          <p className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} Franchise.sg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
