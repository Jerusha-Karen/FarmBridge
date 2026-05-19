import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/chat', label: 'AI Assistant' },
    { to: '/schemes', label: 'Schemes' },
    { to: '/marketplace', label: 'Marketplace' },
  ]

  return (
    <nav className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          🌾 farmBridge AI
        </Link>
        <div className="flex gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition
                ${pathname === l.to
                  ? 'bg-white text-primary'
                  : 'hover:bg-secondary text-white'}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}