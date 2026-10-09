import { useEffect, useState } from 'react'
import './Navbar.css'

const links = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  // Lien actif : suit la section visible à l'écran
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    links.forEach((link) => {
      const section = document.getElementById(link.href.slice(1))
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Remplace par ton nom ou ton logo */}
        <a href="#hero" className="navbar-logo">
          Karamoko Dev
        </a>

        <nav aria-label="Navigation principale">
          <ul className="navbar-links">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar-link ${
                    active === link.href.slice(1) ? 'active' : ''
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}