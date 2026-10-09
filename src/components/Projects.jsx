import { useEffect, useState } from 'react'
import './Projects.css'

// ====== À PERSONNALISER ======
const USERNAME = 'doumbiak349-ux'

// Noms des dépôts à ne PAS afficher (ex : ['smspro'])
const HIDDEN = []

// Afficher les dépôts copiés d'un autre compte (forks) ? true / false
const SHOW_FORKS = false

// Nombre maximum de projets affichés (les plus récents en premier)
const MAX_PROJECTS = 2

// Pour choisir toi-même les projets (et leur ordre), écris leurs noms ici.
// Exemple : ['smspro', 'hydration-tracker', 'password-cli']
// Laisse [] pour afficher les plus récents.
const FEATURED = ['smspro', 'hydration-tracker']

// Une image par projet.
// À gauche : le nom EXACT du dépôt GitHub.
// À droite : le chemin de l'image, qui doit être dans le dossier public/projects/
// (avec le / devant et la bonne extension : .png, .jpg, .webp...)
const IMAGES = {
  'projet-visiteurs.com': '/projects/projet-visiteurs.png',
  smspro: '/projects/smspro.png',
  dkr: '/projects/dkr.png',
  'password-cli': '/projects/password-cli.png',
  'hydration-tracker': '/projects/hydration-tracker.png',
}
// ==============================

// "projet-visiteurs.com" -> "projet visiteurs.com"
const formatName = (name) => name.replace(/[-_]/g, ' ')

// Liste des images à essayer pour un dépôt, dans l'ordre :
// 1. ton image personnalisée  2. l'aperçu généré par GitHub  3. un carré coloré
const getSources = (repo) =>
  [
    IMAGES[repo.name],
    `https://opengraph.githubassets.com/1/${USERNAME}/${repo.name}`,
  ].filter(Boolean)

export default function Projects() {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  // Pour chaque dépôt : quelle image essaie-t-on (0, 1, ou 2 = carré coloré)
  const [imageStage, setImageStage] = useState({})

  useEffect(() => {
    const controller = new AbortController()

    fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) throw new Error('Erreur GitHub')
        return res.json()
      })
      .then((data) => {
        const list = data
          .filter((repo) => SHOW_FORKS || !repo.fork)
          .filter((repo) => !HIDDEN.includes(repo.name))
          .filter((repo) => repo.name.toLowerCase() !== USERNAME.toLowerCase())
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        const selected =
          FEATURED.length > 0
            ? FEATURED.map((name) => list.find((repo) => repo.name === name)).filter(Boolean)
            : list.slice(0, MAX_PROJECTS)
        setRepos(selected)
        setStatus('ready')
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setStatus('error')
      })

    return () => controller.abort()
  }, [])

  const nextImage = (id) =>
    setImageStage((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Mes Projets</h2>

        {status === 'loading' && (
          <p className="projects-status">Chargement de mes projets GitHub…</p>
        )}

        {status === 'error' && (
          <p className="projects-status">
            Impossible de charger les projets pour le moment. Tu peux les
            consulter directement sur{' '}
            <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer">
              mon GitHub
            </a>
            .
          </p>
        )}

        {status === 'ready' && repos.length === 0 && (
          <p className="projects-status">Aucun projet public pour le moment.</p>
        )}

        {status === 'ready' && repos.length > 0 && (
          <div className="projects-grid">
            {repos.map((repo) => {
              const sources = getSources(repo)
              const stage = imageStage[repo.id] || 0
              const src = sources[stage]

              return (
                <article key={repo.id} className="project-card">
                  {src ? (
                    <img
                      key={src}
                      src={src}
                      alt={`Aperçu du projet ${repo.name}`}
                      className="project-image"
                      loading="lazy"
                      onError={() => nextImage(repo.id)}
                    />
                  ) : (
                    <div className="project-image project-image-placeholder" aria-hidden="true">
                      {repo.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="project-body">
                    {repo.language && (
                      <span className="project-language">{repo.language}</span>
                    )}
                    <h3 className="project-title">{formatName(repo.name)}</h3>
                    <p className="project-description">
                      {repo.description || 'Projet disponible sur GitHub.'}
                    </p>

                    <div className="project-buttons">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-small"
                      >
                        Voir le code
                      </a>
                      {repo.homepage && (
                        <a
                          href={
                            repo.homepage.startsWith('http')
                              ? repo.homepage
                              : `https://${repo.homepage}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-small"
                        >
                          Voir la démo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <p className="projects-more">
          <a
            href={`https://github.com/${USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir tous mes dépôts sur GitHub →
          </a>
        </p>
      </div>
    </section>
  )
}