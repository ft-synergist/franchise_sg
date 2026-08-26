import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800 py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-center md:text-left">
          
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-white text-lg tracking-tight">Franchise.sg</span>
              <span className="bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] uppercase px-2 py-0.5 rounded-full font-semibold">
                Singapore &amp; Regional Hub
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Singapore&apos;s premier commercial portal for verified franchise listings, startup capital parameters, and institutional franchise market intelligence.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-400">
              <Link href="/insights" className="hover:text-teal-400 transition-colors">Market Insights</Link>
              <span>·</span>
              <Link href="/for-sale" className="hover:text-teal-400 transition-colors">Businesses For Sale</Link>
              <span>·</span>
              <Link href="/editors" className="hover:text-teal-400 transition-colors">Editorial Board</Link>
              <span>·</span>
              <Link href="/apply" className="hover:text-teal-400 transition-colors">List Your Brand</Link>
            </div>
          </div>

          {/* Strategic Advisory & Cross-Border Ecosystem */}
          <div className="md:col-span-7 flex flex-col md:items-end justify-between space-y-4">
            <div className="space-y-3 md:text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Strategic Franchise Advisory &amp; Global Scaling
              </span>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-slate-400">
                    Singapore Advisory Partner:{' '}
                    <a
                      href="https://www.ftsynergist.com/franchise-consultant"
                      target="_blank"
                      rel="noopener"
                      className="font-semibold text-slate-200 hover:text-teal-400 underline decoration-slate-600 underline-offset-2 transition-colors"
                    >
                      FT Synergist – Certified Franchise Consultant Singapore
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">
                    Global Expansion Partner:{' '}
                    <a
                      href="https://www.growingbeyondborders.com/"
                      target="_blank"
                      rel="noopener"
                      className="font-semibold text-slate-200 hover:text-teal-400 underline decoration-slate-600 underline-offset-2 transition-colors"
                    >
                      Growing Beyond Borders – International Master Franchise Licensing
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 w-full md:w-auto md:text-right">
              <p className="text-[11px] text-slate-500">
                &copy; {new Date().getFullYear()} Franchise.sg. All rights reserved. Registered Singapore Digital Portal.
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
