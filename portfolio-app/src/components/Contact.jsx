import { useState } from 'react'
import { profile } from '../data/portfolio'
import Reveal from './Reveal'

const FORM_ENDPOINT = 'https://formspree.io/f/mojwowya'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new URLSearchParams({
          name: form.name,
          _replyto: form.email,
          message: form.message,
          _subject: 'New Portfolio Contact Message',
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="kicker">// get in touch</div>
          <h2>Contact</h2>
          <p>Open to full-time data science, ML engineering, and applied AI roles. Reach out via the form or directly by email.</p>
        </Reveal>
        <Reveal className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" required value={form.name} onChange={update('name')} disabled={status === 'sending'} />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" required value={form.email} onChange={update('email')} disabled={status === 'sending'} />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={4} required value={form.message} onChange={update('message')} disabled={status === 'sending'} />
            </div>
            <button className="btn btn-primary" type="submit" style={{ width: 'fit-content' }} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
            {status === 'sent' && <p style={{ color: 'var(--accent2)', fontSize: '0.85rem' }}>✓ Message sent — thanks, I&apos;ll reply soon.</p>}
            {status === 'error' && <p style={{ color: '#ff8080', fontSize: '0.85rem' }}>Something went wrong — email me directly instead.</p>}
          </form>
          <div className="about-facts">
            <div className="row"><span className="label">EMAIL</span><span className="val">{profile.email}</span></div>
            <div className="row"><span className="label">PHONE</span><span className="val">{profile.phone}</span></div>
            <div className="row"><span className="label">LOCATION</span><span className="val">{profile.location}</span></div>
            <div className="row"><span className="label">LINKEDIN</span><span className="val"><a href={profile.linkedin} target="_blank" rel="noreferrer">/in/omkarbadadale1620</a></span></div>
            <div className="row"><span className="label">GITHUB</span><span className="val"><a href={profile.github} target="_blank" rel="noreferrer">github.com/omkarb40</a></span></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
