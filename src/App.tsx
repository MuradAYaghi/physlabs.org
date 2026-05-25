import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowRight,
  Atom,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  CircuitBoard,
  FlaskConical,
  FolderGit2,
  Gauge,
  GraduationCap,
  LockKeyhole,
  Microscope,
  Play,
  RadioTower,
  SlidersHorizontal,
  Thermometer,
  UsersRound,
  Waves,
} from 'lucide-react'
import heroImage from './assets/physlabs-hero.png'
import './App.css'

type LabKey = 'mechanics' | 'optics' | 'circuits' | 'thermal'

const labs: Record<
  LabKey,
  {
    title: string
    subtitle: string
    icon: typeof Atom
    metric: string
    value: string
    description: string
    accent: string
    points: string[]
  }
> = {
  mechanics: {
    title: 'Mechanics',
    subtitle: 'Motion, forces, energy',
    icon: Atom,
    metric: 'Mean error',
    value: '1.8%',
    description:
      'Run carts, pendulums, collisions, and orbital models with synchronized notes and data tables.',
    accent: '#155ee8',
    points: ['Free-body diagrams', 'Velocity traces', 'Exportable trials'],
  },
  optics: {
    title: 'Optics',
    subtitle: 'Interference and lenses',
    icon: Waves,
    metric: 'Fringe fit',
    value: '0.97 R2',
    description:
      'Tune wavelength, slit spacing, focal length, and screen distance while students compare live plots.',
    accent: '#04a3c7',
    points: ['Ray diagrams', 'Intensity maps', 'Sensor overlays'],
  },
  circuits: {
    title: 'Circuits',
    subtitle: 'Signals and components',
    icon: CircuitBoard,
    metric: 'Samples',
    value: '42k',
    description:
      'Assemble practical DC and AC circuits, record traces, and connect virtual work to bench equipment.',
    accent: '#f2a900',
    points: ['Scope traces', 'Component library', 'Safe presets'],
  },
  thermal: {
    title: 'Thermodynamics',
    subtitle: 'Heat, fluids, systems',
    icon: Thermometer,
    metric: 'Stability',
    value: '99.9%',
    description:
      'Model heat transfer, phase changes, and gas laws with repeatable datasets for reports and rubrics.',
    accent: '#18a36b',
    points: ['Live curves', 'Run comparison', 'Report snapshots'],
  },
}

const featureGroups = [
  {
    title: 'Class and lab management',
    body: 'Organize courses, sections, teams, due dates, and reusable experiment templates.',
    icon: UsersRound,
  },
  {
    title: 'Real and virtual integration',
    body: 'Connect sensors and hardware where available, or run the same workflow fully online.',
    icon: RadioTower,
  },
  {
    title: 'Grading and rubrics',
    body: 'Review submissions with structured checkpoints, comments, and clean export packages.',
    icon: BookOpenCheck,
  },
  {
    title: 'Resource library',
    body: 'Keep manuals, datasets, diagrams, and starter notebooks in one versioned workspace.',
    icon: FolderGit2,
  },
  {
    title: 'Secure by design',
    body: 'Use role-based access, isolated class spaces, and clear ownership for shared data.',
    icon: LockKeyhole,
  },
  {
    title: 'Insights and analytics',
    body: 'Track progress, experiment completion, and common misconceptions across cohorts.',
    icon: BarChart3,
  },
]

const steps = [
  {
    title: 'Choose a lab',
    body: 'Browse experiments by topic, course, or available equipment.',
    icon: Microscope,
  },
  {
    title: 'Configure and run',
    body: 'Adjust parameters, start simulations, or connect instruments.',
    icon: SlidersHorizontal,
  },
  {
    title: 'Capture and analyze',
    body: 'Collect tables, plots, observations, and uncertainty notes.',
    icon: Activity,
  },
  {
    title: 'Share and assess',
    body: 'Submit reports, collaborate with peers, and review work.',
    icon: GraduationCap,
  },
]

