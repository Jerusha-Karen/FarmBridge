import { useState } from 'react'
import { getSchemes } from '../utils/api'
import { CROPS, INCOME_RANGES, CATEGORIES_SOCIAL } from '../utils/constants'

export default function Schemes() {
  const [form, setForm] = useState({
    crop: 'Rice', land_size: '', annual_income: 100000,
    category: 'General', state: 'Karnataka'
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.land_size) return alert('Please enter your land size')
    setLoading(true)
    setResult(null)
    try {
      const res = await getSchemes({ ...form, land_size: parseFloat(form.land_size) })
      setResult(res.data.recommendations)
    } catch {
      setResult('⚠️ Could not fetch schemes. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🏛 Scheme Finder</h1>
        <p className="text-gray-500 mt-2">
          Answer 4 questions — we'll tell you exactly which government schemes you qualify for
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🌾 Main Crop
            </label>
            <select
              value={form.crop}
              onChange={e => setForm({ ...form, crop: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5
                text-sm focus:outline-none focus:border-primary"
            >
              {CROPS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              📐 Land Size (acres)
            </label>
            <input
              type="number"
              placeholder="e.g. 2.5"
              value={form.land_size}
              onChange={e => setForm({ ...form, land_size: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5
                text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              💰 Annual Income
            </label>
            <select
              value={form.annual_income}
              onChange={e => setForm({ ...form, annual_income: parseInt(e.target.value) })}
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5
                text-sm focus:outline-none focus:border-primary"
            >
              {INCOME_RANGES.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              👤 Social Category
            </label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5
                text-sm focus:outline-none focus:border-primary"
            >
              {CATEGORIES_SOCIAL.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-bold
            text-lg hover:bg-secondary transition disabled:opacity-50"
        >
          {loading ? '🔍 Finding schemes...' : '🔍 Find My Schemes'}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            ✅ Schemes You Qualify For
          </h2>
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed
            whitespace-pre-wrap text-sm">
            {result}
          </div>
        </div>
      )}
    </div>
  )
}