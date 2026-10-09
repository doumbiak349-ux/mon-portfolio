import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import './Parcours.css'

// ====== À PERSONNALISER ======
// Un bloc par étape de ton parcours (le plus récent en premier).
// period : la période | title : l'intitulé | description : le détail affiché au clic
const PARCOURS = [
  {
    id: 1,
    period: '2026-2027',
    title:
      "Licence 3 professionnelle en Réseaux Génie Logiciel à Pigier Côte d'Ivoire, Abidjan (en cours)",
    description:
      'Approfondissement en réseau et en développement web et mobile.',
  },
  {
    id: 2,
    period: '2022-2023',
    title:
      "Brevet de Technicien Supérieur (BTS) Informatique Développeur d'Application (IDA) à Pigier Côte d'Ivoire, Abidjan",
    description:
      "J'ai effectué un stage de validation à l'ANAC pour obtenir mon diplôme.",
  },
  {
    id: 3,
    period: '2022-2023',
    title:
      "Licence 2 professionnelle en Réseaux Génie Logiciel à Pigier Côte d'Ivoire, Abidjan",
    description:
      'Apprentissage des bases HTML, CSS et création de mes premiers sites.',
  },
  {
    id: 4,
    period: '2021-2022',
    title:
      "Licence 1 professionnelle en Réseaux Génie Logiciel à Pigier Côte d'Ivoire, Abidjan",
    description:
      "Début de mon parcours universitaire et découverte de l'informatique : j'ai appris les bases en programmation.",
  },
  {
    id: 5,
    period: 'Baccalauréat',
    title: 'Baccalauréat série D au Lycée Moderne de Songon, Songon',
    description: "Baccalauréat série D obtenu au Lycée Moderne de Songon.",
  },
]
// ==============================

export default function Parcours() {
  // Une seule étape ouverte à la fois (null = toutes fermées)
  const [openId, setOpenId] = useState(PARCOURS[0].id)

  return (
    <section id="parcours" className="parcours">
      <div className="container">
        <h2 className="section-title">Mon Parcours</h2>

        <ol className="parcours-list">
          {PARCOURS.map((item) => {
            const isOpen = openId === item.id

            return (
              <li key={item.id} className={`parcours-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="parcours-header"
                  aria-expanded={isOpen}
                  aria-controls={`parcours-panel-${item.id}`}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span className="parcours-text">
                    <span className="parcours-period">{item.period}</span>
                    <span className="parcours-title">{item.title}</span>
                  </span>
                  <FaChevronDown className="parcours-chevron" aria-hidden="true" />
                </button>

                <div id={`parcours-panel-${item.id}`} className="parcours-panel">
                  <div className="parcours-panel-inner">
                    <p className="parcours-description">{item.description}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}