import { type FormEvent, type SVGProps, useState } from 'react'
import heroImage from './assets/physlabs-news-hero.jpg'
import './App.css'

type IconProps = SVGProps<SVGSVGElement>

const features = [
  {
    title: 'Plain-language summaries',
    body: 'We break down complex physics news into clear, everyday language.',
    Icon: BookIcon,
  },
  {
    title: 'Why it matters',
    body: 'Understand the big picture and how each discovery affects our world.',
    Icon: SparkIcon,
  },
  {
    title: 'Weekly reading list',
    body: 'Handpicked articles, papers, and videos to explore further.',
    Icon: BookmarkIcon,
  },
]

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isValidEmail(email.trim())) {
      setStatus('error')
      return
    }

    setStatus('success')
    setEmail('')
  }

  return (
    <form
      className={compact ? 'signup-form signup-form-compact' : 'signup-form'}
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor={compact ? 'footer-email' : 'hero-email'}>
        Email address
      </label>
      <input
        aria-describedby={compact ? 'footer-signup-status' : 'hero-signup-status'}
        id={compact ? 'footer-email' : 'hero-email'}
        inputMode="email"
        onChange={(event) => {
          setEmail(event.target.value)
          if (status !== 'idle') {
            setStatus('idle')
          }
        }}
        placeholder="Enter your email"
        type="email"
        value={email}
      />
      <button type="submit">Get the briefing</button>
      <p
        className={`form-message ${status === 'error' ? 'form-message-error' : ''}`}
        id={compact ? 'footer-signup-status' : 'hero-signup-status'}
        role="status"
      >
        {status === 'error' && 'Please enter a valid email address.'}
        {status === 'success' && "You're on the list. We'll send the next briefing soon."}
      </p>
    </form>
  )
}

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PhysLabs News home">
          <span>PhysLabs</span> <strong>News</strong>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#topics">Topics</a>
          <a href="#topics">Explainers</a>
          <a href="#about">About</a>
          <a href="#newsletter">Newsletter</a>
        </nav>
        <a className="header-cta" href="#newsletter">
          Get the briefing
        </a>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Physics news, explained simply</h1>
            <p className="hero-subheadline">
              A clear weekly briefing on discoveries, space, particles, climate physics, and
              the ideas shaping tomorrow.
            </p>
            <NewsletterForm />
            <p className="trust-note">
              <CheckIcon /> Join thousands of curious readers. Unsubscribe anytime.
            </p>
          </div>

          <div className="hero-image-frame">
            <img
              alt="Researcher standing beside a large particle detector in a bright physics facility"
              src={heroImage}
            />
          </div>
        </section>

        <section className="features-section" id="topics" aria-labelledby="features-title">
          <h2 className="sr-only" id="features-title">
            Beginner-friendly physics news features
          </h2>
          <div className="feature-grid">
            {features.map(({ title, body, Icon }) => (
              <article className="feature-card" key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="newsletter-section" id="newsletter" aria-labelledby="newsletter-title">
          <div className="newsletter-icon" aria-hidden="true">
            <EnvelopeIcon />
          </div>
          <div className="newsletter-copy" id="about">
            <h2 id="newsletter-title">Start following physics without the jargon</h2>
            <p>
              Join our free weekly newsletter and get science you can understand, straight to
              your inbox.
            </p>
          </div>
          <NewsletterForm compact />
        </section>
      </main>
    </div>
  )
}

function BookIcon(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 48 48" {...props}>
      <path d="M10 13.5c5.5-1.8 10-.9 14 2.8 4-3.7 8.5-4.6 14-2.8v23.2c-5.5-1.8-10-.9-14 2.8-4-3.7-8.5-4.6-14-2.8V13.5Z" />
      <path d="M24 16.3v23.2" />
      <path d="M14.5 19.4c3.1-.5 5.4.1 7 1.8M33.5 19.4c-3.1-.5-5.4.1-7 1.8" />
    </svg>
  )
}

function SparkIcon(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 48 48" {...props}>
      <path d="M24 8v4.5M24 35.5V40M36.7 13.3l-3.2 3.2M14.5 33.5l-3.2 3.2M40 24h-4.5M12.5 24H8M36.7 34.7l-3.2-3.2M14.5 14.5l-3.2-3.2" />
      <path d="M24 15.5a9 9 0 0 0-5.4 16.2v4.8h10.8v-4.8A9 9 0 0 0 24 15.5Z" />
      <path d="M20.5 36.5h7M21.5 41h5" />
    </svg>
  )
}

function BookmarkIcon(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 48 48" {...props}>
      <path d="M14 10.5h20v28L24 32l-10 6.5v-28Z" />
    </svg>
  )
}

function EnvelopeIcon(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 48 48" {...props}>
      <path d="M8 14h32v22H8V14Z" />
      <path d="m10 16 14 11 14-11" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="9" />
      <path d="m6.2 10.2 2.4 2.4 5.2-5.4" />
    </svg>
  )
}

export default App
