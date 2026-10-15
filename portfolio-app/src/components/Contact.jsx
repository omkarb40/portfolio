import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../data/portfolio'
import SectionHead from './SectionHead'

const FORM_ENDPOINT = 'https://formspree.io/f/mojwowya'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new URLSearchParams({ name: form.name, _replyto: form.email, message: form.message, _subject: 'New portfolio message' }),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }) } else setStatus('error')
    } catch { setStatus('error') }
  }

  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { window.location.href = `mailto:${profile.email}` }
  }

  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <SectionHead title="Let’s talk" lede="Open to data science, ML engineering and applied AI roles. The fastest way to reach me is email." />
        <div className="contact-grid">
          <div className="contact-direct">
            <button className="email-big" onClick={copyEmail} aria-label={`Copy ${profile.email}`}>
              <span>{profile.email}</span>
              <AnimatePresence mode="wait">
                <motion.span key={String(copied)} className="email-act" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                  {copied ? 'Copied' : 'Copy'}
                </motion.span>
              </AnimatePresence>
            </button>
            <ul className="contact-links">
              <li><a href={profile.linkedin} target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in" aria-hidden="true" /> {profile.linkedinLabel}</a></li>
              <li><a href={profile.github} target="_blank" rel="noreferrer"><i className="fab fa-github" aria-hidden="true" /> github.com/omkarb40</a></li>
              <li><a href={profile.resume} target="_blank" rel="noreferrer"><i className="fas fa-file-arrow-down" aria-hidden="true" /> Resume (PDF)</a></li>
              <li><span><i className="fas fa-location-dot" aria-hidden="true" /> {profile.location}</span></li>
            </ul>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Name<input required value={form.name} onChange={update('name')} disabled={status === 'sending'} autoComplete="name" /></label>
            <label>Email<input type="email" required value={form.email} onChange={update('email')} disabled={status === 'sending'} autoComplete="email" /></label>
            <label>Message<textarea rows={4} required value={form.message} onChange={update('message')} disabled={status === 'sending'} /></label>
            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending' : 'Send message'}</button>
            <p className="form-status" aria-live="polite">
              {status === 'sent' && 'Message sent. Thanks, I’ll get back to you soon.'}
              {status === 'error' && 'The message didn’t send. Email me directly at the address on the left.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