function App() {
  const [activeLab, setActiveLab] = useState<LabKey>('optics')
  const lab = labs[activeLab]
  const ActiveIcon = lab.icon

  const waveBars = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => {
        const height = 18 + Math.abs(Math.sin(index * 0.62)) * 68
        const opacity = 0.22 + Math.abs(Math.cos(index * 0.38)) * 0.55

        return { height, opacity }
      }),
    [],
  )

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PhysLabs home">
          <span className="brand-mark">
            <FlaskConical size={18} strokeWidth={2.3} />
          </span>
          <span>
            Phys<span>Labs</span>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#labs">Labs</a>
          <a href="#workspace">Workspace</a>
          <a href="#institutions">Institutions</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <a className="text-link" href="mailto:hello@physlabs.org">
            Log in
          </a>
          <a className="button button-small" href="#contact">
            Set up access
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              Build, run, and share{' '}
              <span className="mobile-line">physics experiments</span> <span>online</span>
            </h1>
            <p>
              A practical workspace for simulations, lab notes, data capture, and
              teaching workflows.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button" href="#labs">
                Explore labs <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#contact">
                Set up access
              </a>
            </div>
          </div>

          <div className="hero-media" aria-label="Physics experiment preview">
            <img src={heroImage} alt="Optics bench and simulation workspace" />
            <div className="simulation-panel">
              <div className="panel-topline">
                <span>Double-slit interference</span>
                <span>Live</span>
              </div>
              <div className="interference" aria-hidden="true">
                {waveBars.map((bar, index) => (
                  <span
                    key={index}
                    style={{
                      height: `${bar.height}%`,
                      opacity: bar.opacity,
                    }}
                  />
                ))}
              </div>
              <div className="mini-chart" aria-hidden="true">
                <svg viewBox="0 0 320 92" role="presentation">
                  <path
                    d="M0 72 C25 72 30 28 48 48 S77 78 96 44 130 24 148 58 179 86 196 48 230 12 252 44 286 83 320 52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="lab-strip" id="labs" aria-label="Physics lab topics">
          {(Object.keys(labs) as LabKey[]).map((key) => {
            const item = labs[key]
            const Icon = item.icon

            return (
              <button
                className={key === activeLab ? 'active' : ''}
                key={key}
                onClick={() => setActiveLab(key)}
                type="button"
              >
                <Icon size={28} strokeWidth={1.8} />
                <span>{item.title}</span>
                <ArrowRight size={18} />
              </button>
            )
          })}
        </section>

        <section className="workspace-section" id="workspace" aria-labelledby="workspace-title">
          <div className="section-copy">
            <h2 id="workspace-title">A lab workspace that keeps the experiment intact</h2>
            <p>
              Students can move from setup to analysis without losing the context that
              makes lab work meaningful.
            </p>
          </div>

          <div className="workspace-grid">
            <article className="experiment-card">
              <div className="experiment-header">
                <div>
                  <p>{lab.subtitle}</p>
                  <h3>{lab.title}</h3>
                </div>
                <span style={{ color: lab.accent }}>
                  <ActiveIcon size={34} />
                </span>
              </div>
              <p>{lab.description}</p>
              <div className="metric-row">
                <span>{lab.metric}</span>
                <strong>{lab.value}</strong>
              </div>
              <ul>
                {lab.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={18} />
                    {point}
                  </li>
                ))}
              </ul>
            </article>

            <div className="data-board" aria-label={`${lab.title} data preview`}>
              <div className="board-toolbar">
                <span>Run 04</span>
                <span>Notes saved</span>
                <button type="button">
                  <Play size={15} fill="currentColor" />
                  Run
                </button>
              </div>
              <div className="board-plot">
                <svg viewBox="0 0 640 260" role="img" aria-label="Simulation plot">
                  <defs>
                    <linearGradient id="plotFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={lab.accent} stopOpacity="0.26" />
                      <stop offset="100%" stopColor={lab.accent} stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 230 C58 226 70 162 106 174 145 187 145 58 190 86 232 112 242 224 286 180 328 138 330 38 382 58 431 77 420 215 478 196 535 177 558 94 640 118 L640 260 L0 260 Z"
                    fill="url(#plotFill)"
                  />
                  <path
                    d="M0 230 C58 226 70 162 106 174 145 187 145 58 190 86 232 112 242 224 286 180 328 138 330 38 382 58 431 77 420 215 478 196 535 177 558 94 640 118"
                    fill="none"
                    stroke={lab.accent}
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="board-table">
                {['Trial', 'Parameter', 'Result', 'Status'].map((heading) => (
                  <span key={heading}>{heading}</span>
                ))}
                <strong>A</strong>
                <span>633 nm</span>
                <span>0.97</span>
                <em>Reviewed</em>
                <strong>B</strong>
                <span>532 nm</span>
                <span>0.94</span>
                <em>Ready</em>
              </div>
            </div>
          </div>
        </section>

        <section className="process-section" aria-labelledby="process-title">
          <div className="section-copy section-copy-tight">
            <h2 id="process-title">How it works</h2>
          </div>
          <div className="steps">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <article key={step.title}>
                  <span className="step-number">{index + 1}</span>
                  <Icon size={38} strokeWidth={1.7} />
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section
          className="institution-section"
          id="institutions"
          aria-labelledby="institution-title"
        >
          <div className="section-copy">
            <h2 id="institution-title">Built for institutions and lab teams</h2>
            <p>
              PhysLabs is structured for repeatable teaching, clean administration,
              and long-term lab content ownership.
            </p>
          </div>
          <div className="feature-list">
            {featureGroups.map((feature) => {
              const Icon = feature.icon

              return (
                <article key={feature.title}>
                  <Icon size={30} strokeWidth={1.8} />
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="launch-section" id="contact" aria-labelledby="launch-title">
          <div className="circuit-line" aria-hidden="true">
            <Gauge size={70} strokeWidth={1.4} />
          </div>
          <div>
            <h2 id="launch-title">Ready to launch PhysLabs?</h2>
            <p>Start with the labs you teach today, then expand into a shared physics workspace.</p>
          </div>
          <a className="button" href="mailto:hello@physlabs.org">
            Contact sales <ArrowRight size={18} />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <a className="brand" href="#top" aria-label="PhysLabs home">
            <span className="brand-mark">
              <FlaskConical size={18} strokeWidth={2.3} />
            </span>
            <span>
              Phys<span>Labs</span>
            </span>
          </a>
          <p>A modern physics laboratory platform for teaching, learning, and research.</p>
        </div>
        <div>
          <h2>Platform</h2>
          <a href="#labs">Labs</a>
          <a href="#workspace">Workspace</a>
          <a href="#institutions">Institutions</a>
        </div>
        <div>
          <h2>Contact</h2>
          <a href="mailto:hello@physlabs.org">hello@physlabs.org</a>
          <a href="https://physlabs.org">physlabs.org</a>
        </div>
      </footer>
    </div>
  )
}

export default App
