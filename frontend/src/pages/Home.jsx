import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🤖',
    title: 'AI Farming Assistant',
    desc: 'Ask any farming question in Kannada, Hindi or English. Get expert answers instantly.',
    link: '/chat',
    cta: 'Ask Now'
  },
  {
    icon: '🏛',
    title: 'Scheme Finder',
    desc: 'Discover government schemes you qualify for. Get eligibility explained in simple language.',
    link: '/schemes',
    cta: 'Find Schemes'
  },
  {
    icon: '🛒',
    title: 'Marketplace',
    desc: 'Buy, sell or rent farm equipment, seeds, land and labour — directly from nearby farmers.',
    link: '/marketplace',
    cta: 'Browse Listings'
  },
]

const stats = [
  { value: '20+', label: 'Govt Schemes Covered' },
  { value: '3', label: 'Languages Supported' },
  { value: '100%', label: 'Free to Use' },
  { value: '24/7', label: 'AI Available' },
]

const sdgs = [
  { num: 'SDG 1', label: 'No Poverty', color: 'bg-red-500' },
  { num: 'SDG 2', label: 'Zero Hunger', color: 'bg-yellow-500' },
  { num: 'SDG 9', label: 'Innovation', color: 'bg-orange-500' },
]

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-green-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">🌾</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            FarmBridge AI
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-green-100">
            ರೈತರ ಸ್ನೇಹಿತ — Farmer's Intelligent Assistant
          </p>
          <p className="text-lg mb-8 text-green-200 max-w-2xl mx-auto">
            Voice-first AI platform for Karnataka farmers. Ask in Kannada, get expert
            farming advice, discover government schemes, and connect with nearby farmers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/chat"
              className="bg-white text-green-700 font-bold px-8 py-3 rounded-full
                hover:bg-green-50 transition text-lg shadow-lg"
            >
              🎤 Start Talking
            </Link>
            <Link
              to="/schemes"
              className="border-2 border-white text-white font-bold px-8 py-3
                rounded-full hover:bg-white hover:text-green-700 transition text-lg"
            >
              🏛 Find Schemes
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-accent">{s.value}</div>
              <div className="text-green-200 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Everything a Farmer Needs
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Built for rural Karnataka — works in your language, on your phone
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title}
                className="bg-white rounded-2xl shadow-sm border border-gray-100
                  p-6 hover:shadow-md transition">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 mb-4 text-sm leading-relaxed">{f.desc}</p>
                <Link
                  to={f.link}
                  className="inline-block bg-primary text-white px-5 py-2
                    rounded-full text-sm font-semibold hover:bg-secondary transition"
                >
                  {f.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { step: '1', icon: '🎤', text: 'Speak in Kannada, Hindi or English' },
              { step: '2', icon: '🧠', text: 'AI searches real agricultural knowledge' },
              { step: '3', icon: '📋', text: 'Get expert advice in your language' },
              { step: '4', icon: '🌱', text: 'Apply advice and grow better crops' },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full
                  flex items-center justify-center font-bold text-lg mb-3">
                  {s.step}
                </div>
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="text-gray-600 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features highlight */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Unique AI Features
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Not just another chatbot — built specifically for Indian farmers
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '🎤',
                title: 'Vernacular Voice-First',
                desc: 'Speak in Kannada and get answers in Kannada. No reading or typing required. Designed for semi-literate users.'
              },
              {
                icon: '🔍',
                title: 'RAG over Real Agri Data',
                desc: 'Answers grounded in Karnataka crop calendars, local pest cycles, and ICAR guidelines — not generic AI responses.'
              },
              {
                icon: '🏛',
                title: 'Scheme Eligibility AI',
                desc: 'Tell us 4 things about your farm. We tell you exactly which schemes you qualify for and why.'
              },
              {
                icon: '🔇',
                title: 'Zero-Literacy UI',
                desc: 'Voice in, voice out. Big icons, minimal text, large buttons. Works on basic Android phones with 2G.'
              },
            ].map(f => (
              <div key={f.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-green-100
                  flex gap-4 items-start">
                <div className="text-3xl">{f.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Section */}
      <section className="py-12 px-4 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">UN Sustainable Development Goals</h2>
          <p className="text-gray-400 mb-8">FarmBridge AI directly contributes to</p>
          <div className="flex flex-wrap justify-center gap-4">
            {sdgs.map(s => (
              <div key={s.num}
                className={`${s.color} rounded-xl px-6 py-4 text-center min-w-32`}>
                <div className="font-bold text-lg">{s.num}</div>
                <div className="text-sm opacity-90">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 px-4 text-center text-sm">
        <p>🌾 FarmBridge AI — Built for India's 140 million farming families</p>
        <p className="mt-1">Powered by Gemini AI · RAG · Voice Recognition</p>
      </footer>

    </div>
  )
}