import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaJava,
  FaPhp,
  FaGitAlt,
  FaCode,
  FaDocker,
  FaMobileAlt,
} from 'react-icons/fa'
import {
  SiTailwindcss,
  SiJavascript,
  SiNextdotjs,
  SiMysql,
  SiPostgresql,
  SiKotlin,
  SiAndroidstudio,
  SiLaravel,
} from 'react-icons/si'
import './Skills.css'

// Ajoute, retire ou réordonne tes compétences ici
const skills = [
  { name: 'HTML', Icon: FaHtml5 },
  { name: 'CSS', Icon: FaCss3Alt },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'React', Icon: FaReact },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'Node.js', Icon: FaNodeJs },
  { name: 'PHP', Icon: FaPhp },
  { name: 'Laravel', Icon: SiLaravel },
  { name: 'Java', Icon: FaJava },
  { name: 'Kotlin', Icon: SiKotlin },
  { name: 'Android Studio', Icon: SiAndroidstudio },
  { name: 'WinDev Mobile', Icon: FaMobileAlt },
  { name: 'Langage C', Icon: FaCode },
  { name: 'MySQL', Icon: SiMysql },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'Docker', Icon: FaDocker },
  { name: 'Git', Icon: FaGitAlt },
]

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Compétences</h2>

        <ul className="skills-grid">
          {skills.map(({ name, Icon }) => (
            <li key={name} className="skill-card">
              <Icon className="skill-icon" size={44} aria-hidden="true" />
              <span className="skill-name">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}