import { useState } from 'react'
import { FaGraduationCap, FaCode, FaHeart } from 'react-icons/fa'
import './About.css'
import imageMain from '../assets/dkr.png'

// ====== À PERSONNALISER ======
// L'image est dans le dossier src/assets/ (voir l'import en haut)
const IMAGE = imageMain

// Remplace ces textes par les tiens
const PARAGRAPHS = [
  "Développeur web et mobile passionné, je conçois des applications modernes avec React, PHP, Laravel, MySQL et Kotlin. J'aime écrire un code propre et construire des interfaces claires et agréables à utiliser.",
  "Au fil de ma formation et de mes projets personnels, je transforme des besoins concrets en applications web et mobiles fiables. Découvre dans ce portfolio mes réalisations et mon savoir-faire.",
]

const FEATURES = [
  {
    id: 1,
    Icon: FaGraduationCap,
    title: 'Curieux',
    text: "J'apprends vite, en continu, et j'aime relever de nouveaux défis techniques.",
  },
  {
    id: 2,
    Icon: FaCode,
    title: 'Rigoureux',
    text: 'Un code lisible, maintenable et pensé pour les utilisateurs.',
  },
  {
    id: 3,
    Icon: FaHeart,
    title: 'Motivé',
    text: "Le développement est à la fois mon métier d'avenir et ma passion.",
  },
]
// ==============================

export default function About() {
  // Si l'image est introuvable, un bloc coloré s'affiche à la place
  const [imageOk, setImageOk] = useState(true)

  return (
    <section id="about" className="about">
      <div className="container">
        {/* Titre centré */}
        <h2 className="section-title">À propos</h2>

        <div className="about-grid">
          {/* Texte à gauche */}
          <div className="about-content">
            {PARAGRAPHS.map((text) => (
              <p key={text} className="about-paragraph">
                {text}
              </p>
            ))}

            <ul className="about-features">
              {FEATURES.map(({ id, Icon, title, text }) => (
                <li key={id} className="about-feature">
                  <span className="about-feature-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h3 className="about-feature-title">{title}</h3>
                    <p className="about-feature-text">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Image à droite */}
          <div className="about-images">
            {imageOk ? (
              <img
                src={IMAGE}
                alt="Illustration de mon travail"
                className="about-image"
                loading="lazy"
                onError={() => setImageOk(false)}
              />
            ) : (
              <div className="about-image about-image-fallback" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}