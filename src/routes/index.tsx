import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import YouTubeEmbed from '#/components/YouTubeEmbed'

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      {
        title: '#1 Golf Swing Training Aid | OneSwing',
      },
      {
        name: 'description',
        content:
          'Improve your golf game with just 5 minutes a day. The most affordable at-home swing trainer in the world.',
      },
    ],
  }),
})

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.unobserve(el)
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, visible }
}

/* ── Product gallery images ── */
const GALLERY_IMAGES = [1, 2, 3, 77, 78, 80, 85, 89, 93, 95, 96, 97].map(
  (n) =>
    `https://one-swing.com/wp-content/uploads/2023/12/KOLF-ProductShoot-${n}-768x768.jpg`,
)

function Home() {
  return (
    <>
      <HeroSection />
      <QuoteBanner />
      <ProductFeature />
      <ProblemSolution />
      <Testimonials />
      <Gallery />
      <FinalCTA />
    </>
  )
}

/* ══════════════════════════════════════════
   HERO
   ══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-os-black">
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_40%,rgba(141,198,63,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_20%,rgba(0,104,56,0.06),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Swing arc motif */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <path
          d="M100 700 Q400 50 700 700"
          stroke="#8DC63F"
          strokeWidth="2"
          strokeDasharray="600"
          style={{ animation: 'draw-arc 2.5s ease-out forwards' }}
        />
      </svg>

      {/* Content */}
      <div className="section-wrap relative z-10 pb-20 pt-32">
        <div className="max-w-4xl">
          <p
            className="kicker mb-6 opacity-0"
            style={{
              animation:
                'fade-up 800ms 200ms cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          >
            #1 Golf Swing Training Aid
          </p>

          <h1
            className="mb-8 font-display leading-[0.92] tracking-tight text-white opacity-0"
            style={{
              fontSize: 'clamp(3.2rem, 8vw, 7.5rem)',
              animation:
                'fade-up 900ms 400ms cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          >
            IMPROVE YOUR
            <br />
            GOLF GAME WITH
            <br />
            JUST <span className="text-os-green">5 MINUTES</span>
            <br />A DAY
          </h1>

          <p
            className="mb-10 max-w-xl text-lg text-white/45 opacity-0 md:text-xl"
            style={{
              animation:
                'fade-up 800ms 600ms cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          >
            The most affordable at-home swing trainer in the world. Build muscle
            memory. Lower your scores. Enjoy the game.
          </p>

          <div
            className="flex flex-wrap gap-4 opacity-0"
            style={{
              animation:
                'fade-up 800ms 800ms cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          >
            <a href="/shop" className="btn-primary">
              Shop Now
            </a>
            <a href="/how-it-works" className="btn-outline-light">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-os-black to-transparent" />
    </section>
  )
}

/* ══════════════════════════════════════════
   QUOTE BANNER
   ══════════════════════════════════════════ */
function QuoteBanner() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`bg-os-green py-12 transition-all duration-700 md:py-16 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="section-wrap text-center">
        <blockquote
          className="font-display leading-[0.95] tracking-tight text-os-black"
          style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4rem)' }}
        >
          "I'LL HAVE YOU GOLFING IN A WEEK."
        </blockquote>
        <cite className="mt-4 block text-sm font-heading uppercase tracking-[0.2em] text-os-black/60 not-italic md:text-base">
          Gipper Finau &mdash; Professional Golfer, Golf Instructor
        </cite>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   PRODUCT FEATURE
   ══════════════════════════════════════════ */
function ProductFeature() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-white py-20 md:py-28"
    >
      <div
        className={`section-wrap grid items-center gap-12 transition-all duration-1000 md:grid-cols-2 md:gap-20 ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Image */}
        <div className="group relative">
          <div className="absolute -inset-4 -rotate-2 bg-os-green/10 transition-transform duration-500 group-hover:rotate-0" />
          <img
            src="https://one-swing.com/wp-content/uploads/2023/12/KOLF-ProductShoot-1-768x768.jpg"
            alt="OneSwing Trainer mounted on wall"
            className="relative aspect-square w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Copy */}
        <div>
          <span className="kicker mb-3">The OneSwing Trainer</span>
          <h2
            className="mb-6 mt-2 font-display leading-[0.95] tracking-tight text-os-black"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 4.2rem)' }}
          >
            THE BEST GOLF SWING
            <br />
            TRAINER ON THE MARKET
          </h2>
          <p className="mb-8 text-base leading-relaxed text-os-slate md:text-lg">
            The OneSwing Trainer attaches to any wall &mdash; home, office, or
            garage. Grab your 7-iron and start building the muscle memory that
            translates directly to the course. No straps. No contraptions. Just
            results.
          </p>

          <div className="mb-10 flex items-center gap-6">
            <img
              src="https://one-swing.com/wp-content/uploads/2023/12/PATENETE-150x150.png"
              alt="Patented Technology"
              className="h-16 w-16 object-contain"
              loading="lazy"
            />
            <img
              src="https://one-swing.com/wp-content/uploads/2023/12/turfs-best-3-150x150.png"
              alt="Turf's Best"
              className="h-16 w-16 object-contain"
              loading="lazy"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="/shop" className="btn-primary">
              Buy Now
            </a>
            <a href="/how-it-works" className="btn-dark">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   PROBLEM / SOLUTION
   ══════════════════════════════════════════ */
function ProblemSolution() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-os-gray-50 py-20 md:py-28"
    >
      <div className="section-wrap">
        <div
          className={`grid gap-6 transition-all duration-1000 md:grid-cols-2 md:gap-8 ${
            visible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Problem */}
          <div className="border-l-4 border-red-500/80 bg-white p-8 md:p-12">
            <h3 className="mb-4 font-display text-3xl tracking-tight text-os-black md:text-4xl">
              THE PROBLEM
            </h3>
            <p className="leading-relaxed text-os-slate">
              An inconsistent swing path leads to slice, hook, and duff shots
              &mdash; leading to undesirable scores and a less enjoyable game.
            </p>
            <p className="mt-4 leading-relaxed text-os-slate">
              Inconsistent shots happen with an inconsistent swing path. Bad
              scores and a less enjoyable game are the result.
            </p>
          </div>

          {/* Solution */}
          <div className="border-l-4 border-os-green bg-white p-8 md:p-12">
            <h3 className="mb-4 font-display text-3xl tracking-tight text-os-black md:text-4xl">
              THE SOLUTION
            </h3>
            <p className="leading-relaxed text-os-slate">
              <strong className="text-os-black">FINALLY</strong> &mdash; a
              device that keeps your swing path consistent. Having a consistent
              swing path is necessary for golfers to gain accuracy, distance, and
              control over the ball.
            </p>
            <p className="mt-4 leading-relaxed text-os-slate">
              The OneSwing is the first golf swing aid that builds muscle memory
              without frustrating sessions at the range, lost balls on the
              course, and weird contraptions strapped all over your body.
            </p>
          </div>
        </div>

        <div
          className={`mt-12 text-center transition-all delay-200 duration-700 ${
            visible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <a href="/shop" className="btn-primary">
            Buy Now &mdash; $299.99
          </a>
          <p className="mt-3 text-sm text-os-slate">
            <span className="text-os-gray-300 line-through">$499.99</span>
            <span className="ml-2 font-semibold text-os-green">Save $200</span>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   TESTIMONIALS
   ══════════════════════════════════════════ */
function Testimonials() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="overflow-hidden bg-os-black py-20 md:py-28"
    >
      <div
        className={`section-wrap transition-all duration-1000 ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="mb-16 text-center">
          <blockquote
            className="font-display leading-[0.95] tracking-tight text-white/90"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
          >
            "I WAS IN DISBELIEF"
          </blockquote>
          <cite className="mt-3 block text-sm font-heading uppercase tracking-[0.2em] text-white/40 not-italic">
            Aaron Fonua
          </cite>
        </div>

        <span className="kicker mb-10 block text-center">Testimonials</span>

        <div className="grid gap-6 md:grid-cols-3">
          {['kuGbIpb7Vns', 'uetFCSyXOrI', 'qOnQUpoxxQ0'].map((id) => (
            <YouTubeEmbed
              key={id}
              videoId={id}
              title="OneSwing Testimonial"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   GALLERY
   ══════════════════════════════════════════ */
function Gallery() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-white py-20 md:py-28"
    >
      <div className="section-wrap">
        <div
          className={`mb-14 text-center transition-all duration-700 ${
            visible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          <span className="kicker mb-3">Product Gallery</span>
          <h2
            className="mt-2 font-display leading-[0.95] tracking-tight text-os-black"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            THE ONESWING
          </h2>
        </div>

        <div
          className={`grid grid-cols-2 gap-3 transition-all delay-100 duration-1000 md:grid-cols-3 md:gap-4 lg:grid-cols-4 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {GALLERY_IMAGES.map((src, i) => (
            <div key={i} className="gallery-item aspect-square bg-os-gray-100">
              <img
                src={src}
                alt={`OneSwing Trainer product photo ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════
   FINAL CTA
   ══════════════════════════════════════════ */
function FinalCTA() {
  const { ref, visible } = useReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden bg-os-green py-20 md:py-28"
    >
      {/* Diagonal accent pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-1/4 -top-1/2 h-[200%] w-[150%] bg-[repeating-linear-gradient(45deg,transparent,transparent_60px,rgba(0,0,0,0.05)_60px,rgba(0,0,0,0.05)_61px)]" />
      </div>

      <div
        className={`section-wrap relative z-10 text-center transition-all duration-700 ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`}
      >
        <h2
          className="mb-6 font-display leading-[0.95] tracking-tight text-os-black"
          style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
        >
          READY TO TRANSFORM
          <br />
          YOUR GAME?
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-lg text-os-black/60">
          Join thousands of golfers who have improved their swing with the
          OneSwing Trainer.
        </p>
        <a href="/shop" className="btn-dark">
          Shop Now
        </a>
      </div>
    </section>
  )
}
