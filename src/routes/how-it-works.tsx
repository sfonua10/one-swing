import { createFileRoute } from '@tanstack/react-router'
import YouTubeEmbed from '#/components/YouTubeEmbed'

export const Route = createFileRoute('/how-it-works')({
  component: HowItWorks,
  head: () => ({
    meta: [{ title: 'How It Works | OneSwing' }],
  }),
})

function HowItWorks() {
  return (
    <>
      {/* Hero */}
      <section className="bg-os-black pb-20 pt-32">
        <div className="section-wrap">
          <span className="kicker mb-4">How It Works</span>
          <h1
            className="font-display leading-[0.92] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            FIX YOUR GOLF GAME
            <br />
            WITH JUST <span className="text-os-green">5 MINUTES</span> A DAY
          </h1>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white py-20 md:py-28">
        <div className="section-wrap">
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'MOUNT IT',
                desc: 'Attach the OneSwing Trainer to any wall — your home, office, or garage. Installation takes minutes.',
              },
              {
                step: '02',
                title: 'GRAB YOUR IRON',
                desc: 'Take your 7-iron and position yourself naturally. The OneSwing works with the natural slot of your swing.',
              },
              {
                step: '03',
                title: 'BUILD MEMORY',
                desc: 'Practice for just 5 minutes daily. The device guides your club path, building consistent muscle memory over time.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center md:text-left">
                <span className="font-display text-6xl text-os-green/20 md:text-7xl">
                  {step}
                </span>
                <h3 className="mb-4 mt-2 font-display text-2xl text-os-black md:text-3xl">
                  {title}
                </h3>
                <p className="leading-relaxed text-os-slate">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video explainer */}
      <section className="bg-os-black py-16 md:py-20">
        <div className="section-wrap-sm">
          <div className="mb-8 text-center">
            <span className="kicker">See It In Action</span>
          </div>
          <YouTubeEmbed videoId="GABcGsiFeYc" title="How OneSwing Works" />
        </div>
      </section>

      {/* Quote */}
      <section className="bg-os-green py-12 md:py-16">
        <div className="section-wrap text-center">
          <blockquote
            className="font-display leading-[0.95] text-os-black"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
          >
            "I'LL HAVE YOU GOLFING IN A WEEK."
          </blockquote>
          <cite className="mt-3 block text-sm font-heading uppercase tracking-[0.2em] text-os-black/60 not-italic">
            Gipper Finau
          </cite>
        </div>
      </section>

      {/* Features */}
      <section className="bg-os-gray-50 py-20 md:py-28">
        <div className="section-wrap-sm">
          <h2
            className="mb-14 text-center font-display text-os-black"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            WHY ONESWING?
          </h2>
          <div className="space-y-8">
            {[
              {
                title: 'No Straps or Contraptions',
                desc: "Unlike other training aids, the OneSwing doesn't strap to your head, body, or club. It's a clean, simple wall-mounted device.",
              },
              {
                title: 'Works With Your Natural Swing',
                desc: 'Designed to work with the natural slot of your golf swing, reinforcing correct mechanics without forcing artificial movements.',
              },
              {
                title: 'Builds Real Muscle Memory',
                desc: 'Consistent repetition in the correct swing path creates lasting muscle memory that transfers directly to the course.',
              },
              {
                title: 'Practice Anywhere',
                desc: 'Mount it at home, in the office, or in the garage. No need to drive to the range or lose balls on the course.',
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="border-l-4 border-os-green bg-white p-8"
              >
                <h3 className="mb-2 font-heading text-lg uppercase tracking-wider text-os-black">
                  {title}
                </h3>
                <p className="leading-relaxed text-os-slate">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-os-black py-20 text-center">
        <div className="section-wrap">
          <h2
            className="mb-8 font-display text-white"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
          >
            START IMPROVING TODAY
          </h2>
          <a href="/shop" className="btn-primary">
            Shop Now
          </a>
        </div>
      </section>
    </>
  )
}
