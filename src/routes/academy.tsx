import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { placeAcademyOrder } from '#/lib/server/checkout'

export const Route = createFileRoute('/academy')({
  component: Academy,
  head: () => ({
    meta: [{ title: 'Academy | OneSwing' }],
  }),
})

const SIZES = ['Youth S', 'Youth M', 'Youth L', 'S', 'M', 'L', 'XL', '2XL']

function Academy() {
  const [signupTier, setSignupTier] = useState<
    'standard' | 'hs-college' | null
  >(null)

  return (
    <>
      {/* Hero */}
      <section className="bg-os-black pb-20 pt-32">
        <div className="section-wrap">
          <span className="kicker mb-4">Training Programs</span>
          <h1
            className="font-display leading-[0.92] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            ONE SWING
            <br />
            <span className="text-os-green">ACADEMY</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/50">
            Professional golf instruction with Gipper Finau, cutting-edge 3D
            swing analysis, and everything you need to transform your game.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-white py-20 md:py-28">
        <div className="section-wrap">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Standard */}
            <div className="border border-os-gray-200 p-8 md:p-10">
              <span className="kicker">Standard</span>
              <h2 className="mb-2 mt-2 font-display text-3xl text-os-black md:text-4xl">
                ONE SWING ACADEMY
              </h2>
              <p className="mb-6 font-heading text-2xl text-os-green">
                $599.00
              </p>
              <ul className="mb-8 space-y-3 text-os-slate">
                {[
                  'Professional instruction with Gipper Finau ($1,800 value)',
                  'OneSwing Trainer device ($299 value)',
                  'Pre and post 3D swing analysis with Gears technology',
                  'Two practices weekly at Fairway 54',
                  'End-of-league competition',
                  'Branded merchandise (shirt and hoodie)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 text-os-green">
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSignupTier('standard')}
                className="btn-primary w-full text-center"
              >
                Sign Up
              </button>
            </div>

            {/* HS/College */}
            <div className="relative border-2 border-os-green p-8 md:p-10">
              <span className="absolute -top-3 left-6 bg-os-green px-4 py-1 font-heading text-xs font-semibold uppercase tracking-wider text-os-black">
                Advanced
              </span>
              <span className="kicker">High School / College</span>
              <h2 className="mb-2 mt-2 font-display text-3xl text-os-black md:text-4xl">
                HS/COLLEGE ACADEMY
              </h2>
              <p className="mb-6 font-heading text-2xl text-os-green">
                $799.00
              </p>
              <ul className="mb-8 space-y-3 text-os-slate">
                {[
                  'Everything in the Standard Academy',
                  'Advanced swing mechanics training',
                  'Competition preparation',
                  'College recruitment guidance',
                  'Extended practice sessions',
                  'Video analysis library access',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0 text-os-green">
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSignupTier('hs-college')}
                className="btn-primary w-full text-center"
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="mt-16 bg-os-gray-50 p-8 text-center">
            <p className="mb-2 font-heading text-sm uppercase tracking-[0.15em] text-os-slate">
              Location
            </p>
            <p className="font-medium text-os-black">
              452 W Center St Suite 106, Pleasant Grove, UT 84062
            </p>
          </div>
        </div>
      </section>

      {/* Signup modal */}
      {signupTier && (
        <SignupModal
          tier={signupTier}
          onClose={() => setSignupTier(null)}
        />
      )}
    </>
  )
}

function SignupModal({
  tier,
  onClose,
}: {
  tier: 'standard' | 'hs-college'
  onClose: () => void
}) {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    studentName: '',
    email: '',
    phone: '',
    shirtSize: 'M',
    hoodieSize: 'M',
  })

  const price = tier === 'standard' ? '$599.00' : '$799.00'
  const label =
    tier === 'standard' ? 'One Swing Academy' : 'HS/College Academy'

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.studentName.trim() || !form.email.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const result = await placeAcademyOrder({
        data: {
          tier,
          studentName: form.studentName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          shirtSize: form.shirtSize,
          hoodieSize: form.hoodieSize,
        },
      })
      navigate({ to: '/order/success', search: { id: result.orderId } })
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg bg-white p-8 shadow-2xl md:p-10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="kicker">{label}</span>
              <p className="mt-1 font-heading text-xl text-os-black">
                {price}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-os-slate transition-colors hover:text-os-black"
              aria-label="Close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-os-slate">
                Student Name *
              </label>
              <input
                type="text"
                value={form.studentName}
                onChange={(e) => update('studentName', e.target.value)}
                required
                className="w-full border border-os-gray-200 px-4 py-3 text-os-black outline-none focus:border-os-green"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-os-slate">
                Email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                required
                className="w-full border border-os-gray-200 px-4 py-3 text-os-black outline-none focus:border-os-green"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-os-slate">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="w-full border border-os-gray-200 px-4 py-3 text-os-black outline-none focus:border-os-green"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-os-slate">
                  Shirt Size *
                </label>
                <select
                  value={form.shirtSize}
                  onChange={(e) => update('shirtSize', e.target.value)}
                  className="w-full border border-os-gray-200 bg-white px-4 py-3 text-os-black outline-none focus:border-os-green"
                >
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-os-slate">
                  Hoodie Size *
                </label>
                <select
                  value={form.hoodieSize}
                  onChange={(e) => update('hoodieSize', e.target.value)}
                  className="w-full border border-os-gray-200 bg-white px-4 py-3 text-os-black outline-none focus:border-os-green"
                >
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary mt-4 w-full text-center disabled:opacity-50"
            >
              {submitting ? 'Processing...' : `Enroll — ${price}`}
            </button>

            <p className="text-center text-xs text-os-slate">
              Payment processing will be available soon. Enrollments are
              currently recorded for confirmation.
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
