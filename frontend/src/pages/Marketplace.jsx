import { useState, useEffect } from 'react'
import { getListings, postListing } from '../utils/api'
import { CATEGORIES } from '../utils/constants'

const categoryIcons = {
  equipment: '🚜',
  seeds: '🌱',
  fertilizer: '🧪',
  land: '🏞',
  labour: '👷',
  '': '🛒'
}

export default function Marketplace() {
  const [listings, setListings] = useState([])
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    title: '',
    category: 'equipment',
    price: '',
    unit: 'per day',
    description: '',
    farmer_name: '',
    location: '',
    contact: ''
  })

  const fetchListings = async (cat) => {
    setLoading(true)

    try {
      const res = await getListings(cat)
      setListings(res.data || [])
    } catch (error) {
      console.error(error)
      setListings([])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchListings(category)
  }, [category])

  const handlePost = async () => {
    if (
      !form.title ||
      !form.price ||
      !form.farmer_name ||
      !form.contact
    ) {
      return alert('Please fill all required fields')
    }

    try {
      await postListing({
        ...form,
        price: Number(form.price)
      })

      alert('✅ Listing posted successfully!')

      setShowModal(false)

      setForm({
        title: '',
        category: 'equipment',
        price: '',
        unit: 'per day',
        description: '',
        farmer_name: '',
        location: '',
        contact: ''
      })

      fetchListings(category)
    } catch (error) {
      console.error(error)
      alert('❌ Failed to post listing. Try again.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            🛒 Marketplace
          </h1>

          <p className="text-gray-500 mt-1">
            Buy, sell or rent directly from Karnataka farmers — no middlemen
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-secondary transition shadow"
        >
          + Post Listing
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition
              ${
                category === c.value
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-300 text-gray-600 hover:border-primary bg-white'
              }`}
          >
            {categoryIcons[c.value]} {c.label}
          </button>
        ))}
      </div>

      {/* Listings */}
      {loading ? (
        <div className="text-center py-16 text-gray-400 text-lg">
          Loading listings...
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🌾</div>
          <p>No listings found. Be the first to post!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((l) => (
            <div
              key={l.id || l._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">
                  {categoryIcons[l.category] || '📦'}
                </span>

                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                  {l.category}
                </span>
              </div>

              <h3 className="font-bold text-gray-800 text-lg mb-1">
                {l.title}
              </h3>

              <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                {l.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-2xl font-bold text-primary">
                    ₹{l.price}
                  </span>

                  <span className="text-gray-400 text-sm ml-1">
                    {l.unit}
                  </span>
                </div>

                <span className="text-gray-400 text-sm">
                  📍 {l.location || 'Location not specified'}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    👤 {l.farmer_name}
                  </p>
                </div>

                <a
                  href={`tel:${l.contact}`}
                  className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-secondary transition"
                >
                  📞 Call
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Post a Listing
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="space-y-3">

              {[
                {
                  key: 'title',
                  label: 'Title *',
                  placeholder: 'e.g. Mahindra Tractor'
                },
                {
                  key: 'farmer_name',
                  label: 'Your Name *',
                  placeholder: 'Farmer name'
                },
                {
                  key: 'location',
                  label: 'Location',
                  placeholder: 'District / Town'
                },
                {
                  key: 'contact',
                  label: 'Contact Number *',
                  placeholder: '9XXXXXXXXX'
                },
                {
                  key: 'price',
                  label: 'Price (₹) *',
                  placeholder: '500',
                  type: 'number'
                },
                {
                  key: 'unit',
                  label: 'Unit',
                  placeholder: 'per day / per kg / per season'
                }
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">
                    {f.label}
                  </label>

                  <input
                    type={f.type || 'text'}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [f.key]: e.target.value
                      })
                    }
                    className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              ))}

              {/* Category */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                >
                  {CATEGORIES.filter((c) => c.value).map((c) => (
                    <option
                      key={c.value}
                      value={c.value}
                    >
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">
                  Description
                </label>

                <textarea
                  placeholder="Describe your listing..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value
                    })
                  }
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-5">

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handlePost}
                className="flex-1 bg-primary text-white py-2.5 rounded-xl font-semibold hover:bg-secondary transition"
              >
                Post Listing
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}