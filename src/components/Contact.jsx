import { useState } from 'react'
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa'
import './Contact.css'

// ====== À PERSONNALISER ======
const EMAIL = 'doumbiak349@gmail.com'
const PHONE = '' // Ex : '+225 07 87 96 15 67'
const LOCATION = "Abidjan, Côte d'Ivoire"
const GITHUB = 'https://github.com/doumbiak349-ux/'
const LINKEDIN = 'https://www.linkedin.com/in/karamoko-doumbia-1737b9386/'

// Pour recevoir les messages directement dans ta boîte mail, sans ouvrir ta messagerie :
// 1. crée un formulaire gratuit sur formspree.io avec ton email
// 2. colle ici son adresse, par exemple : 'https://formspree.io/f/xxxxxxxx'
// Si tu laisses '', le bouton « Envoyer » ouvre ta messagerie avec le message déjà écrit.
const FORM_ENDPOINT = ''
// ==============================

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  // idle | sending | success | mailto | error
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Sans service d'envoi : on ouvre la messagerie avec le message prêt
    if (!FORM_ENDPOINT) {
      const subject = `Message depuis le portfolio - ${values.name}`
      const body = `${values.message}\n\n${values.name}\n${values.email}`
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    // Avec Formspree : envoi direct
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Envoi impossible')
      setValues({ name: '', email: '', message: '' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container contact-grid">
        {/* Infos à gauche */}
        <div className="contact-info">
          <h2 className="section-title">Contact</h2>

          <p className="contact-intro">
          +225 07 87 96 15 67
          </p>

          <ul className="contact-details">
            <li>
              <FaEnvelope className="contact-detail-icon" aria-hidden="true" />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </li>
            {PHONE && (
              <li>
                <FaPhoneAlt className="contact-detail-icon" aria-hidden="true" />
                <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
              </li>
            )}
            <li>
              <FaMapMarkerAlt className="contact-detail-icon" aria-hidden="true" />
              <span>{LOCATION}</span>
            </li>
          </ul>

          <div className="contact-socials">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Formulaire à droite */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nom"
            aria-label="Nom"
            value={values.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Votre message"
            aria-label="Votre message"
            rows="6"
            value={values.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="contact-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Envoi en cours…' : 'Envoyer'}
          </button>

          <p className="contact-status" role="status">
            {status === 'success' && 'Merci ! Ton message a bien été envoyé.'}
            {status === 'mailto' && 'Ta messagerie s’ouvre avec le message prêt à être envoyé.'}
            {status === 'error' &&
              `Une erreur est survenue. Écris-moi directement à ${EMAIL}.`}
          </p>
        </form>
      </div>
    </section>
  )
}