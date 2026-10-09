import { useState } from 'react'
import './Hero.css'

// ====== À PERSONNALISER ======
const NAME = 'Karamoko DOUMBIA'
const ROLE = 'Développeur Web'
const DESCRIPTION =
  "Développeur web passionné, je conçois des sites et des applications modernes, rapides et faciles à utiliser. Du design à l'intégration, je transforme les idées en produits concrets."

// Nom EXACT de ta photo, placée dans le dossier public (avec le / devant)
const PHOTO = '/ma-photo.png'

// Nom EXACT de ton CV, placé dans le dossier public
const CV = '/CV DOUMBIA KARAMOKO.pdf'
// ==============================

export default function Hero() {
  // Si la photo est introuvable, on affiche les initiales à la place
  const [photoOk, setPhotoOk] = useState(true)

  return (
    <section id="hero" className="hero">
      {/* Décorations */}
      <div className="hero-circle" aria-hidden="true" />
      <div className="hero-dots" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-content">
          <p className="hero-hello">Bonjour, je suis</p>
          <h1 className="hero-name">{NAME}</h1>
          <p className="hero-role">{ROLE}</p>
          <span className="hero-line" aria-hidden="true" />
          <p className="hero-description">{DESCRIPTION}</p>

          <div className="hero-buttons">
            <a href="#projects" className="hero-btn hero-btn-light">
              Voir mes projets
            </a>
            <a href={CV} download className="hero-btn hero-btn-outline">
              Télécharger mon CV
            </a>
          </div>
        </div>

        <div className="hero-photo-wrapper">
          {photoOk ? (
            <img
              src={PHOTO}
              alt={`Portrait de ${NAME}`}
              className="hero-photo"
              onError={() => setPhotoOk(false)}
            />
          ) : (
            <div className="hero-photo hero-photo-fallback" aria-hidden="true">
              KD
            </div>
          )}
        </div>
      </div>

      {/* Vague en bas */}
      <svg
        className="hero-wave"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,85 C360,25 1080,25 1440,75 L1440,120 L0,120 Z"
          fill="var(--color-bg)"
        />
      </svg>
    </section>
  )
}