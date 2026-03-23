import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({
    meta: [{ title: 'About | OneSwing' }],
  }),
})

function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-os-black pb-20 pt-32">
        <div className="section-wrap">
          <span className="kicker mb-4">Our Story</span>
          <h1
            className="font-display leading-[0.92] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            ABOUT
            <br />
            <span className="text-os-green">ONESWING</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20 md:py-28">
        <div className="section-wrap-sm">
          <div className="space-y-8 text-lg leading-relaxed text-os-slate">
            <p>
              OneSwing was born from a simple observation: most golfers struggle
              with consistency because they don't have an effective way to
              practice their swing path at home.
            </p>
            <p>
              Working with professional golfer and instructor Gipper Finau, we
              developed a patented wall-mounted training device that guides your
              club through the correct swing path &mdash; building the muscle
              memory you need to perform on the course.
            </p>
            <p>
              Our mission is to make quality golf training accessible to
              everyone. Whether you're a beginner picking up a club for the first
              time or an experienced player looking to sharpen your game, the
              OneSwing Trainer gives you the tools to improve with just 5 minutes
              of daily practice.
            </p>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-os-green py-16 text-center">
        <div className="section-wrap">
          <h2
            className="mb-6 font-display text-os-black"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            BUILDING MUSCLE MEMORY IS THE FUTURE OF YOUR GAME
          </h2>
          <p className="mb-8 text-os-black/60">It's as simple as that.</p>
          <a href="/shop" className="btn-dark">
            Shop Now
          </a>
        </div>
      </section>
    </>
  )
}
