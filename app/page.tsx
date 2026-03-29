import Navbar from "@/components/web/Navbar"
import { redirect } from "next/navigation"
import GetStarted from "@/components/web/GetStarted"
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-['Geist',sans-serif]">

      <Navbar />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 pt-28 pb-20 text-center">
        <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-medium px-3 py-1 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
          Get all our links sorted
        </div>
        <div className="flex flex-col justify-around items-center">
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight leading-tight text-white">
            One link.
          </h1>
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight leading-tight text-blue-600">
            All for you
          </h1>
        </div>
        <p className="text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed">
          Drop all your social links — we hand you one clean URL. Share it anywhere, update it anytime.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <GetStarted/>
          <button className="w-full sm:w-auto border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-sm font-medium px-6 py-3 rounded-lg">
            See an example →
          </button>
        </div>

        {/* Mock URL bar */}
        <div className="mt-14 max-w-sm mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-white/30 text-sm font-mono">lynk.to/</span>
            <span className="text-white/80 text-sm font-mono">yourname</span>
            <div className="ml-auto">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Social icons row */}
      <section className="border-y border-white/5 py-6">
        <div className="max-w-3xl mx-auto px-8 flex items-center justify-center flex-wrap gap-8 opacity-30">
          {['Twitter', 'Instagram', 'LinkedIn', 'GitHub', 'YouTube', 'TikTok', 'Twitch', 'Dribbble'].map(name => (
            <span key={name} className="text-xs font-medium tracking-widest uppercase text-white/60">{name}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white mb-3">Everything you need</h2>
          <p className="text-white/40 text-sm">Simple tools. Powerful profile.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2l2.4 4.8 5.3.8-3.85 3.75.91 5.3L10 14.25 5.2 16.63l.91-5.3L2.26 7.58l5.3-.78L10 2z" stroke="#3b82f6" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              ),
              title: 'Instant setup',
              desc: 'Add your links and go live in under a minute. No configuration, no friction.',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="#3b82f6" strokeWidth="1.4" />
                  <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="#3b82f6" strokeWidth="1.4" />
                  <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="#3b82f6" strokeWidth="1.4" />
                  <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="#3b82f6" strokeWidth="1.4" />
                </svg>
              ),
              title: 'All platforms',
              desc: 'Twitter, Instagram, LinkedIn, GitHub, TikTok and 30+ more platforms supported.',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 10a4 4 0 108 0 4 4 0 00-8 0z" stroke="#3b82f6" strokeWidth="1.4" />
                  <path d="M2 10h2M16 10h2M10 2v2M10 16v2" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              ),
              title: 'Clean profile page',
              desc: 'Your visitors see a beautiful, fast-loading page — no ads, no clutter.',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13 7l-6 6M7 7l6 6" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round" />
                  <rect x="2" y="2" width="16" height="16" rx="4" stroke="#3b82f6" strokeWidth="1.4" />
                </svg>
              ),
              title: 'Custom username',
              desc: 'Claim your handle. lynk.to/yourname — short, memorable, and yours.',
            },
          ].map((f, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/8 rounded-xl p-6 hover:border-blue-500/30 hover:bg-blue-500/5">
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>



      {/* CTA */}
      <section className="border-t border-white/5 py-24 text-center">
        <div className="max-w-xl mx-auto px-8">
          <h2 className="text-4xl font-semibold tracking-tight text-white mb-4">Your links, unified.</h2>
          <p className="text-white/40 mb-8 text-sm leading-relaxed">
            Join thousands of creators, developers, and professionals who share smarter with Lynk.
          </p>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 5h8M5 1l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm text-white/40">Lynk</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/25">
            <a href="#" className="hover:text-white/60">Privacy</a>
            <a href="#" className="hover:text-white/60">Terms</a>
            <a href="#" className="hover:text-white/60">Contact</a>
            <span>© 2026 Lynk</span>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage