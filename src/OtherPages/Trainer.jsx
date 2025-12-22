import React, { useMemo, useState } from 'react'
import useResponsive from '../hooks/useResponsive'

export default function TrainerPage() {
  // ---------- tokens ----------
  const s = {
    page: { fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial', color: '#0f172a', background: '#f8fafc', minHeight: '100vh' },
    wrap: { maxWidth: 980, margin: '0 auto', padding: '24px' },

    // keep header simple (no grid here — the Hero handles its own layout)
    header: { marginBottom: 16 },

    avatar: { width: 96, height: 96, borderRadius: 12, objectFit: 'cover', background: '#e2e8f0', display: 'block' },
    name: { fontSize: 28, fontWeight: 800, margin: 0 },
    role: isMobile => ({ display: isMobile ? 'block' : 'inline', fontWeight: 700, color: '#16a34a', marginLeft: isMobile ? 0 : 8 }),
    tagline: { margin: '6px 0 0 0', color: '#334155', lineHeight: 1.35 },

    chip: { display: 'inline-block', padding: '6px 10px', background: '#ecfeff', color: '#0369a1', borderRadius: 9, border: '1px solid #bae6fd', fontSize: 12, fontWeight: 700 },

    kpi: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '10px 14px' },

    nav: () => ({
      display: 'flex',
      gap: 8,
      borderBottom: '1px solid #e2e8f0',
      marginTop: 8,
      position: 'sticky',
      top: 0,
      background: '#f8fafc',
      zIndex: 10,
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      paddingBottom: 2
    }),
    tab: isActive => ({
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      padding: '10px 14px',
      borderBottom: `3px solid ${isActive ? '#22c55e' : 'transparent'}`,
      color: isActive ? '#16a34a' : '#334155',
      fontWeight: isActive ? 800 : 600,
      cursor: 'pointer',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    }),

    panel: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 18 },
    h2: { fontSize: 18, margin: '0 0 10px 0' },
    label: { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6 },
    input: { width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 10, border: '1px solid #cbd5e1', outline: 'none' },
    select: { width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 10, border: '1px solid #cbd5e1' },

    button: { display: 'inline-block', padding: '10px 14px', borderRadius: 10, background: '#16a34a', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer' },
    ghost: { display: 'inline-block', padding: '10px 14px', borderRadius: 10, background: 'transparent', color: '#16a34a', fontWeight: 800, border: '1px solid #16a34a', cursor: 'pointer' },

    list: { margin: 0, paddingLeft: 18 },
    small: { color: '#64748b', fontSize: 13 },
    stat: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 12 },
    card: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 16 },
    price: { fontWeight: 900, fontSize: 22 },
    badge: { display: 'inline-block', background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', padding: '4px 8px', borderRadius: 999, fontSize: 12, fontWeight: 800 },
    footer: { marginTop: 22, fontSize: 12, color: '#64748b' }
  }

  // ---------- responsive breakpoints ----------
  const isMobile = useResponsive()

  const [tab, setTab] = useState('Home')

  // ---------- tiny UI ----------
  function TabButton({ name }) {
    const active = tab === name
    return (
      <button role='tab' aria-selected={active} aria-controls={`panel-${name}`} style={s.tab(active)} onClick={() => setTab(name)}>
        {name}
      </button>
    )
  }

  function SectionCard({ title, right, children, id }) {
    return (
      <section style={s.panel} role='tabpanel' id={id} aria-labelledby={`tab-${title}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <h2 style={s.h2}>{title}</h2>
          {right}
        </div>
        {children}
      </section>
    )
  }

  function L({ label, children }) {
    return (
      <label>
        <span style={s.label}>{label}</span>
        {children}
      </label>
    )
  }

  function I({ value, onChange, ...rest }) {
    return <input style={s.input} value={value} onChange={e => onChange(e.target.value)} {...rest} />
  }

  function Select({ value, onChange, children }) {
    return <select style={s.select} value={value} onChange={e => onChange(e.target.value)}>{children}</select>
  }

  function Stat({ title, value }) {
    return (
      <div style={s.stat}>
        <div style={{ fontSize: 12, color: '#64748b' }}>{title}</div>
        <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>{value}</div>
      </div>
    )
  }

  // ---------- HERO ----------
  function Hero() {
    const gridCols = isMobile ? '72px 1fr' : '96px 1fr auto'
    const ctaStyle = isMobile
      ? { display: 'grid', gap: 8, gridColumn: '1 / -1', justifyItems: 'stretch' }
      : { display: 'grid', gap: 8, justifyItems: 'end' }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: 16, alignItems: 'center' }}>
        <img
          src='/assets/mackie.png'
          alt='Personal trainer headshot'
          style={{ ...s.avatar, width: isMobile ? 72 : 96, height: isMobile ? 72 : 96 }}
          onError={e => { e.currentTarget.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(placeholderSvg()) }}
        />

        <div>
          <h1 style={s.name}>
            <span>Mackie Khanyile</span>
            <span style={s.role(isMobile)}>Personal Trainer</span>
          </h1>
          <p style={s.tagline}>Strength & fat-loss coaching for busy professionals. Evidence-based programs. Measurable results.</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <span style={s.chip}>REPS SA / HFPA Certified</span>
            <span style={s.chip}>Durban North • Travel radius 10 km</span>
            <span style={s.chip}>Online & In-person</span>
          </div>
        </div>

        <div style={ctaStyle}>
          <a style={s.button} href='https://www.linkedin.com/in/mackie-khanyile-48b0b182/' target='_blank' rel='noreferrer'>Book free consult</a>
          <a style={s.ghost} href='https://l.instagram.com/?u=https%3A%2F%2Fwa.link%2Fqvbvau%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAac8yViKmVCSVQV_5gQbpwxpEx2SThpCCBQne_J8Ql7nA58u5qLrw8dEy--NFw_aem_gXQCJlCW275Ndo-IdRrVig&e=AT0fX8pjd96t_VvNnsEc2-WbKgMAMeZtD0eoOy1pNTHo-woWR4N5kgRstHPzt7mzzc81CdmOKn4nDFPpmM9YOUoMQ9Inrt4a0rvp6TD97A' target='_blank' rel='noreferrer'>WhatsApp</a>
        </div>
      </div>
    )
  }

  // ---------- PROGRAMS ----------
  function Programs() {
    const ProgramCard = ({ title, price, features, badge }) => (
      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          {badge ? <span style={s.badge}>{badge}</span> : null}
        </div>
        <div style={{ margin: '8px 0', color: '#334155' }}>
          <span style={s.price}>{price}</span> <span style={s.small}>incl. VAT</span>
        </div>
        <ul style={{ ...s.list, marginTop: 6 }}>{features.map((f, i) => <li key={i}>{f}</li>)}</ul>
        <div style={{ marginTop: 12 }}>
          <a style={s.button} href='https://cal.com/your-handle/intro' target='_blank' rel='noreferrer'>Get started</a>
        </div>
      </div>
    )

    const cols = isMobile ? '1fr' : '1fr 1fr 1fr'
    return (
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 16 }}>
        <ProgramCard
          title='1:1 In-Person'
          price='R450 / session'
          badge='Most popular'
          features={['60-min sessions at your gym or home', 'Movement screen & PAR-Q', 'Personalised program + app check-ins', 'Form coaching & accountability']}
        />
        <ProgramCard
          title='Online Coaching'
          price='R1,200 / month'
          features={['Custom program (4–6 week blocks)', 'Weekly video check-ins', 'Form reviews via clips', 'Habit & nutrition guidance']}
        />
        <ProgramCard
          title='Small-Group (2–4)'
          price='R300 / person'
          features={['Shared coaching & fun atmosphere', 'Budget-friendly', 'Progress tracking for each member', 'Bring a friend discount']}
        />
      </div>
    )
  }

  // ---------- TOOLS ----------
  function BMIWidget() {
    const [kg, setKg] = useState('75')
    const [cm, setCm] = useState('175')

    const res = useMemo(() => {
      const w = parseNumber(kg)
      const hM = parseNumber(cm) / 100
      const bmi = hM > 0 ? w / (hM * hM) : 0
      const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy' : bmi < 30 ? 'Overweight' : 'Obese'
      return { bmi, category }
    }, [kg, cm])

    const rowStyle = isMobile ? { display: 'grid', gridTemplateColumns: '1fr', gap: 12 } : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }
    const statsCols = isMobile ? '1fr 1fr' : '1fr 1fr'

    return (
      <div>
        <div style={rowStyle}>
          <L label='Weight (kg)'><I value={kg} onChange={setKg} inputMode='decimal' /></L>
          <L label='Height (cm)'><I value={cm} onChange={setCm} inputMode='decimal' /></L>
        </div>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: statsCols, gap: 12 }}>
          <Stat title='BMI' value={res.bmi ? res.bmi.toFixed(1) : '—'} />
          <Stat title='Category' value={res.category} />
        </div>
        <p style={{ ...s.small, marginTop: 8 }}>Screening tool only; does not account for muscle mass.</p>
      </div>
    )
  }

  function TDEEWidget() {
    const [sex, setSex] = useState('male')
    const [age, setAge] = useState('30')
    const [kg, setKg] = useState('75')
    const [cm, setCm] = useState('175')
    const [activity, setActivity] = useState('1.55') // moderate
    const [split, setSplit] = useState('40/30/30')   // C/P/F

    const res = useMemo(() => {
      const w = parseNumber(kg)
      const h = parseNumber(cm)
      const a = parseNumber(age)
      const act = clamp(parseFloat(activity), 1.1, 2.5)

      const bmr = sex === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161
      const tdee = bmr * act

      const [cPct, pPct, fPct] = split.split('/').map(x => parseFloat(x) / 100)
      const carbsG = (tdee * cPct) / 4
      const proteinG = (tdee * pPct) / 4
      const fatG = (tdee * fPct) / 9

      return { bmr, tdee, carbsG, proteinG, fatG }
    }, [sex, age, kg, cm, activity, split])

    const row2 = isMobile ? '1fr' : '1fr 1fr'
    const stats4 = isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr'

    return (
      <div>
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: row2, gap: 12 }}>
            <L label='Sex'>
              <Select value={sex} onChange={setSex}>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </Select>
            </L>
            <L label='Age (years)'><I value={age} onChange={setAge} inputMode='decimal' /></L>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: row2, gap: 12 }}>
            <L label='Weight (kg)'><I value={kg} onChange={setKg} inputMode='decimal' /></L>
            <L label='Height (cm)'><I value={cm} onChange={setCm} inputMode='decimal' /></L>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: row2, gap: 12 }}>
            <L label='Activity level'>
              <Select value={activity} onChange={setActivity}>
                <option value='1.2'>Sedentary (1.2)</option>
                <option value='1.375'>Light (1.375)</option>
                <option value='1.55'>Moderate (1.55)</option>
                <option value='1.725'>Very active (1.725)</option>
                <option value='1.9'>Athlete (1.9)</option>
              </Select>
            </L>
            <L label='Macro split (C/P/F)'>
              <Select value={split} onChange={setSplit}>
                <option value='40/30/30'>Balanced 40/30/30</option>
                <option value='35/35/30'>Muscle 35/35/30</option>
                <option value='20/40/40'>Lower-carb 20/40/40</option>
              </Select>
            </L>
          </div>
        </div>

        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: stats4, gap: 12 }}>
          <Stat title='BMR' value={fmtKcal(res.bmr)} />
          <Stat title='TDEE' value={fmtKcal(res.tdee)} />
          <Stat title='Protein (g/day)' value={fmtNumber(res.proteinG)} />
          <Stat title='Carbs (g/day)' value={fmtNumber(res.carbsG)} />
        </div>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
          <Stat title='Fat (g/day)' value={fmtNumber(res.fatG)} />
        </div>

        <p style={{ ...s.small, marginTop: 8 }}>Estimates using Mifflin–St Jeor and standard activity factors. Informational only; not medical or dietetic advice.</p>
      </div>
    )
  }

  function OneRMWidget() {
    const [weight, setWeight] = useState('80')
    const [reps, setReps] = useState('5')

    const res = useMemo(() => {
      const w = parseNumber(weight)
      const r = Math.max(1, parseNumber(reps))
      const oneRM = w * (1 + r / 30) // Epley
      return { oneRM, p85: oneRM * 0.85, p70: oneRM * 0.7, p60: oneRM * 0.6 }
    }, [weight, reps])

    const row = isMobile ? '1fr' : '1fr 1fr'
    const stats = isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr'

    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: row, gap: 12 }}>
          <L label='Weight lifted (kg)'><I value={weight} onChange={setWeight} inputMode='decimal' /></L>
          <L label='Reps (1–12)'><I value={reps} onChange={setReps} inputMode='decimal' /></L>
        </div>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: stats, gap: 12 }}>
          <Stat title='Estimated 1RM (kg)' value={fmtNumber(res.oneRM)} />
          <Stat title='85% (sets of 3–5)' value={fmtNumber(res.p85)} />
          <Stat title='70% (volume work)' value={fmtNumber(res.p70)} />
          <Stat title='60% (technique)' value={fmtNumber(res.p60)} />
        </div>
        <p style={{ ...s.small, marginTop: 8 }}>Estimate using Epley formula. Choose loads conservatively and prioritise form.</p>
      </div>
    )
  }

  // ---------- TESTIMONIALS ----------
  function Testimonials() {
    const items = [
      { q: 'I lost 8 kg in 12 weeks and hit my first full push-up set!', a: '– Thando M.' },
      { q: 'My back pain is gone and I deadlifted 100 kg for the first time.', a: '– Alex P.' },
      { q: 'Online coaching fits my travel schedule. Clear plans, weekly check-ins.', a: '– Jenna K.' }
    ]
    const cols = isMobile ? '1fr' : '1fr 1fr 1fr'
    return (
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 16 }}>
        {items.map((t, i) => (
          <blockquote key={i} style={s.card}>
            <p style={{ margin: 0 }}>"{t.q}"</p>
            <cite style={{ ...s.small, display: 'block', marginTop: 8 }}>{t.a}</cite>
          </blockquote>
        ))}
      </div>
    )
  }

  // ---------- FAQ ----------
  function FAQ() {
    const Row = ({ q, a }) => (
      <details style={s.card}>
        <summary style={{ fontWeight: 800, cursor: 'pointer' }}>{q}</summary>
        <p style={{ marginTop: 8 }}>{a}</p>
      </details>
    )
    return (
      <div style={{ display: 'grid', gap: 10 }}>
        <Row q='Do you offer nutrition plans?' a='I provide guidance, habits, and macro targets. For medical nutrition therapy, please consult a registered dietitian.' />
        <Row q='Where do in-person sessions happen?' a='Your building gym, selected partner gyms, or your home within a 10 km radius of Durban North.' />
        <Row q='What’s the cancellation policy?' a='Reschedule or cancel with 12 hours’ notice to avoid being charged for the session.' />
        <Row q='Is online coaching effective?' a='Yes. You get a personalised plan, weekly check-ins, and video form reviews to keep you progressing.' />
      </div>
    )
  }

  // ---------- CONTACT ----------
  function ContactBlock() {
    const email = 'mackieKhanyile@gmail.com'
    const phone = '+27 82 534 3009'
    const website = 'https://flipmather.co.za/mackie'
    const org = 'Private Training Practice'
    const name = 'Mackie Khanyile'

    const handleDownloadVCard = () => {
      const vcard =
`BEGIN:VCARD
VERSION:3.0
N:${name};;;;
FN:${name}
ORG:${org}
TITLE:Personal Trainer
TEL;TYPE=CELL:${phone}
EMAIL;TYPE=INTERNET:${email}
URL:${website}
END:VCARD`
      const blob = new Blob([vcard], { type: 'text/vcard' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${name.replace(/[^\w]+/g, '-')}.vcf`
      document.body.appendChild(a)
      a.click()
      URL.revokeObjectURL(url)
      a.remove()
    }

    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gap: 6 }}>
          <div><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></div>
          <div><strong>Phone:</strong> <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></div>
          <div><strong>WhatsApp:</strong> <a href='https://l.instagram.com/?u=https%3A%2F%2Fwa.link%2Fqvbvau%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAac8yViKmVCSVQV_5gQbpwxpEx2SThpCCBQne_J8Ql7nA58u5qLrw8dEy--NFw_aem_gXQCJlCW275Ndo-IdRrVig&e=AT0fX8pjd96t_VvNnsEc2-WbKgMAMeZtD0eoOy1pNTHo-woWR4N5kgRstHPzt7mzzc81CdmOKn4nDFPpmM9YOUoMQ9Inrt4a0rvp6TD97A' target='_blank' rel='noreferrer'>Chat now</a></div>
          <div><strong>Website:</strong> <a href={website} target='_blank' rel='noreferrer'>{website}</a></div>
          <div><strong>Hours:</strong> Mon–Fri 06:00–19:00, Sat 08:00–12:00</div>
          <div><strong>Area:</strong> Durban North • Umhlanga • La Lucia</div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a style={s.button} href='https://www.linkedin.com/in/mackie-khanyile-48b0b182/' target='_blank' rel='noreferrer'>Book consult</a>
          <button style={s.ghost} onClick={handleDownloadVCard}>Download vCard</button>
        </div>
        <p style={s.small}>By contacting me you agree to the privacy policy and consent to be contacted regarding coaching services.</p>
      </div>
    )
  }

  // ---------- utils ----------
  function parseNumber(x) {
    if (typeof x === 'number') return x
    if (!x) return 0
    const n = parseFloat(String(x).replace(/[^0-9.-]/g, ''))
    // const n = parseFloat(String(x).replace(/[^0-9.\-]/g, ''))
    return Number.isFinite(n) ? n : 0
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)) }
  function fmtKcal(v) { return `${Math.round(v || 0).toLocaleString('en-ZA')} kcal` }
  function fmtNumber(v) { return v == null || !Number.isFinite(v) ? '—' : Number(v).toFixed(0) }

  // ---------- main render ----------
  const twoColOrOne = isMobile ? { display: 'grid', gap: 16, gridTemplateColumns: '1fr' } : { display: 'grid', gap: 16, gridTemplateColumns: '1.2fr 1fr' }
  const kpiBar = isMobile
    ? { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }
    : { display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }

  return (
    <main style={s.page}>
      <div style={s.wrap}>
        <header style={s.header}>
          <Hero />
          <div style={kpiBar}>
            <div style={s.kpi}><div style={{ fontSize: 12, color: '#64748b' }}>Clients coached</div><div style={{ fontWeight: 800 }}>50+</div></div>
            <div style={s.kpi}><div style={{ fontSize: 12, color: '#64748b' }}>Avg. response</div><div style={{ fontWeight: 800 }}>≤ 4 hours</div></div>
          </div>
        </header>

        <nav style={s.nav(isMobile)} role='tablist' aria-label='Sections'>
          {['Home', 'Programs', 'Tools', 'Testimonials', 'FAQ', 'Contact'].map(n => <TabButton key={n} name={n} />)}
        </nav>

        {tab === 'Home' && (
          <div style={twoColOrOne}>
            <SectionCard title='About me' id='panel-Home'>
              <p>
                I help busy professionals build strength, drop fat, and feel confident. Training is tailored to your
                schedule and experience level, with clear progress week to week. Expect simple programming, great form,
                and measurable results.
              </p>
              <ul style={s.list}>
                <li>REPS SA / HFPA certified</li>
                <li>First-aid & liability insured</li>
                <li>Online or in-person within 10 km of Durban North</li>
              </ul>
            </SectionCard>

            <SectionCard title='How it works'>
              <ol style={{ ...s.list, paddingLeft: 18 }}>
                <li>Free 15-min consult</li>
                <li>Assessment & PAR-Q</li>
                <li>Personalised program build</li>
                <li>Weekly check-ins & progress tracking</li>
              </ol>
            </SectionCard>
          </div>
        )}

        {tab === 'Programs' && (
          <SectionCard title='Packages' id='panel-Programs'>
            <Programs />
          </SectionCard>
        )}

        {tab === 'Tools' && (
          <div style={{ display: 'grid', gap: 16 }}>
            <SectionCard title='BMI (metric)'><BMIWidget /></SectionCard>
            <SectionCard title='TDEE & Macros'><TDEEWidget /></SectionCard>
            <SectionCard title='1RM Estimator (Epley)'><OneRMWidget /></SectionCard>
            <SectionCard title='Notes'>
              <p style={s.small}>These tools provide estimates for education. Always consult a healthcare professional before starting a new program.</p>
            </SectionCard>
          </div>
        )}

        {tab === 'Testimonials' && (
          <SectionCard title='Client results' id='panel-Testimonials'>
            <Testimonials />
          </SectionCard>
        )}

        {tab === 'FAQ' && (
          <SectionCard title='Frequently asked' id='panel-FAQ'>
            <FAQ />
          </SectionCard>
        )}

        {tab === 'Contact' && (
          <div style={twoColOrOne}>
            <SectionCard title='Get in touch' id='panel-Contact'>
              <ContactBlock />
            </SectionCard>
            <SectionCard title='Compliance & Privacy'>
              <p style={s.small}>
                Training is at your own risk. Not medical advice. For nutrition therapy, consult a registered dietitian.
                By booking you agree to the cancellation policy and privacy terms. POPIA compliant.
              </p>
            </SectionCard>
          </div>
        )}

        <div style={s.footer}>
          © {new Date().getFullYear()} Private Training Practice • All rights reserved
        </div>
      </div>
    </main>
  )

  // placeholder SVG
  function placeholderSvg() {
    return `
<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'>
  <rect width='96' height='96' rx='12' fill='#e2e8f0'/>
  <circle cx='48' cy='36' r='16' fill='#cbd5e1'/>
  <rect x='18' y='56' width='60' height='24' rx='12' fill='#cbd5e1'/>
</svg>`
  }
}
