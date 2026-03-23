import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useStore } from '@tanstack/react-store'
import { ShoppingBag } from 'lucide-react'
import { cartStore, toggleCart, getCartItemCount } from '#/lib/cart-store'

const NAV_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Shop', href: '/shop' },
  { label: 'Academy', href: '/academy' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { items } = useStore(cartStore, (s) => s)
  const itemCount = getCartItemCount(items)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-os-black/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-wrap flex items-center justify-between py-5">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="https://one-swing.com/wp-content/uploads/2023/12/oslogo-tb-300x129.png"
            alt="OneSwing"
            className="h-10 w-auto brightness-0 invert"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}

          {/* Cart icon */}
          <button
            onClick={() => toggleCart()}
            className="relative p-2 text-white/65 transition-colors hover:text-white"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-os-green text-[10px] font-bold text-os-black">
                {itemCount}
              </span>
            )}
          </button>

          <a href="/shop" className="btn-primary !px-7 !py-3 text-sm">
            Buy Now
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => toggleCart()}
            className="relative p-2 text-white/65 transition-colors hover:text-white"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-os-green text-[10px] font-bold text-os-black">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-white"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-os-black/98 px-6 py-6 backdrop-blur-lg md:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="block py-3 font-heading text-lg uppercase tracking-wider text-white/80 transition-colors hover:text-os-green"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="/shop"
            className="btn-primary mt-4 block text-center"
            onClick={() => setMenuOpen(false)}
          >
            Buy Now
          </a>
        </div>
      )}
    </header>
  )
}
