import React, { useMemo, useState, useEffect } from 'react'

export default function AdvisorPage() {
  // ---------- base tokens ----------
  const s = {
    page: { width: '100%', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial', color: '#0f172a', background: '#f8fafc', minHeight: '100vh' },
    wrap: { width: '100%', maxWidth: 980, margin: '0 auto', padding: '24px' },

    // header is controlled by isMobile below
    avatar: { width: 96, height: 96, borderRadius: 12, objectFit: 'cover', background: '#e2e8f0', display: 'block' },
    name: { fontSize: 28, fontWeight: 700, margin: 0 },
    tagline: { margin: '6px 0 0 0', color: '#334155', lineHeight: 1.35 },

    kpis: { display: 'flex', gap: 16, flexWrap: 'wrap' },
    kpi: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '10px 14px' },

    nav: {
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
    },
    tab: isActive => ({
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      padding: '10px 14px',
      borderBottom: `3px solid ${isActive ? '#0ea5e9' : 'transparent'}`,
      color: isActive ? '#0ea5e9' : '#334155',
      fontWeight: isActive ? 700 : 600,
      cursor: 'pointer',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    }),

    panel: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 18, overflow: 'scroll' },
    h2: { fontSize: 18, margin: '0 0 10px 0' },
    label: { display: 'block', fontSize: 13, color: '#475569', marginBottom: 6 },
    input: { width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: 10, border: '1px solid #cbd5e1', outline: 'none' },

    button: { display: 'inline-block', padding: '10px 14px', borderRadius: 10, background: '#0ea5e9', color: '#fff', fontWeight: 700, border: 'none', cursor: 'pointer' },
    ghost: { display: 'inline-block', padding: '10px 14px', borderRadius: 10, background: 'transparent', color: '#0ea5e9', fontWeight: 700, border: '1px solid #0ea5e9', cursor: 'pointer' },

    list: { margin: 0, paddingLeft: 18 },
    small: { color: '#64748b', fontSize: 13 },
    contactRow: { display: 'grid', gap: 8 },
    chip: { display: 'inline-block', padding: '6px 10px', background: '#ecfeff', color: '#0369a1', borderRadius: 999, border: '1px solid #bae6fd', fontSize: 12, fontWeight: 700 },
    footer: { marginTop: 22, fontSize: 12, color: '#64748b' }
  }

  // ---------- responsive breakpoint ----------
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const [tab, setTab] = useState('Profile')

  // ---------- tiny tab button ----------
  function TabButton({ name }) {
    const active = tab === name
    return (
      <button
        role='tab'
        aria-selected={active}
        aria-controls={`panel-${name}`}
        style={s.tab(active)}
        onClick={() => setTab(name)}
      >
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

  // ---------- TOOLS ----------
  function BondCalculator() {
    const [amount, setAmount] = useState('1,200,000')
    const [rate, setRate] = useState('11.75')
    const [years, setYears] = useState('20')
    const [deposit, setDeposit] = useState('0')
    const [extra, setExtra] = useState('0')

    const { monthly, totalInterest, totalPaid, monthsToZero } = useMemo(() => {
      const pGross = parseNumber(amount)
      const dep = parseNumber(deposit)
      const p = Math.max(0, pGross - dep)
      const r = clamp(parseFloat(rate) / 100 / 12, 0, 1)
      const n = Math.max(1, Math.round(parseFloat(years) * 12))
      const extraPay = Math.max(0, parseNumber(extra))

      let m = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      m = m + extraPay

      let balance = p
      let months = 0
      if (r === 0) {
        months = Math.ceil(balance / m)
      } else {
        while (balance > 0 && months < 1200) {
          const interest = balance * r
          const principal = Math.max(0, m - interest)
          balance = balance - principal
          months++
          if (m <= interest + 1e-6) {
            months = Infinity
            break
          }
        }
      }

      const payoffMonths = Number.isFinite(months) ? months : n
      const totalPaidEst = m * payoffMonths
      const totalInterestEst = Math.max(0, totalPaidEst - p)

      return { monthly: m, totalInterest: totalInterestEst, totalPaid: totalPaidEst, monthsToZero: payoffMonths }
    }, [amount, rate, years, deposit, extra])

    const rowCols = isMobile ? '1fr' : '1fr 1fr'
    const statsCols = isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr'

    return (
      <div className='bond-calculator'>
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Loan amount (ZAR)'><I value={amount} onChange={setAmount} inputMode='decimal' /></L>
            <L label='Deposit (ZAR)'><I value={deposit} onChange={setDeposit} inputMode='decimal' /></L>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Interest rate (annual %)' ><I value={rate} onChange={setRate} inputMode='decimal' /></L>
            <L label='Term (years)'><I value={years} onChange={setYears} inputMode='decimal' /></L>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Extra monthly payment (optional, ZAR)'>
                <I value={extra} onChange={setExtra} inputMode='decimal' />
            </L>
            {!isMobile && <div />}
          </div>
        </div>

        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: statsCols, gap: 12 }}>
          <Stat title='Monthly instalment' value={fmtCurrency(monthly)} />
          <Stat title='Total interest' value={fmtCurrency(totalInterest)} />
          <Stat title='Total paid' value={fmtCurrency(totalPaid)} />
          <Stat title='Time to repay' value={fmtDuration(monthsToZero)} />
        </div>

        <p style={{ ...s.small, marginTop: 8 }}>
          Calculation assumes fixed rate with monthly compounding and constant payment. For guidance only, not advice.
        </p>
      </div>
    )
  }

  function RetirementShortfall() {
    const [age, setAge] = useState('35')
    const [retireAge, setRetireAge] = useState('65')
    const [lifeExpectancy, setLifeExpectancy] = useState('90')
    const [balance, setBalance] = useState('250,000')
    const [monthlySave, setMonthlySave] = useState('5,000')
    const [targetIncomeToday, setTargetIncomeToday] = useState('25,000')
    const [expReturn, setExpReturn] = useState('10')      // nominal annual %
    const [inflation, setInflation] = useState('5')       // annual %
    const [retReturn, setRetReturn] = useState('8')       // nominal annual % in retirement

    const res = useMemo(() => {
      const nowAge = Math.max(0, parseFloat(age) || 0)
      const nYears = Math.max(0, (parseFloat(retireAge) || 0) - nowAge)
      const monthsToRet = Math.round(nYears * 12)

      const rPreNomA = clamp(parseFloat(expReturn) / 100, -0.99, 4)
      const rRetNomA = clamp(parseFloat(retReturn) / 100, -0.99, 4)
      const iA = clamp(parseFloat(inflation) / 100, -0.99, 4)

      const rPreRealM = realMonthly(rPreNomA, iA)
      const rRetRealM = realMonthly(rRetNomA, iA)

      const pv = parseNumber(balance)
      const pmt = parseNumber(monthlySave)
      const targetReal = parseNumber(targetIncomeToday)

      const fvBal = fvSeries(pv, pmt, rPreRealM, monthsToRet)

      const yearsRet = Math.max(0, (parseFloat(lifeExpectancy) || 0) - (parseFloat(retireAge) || 0))
      const nRetMonths = Math.round(yearsRet * 12)
      const reqPot = nRetMonths === 0 ? 0 : annuityPV(targetReal, rRetRealM, nRetMonths)

      const gap = reqPot - fvBal
      const reqPMT = monthsToRet === 0 ? 0 : Math.max(0, pmtRequired(reqPot, pv, rPreRealM, monthsToRet))

      return { monthsToRet, nRetMonths, projectedPot: fvBal, requiredPot: reqPot, gap, suggestedMonthly: reqPMT }
    }, [age, retireAge, lifeExpectancy, balance, monthlySave, targetIncomeToday, expReturn, inflation, retReturn])

    const rowCols = isMobile ? '1fr' : '1fr 1fr'
    const statsCols = isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr'

    return (
      <div>
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Current age'><I value={age} onChange={setAge} inputMode='decimal' /></L>
            <L label='Retirement age'><I value={retireAge} onChange={setRetireAge} inputMode='decimal' /></L>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Life expectancy age'><I value={lifeExpectancy} onChange={setLifeExpectancy} inputMode='decimal' /></L>
            <L label='Current balance (ZAR)'><I value={balance} onChange={setBalance} inputMode='decimal' /></L>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Monthly saving (today’s money, ZAR)'><I value={monthlySave} onChange={setMonthlySave} inputMode='decimal' /></L>
            <L label='Target income (today’s money, ZAR/mo)'><I value={targetIncomeToday} onChange={setTargetIncomeToday} inputMode='decimal' /></L>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Expected return pre-retirement (annual % nominal)'><I value={expReturn} onChange={setExpReturn} inputMode='decimal' /></L>
            <L label='Inflation (annual %)'><I value={inflation} onChange={setInflation} inputMode='decimal' /></L>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Return during retirement (annual % nominal)'><I value={retReturn} onChange={setRetReturn} inputMode='decimal' /></L>
            {!isMobile && <div />}
          </div>
        </div>

        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: statsCols, gap: 12 }}>
          <Stat title='Projected pot (real)' value={fmtCurrency(res.projectedPot)} />
          <Stat title='Required pot (real)' value={fmtCurrency(res.requiredPot)} />
          <Stat title={res.gap >= 0 ? 'Surplus' : 'Shortfall'} value={fmtCurrency(Math.abs(res.gap))} />
          <Stat title='Suggested monthly save' value={fmtCurrency(res.suggestedMonthly)} />
        </div>

        <p style={{ ...s.small, marginTop: 8 }}>
          Real-terms projection: returns adjusted for inflation. Assumes end-of-month contributions and constant real income need.
          General information, not advice.
        </p>
      </div>
    )
  }

  function DrawdownSustainability() {
    const [pot, setPot] = useState('3,000,000')
    const [desiredIncomeToday, setDesiredIncomeToday] = useState('25,000')
    const [yearsNeeded, setYearsNeeded] = useState('30')
    const [retReturn, setRetReturn] = useState('8')   // nominal annual %
    const [inflation, setInflation] = useState('5')   // annual %

    const res = useMemo(() => {
      const pv = parseNumber(pot)
      const incomeReal = parseNumber(desiredIncomeToday)
      const years = Math.max(0, parseFloat(yearsNeeded) || 0)
      const rNom = clamp(parseFloat(retReturn) / 100, -0.99, 4)
      const iA = clamp(parseFloat(inflation) / 100, -0.99, 4)
      const rRealM = realMonthly(rNom, iA)

      const sustainableForYears = years === 0 ? 0 : pmtFromPV(pv, rRealM, Math.round(years * 12))
      const monthsToZero = monthsToDepletion(pv, incomeReal, rRealM)

      return { sustainableIncome: sustainableForYears, monthsToZero }
    }, [pot, desiredIncomeToday, yearsNeeded, retReturn, inflation])

    const rowCols = isMobile ? '1fr' : '1fr 1fr'

    return (
      <div>
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Starting pot (today’s money, ZAR)'><I value={pot} onChange={setPot} inputMode='decimal' /></L>
            <L label='Desired income (today’s money, ZAR/mo)'><I value={desiredIncomeToday} onChange={setDesiredIncomeToday} inputMode='decimal' /></L>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Years you want income to last'><I value={yearsNeeded} onChange={setYearsNeeded} inputMode='decimal' /></L>
            {!isMobile && <div />}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Return during retirement (annual % nominal)'><I value={retReturn} onChange={setRetReturn} inputMode='decimal' /></L>
            <L label='Inflation (annual %)'><I value={inflation} onChange={setInflation} inputMode='decimal' /></L>
          </div>
        </div>

        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
          <Stat title='Sustainable income for chosen years' value={fmtCurrency(res.sustainableIncome)} />
          <Stat title='Time to depletion at desired income' value={fmtDuration(res.monthsToZero)} />
        </div>

        <p style={{ ...s.small, marginTop: 8 }}>
          Real-terms math: income shown in today’s money. Payments assumed monthly, end-of-period.
        </p>
      </div>
    )
  }

  function FeeImpactVisualizer() {
    const [initial, setInitial] = useState('100,000')
    const [monthly, setMonthly] = useState('3,000')
    const [years, setYears] = useState('20')
    const [grossReturn, setGrossReturn] = useState('10') // before fees, annual %
    const [feeA, setFeeA] = useState('0.40')             // %
    const [feeB, setFeeB] = useState('1.50')             // %

    const res = useMemo(() => {
      const pv = parseNumber(initial)
      const pmt = parseNumber(monthly)
      const n = Math.round(Math.max(0, parseFloat(years) || 0) * 12)
      const g = clamp(parseFloat(grossReturn) / 100, -0.99, 4)
      const fA = clamp(parseFloat(feeA) / 100, 0, 2)
      const fB = clamp(parseFloat(feeB) / 100, 0, 2)

      const rA = effMonthly(Math.max(-0.99, g - fA))
      const rB = effMonthly(Math.max(-0.99, g - fB))

      const fvA = fvSeries(pv, pmt, rA, n)
      const fvB = fvSeries(pv, pmt, rB, n)
      const diff = fvA - fvB

      return { fvA, fvB, diff, better: diff >= 0 ? 'A (lower fee)' : 'B' }
    }, [initial, monthly, years, grossReturn, feeA, feeB])

    const rowCols = isMobile ? '1fr' : '1fr 1fr'
    const statsCols = isMobile ? '1fr' : '1fr 1fr 1fr'

    return (
      <div>
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Initial amount (ZAR)'><I value={initial} onChange={setInitial} inputMode='decimal' /></L>
            <L label='Monthly contribution (ZAR)'><I value={monthly} onChange={setMonthly} inputMode='decimal' /></L>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Years'><I value={years} onChange={setYears} inputMode='decimal' /></L>
            <L label='Gross return (annual % before fees)'><I value={grossReturn} onChange={setGrossReturn} inputMode='decimal' /></L>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: rowCols, gap: 12 }}>
            <L label='Fee A (TER %, e.g. 0.40)'><I value={feeA} onChange={setFeeA} inputMode='decimal' /></L>
            <L label='Fee B (TER %, e.g. 1.50)'><I value={feeB} onChange={setFeeB} inputMode='decimal' /></L>
          </div>
        </div>

        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: statsCols, gap: 12 }}>
          <Stat title='Portfolio A (lower fee) end value' value={fmtCurrency(res.fvA)} />
          <Stat title='Portfolio B (higher fee) end value' value={fmtCurrency(res.fvB)} />
          <Stat title='Value gained by lower fee' value={fmtCurrency(Math.abs(res.diff))} />
        </div>

        <p style={{ ...s.small, marginTop: 8 }}>
          Shows effect of ongoing fee drag on long-term compounding. Assumes monthly contributions at period end.
        </p>
      </div>
    )
  }

  // ---------- small form bits ----------
  function L({ label, children }) {
    return (
      <label>
        <span style={s.label}>{label}</span>
        {children}
      </label>
    )
  }

  function I({ value, onChange, ...rest }) {
    return (
      <input
        style={s.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        {...rest}
      />
    )
  }

  function Stat({ title, value }) {
    return (
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 12 }}>
        <div style={{ fontSize: 12, color: '#64748b' }}>{title}</div>
        <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>{value}</div>
      </div>
    )
  }

  function ContactBlock() {
    const email = 'ericrandall@gmail.com'
    const phone = '+27 83 668 7371'
    const website = 'https://flipmather.co.za/Eric'
    const org = 'Hereford (FSP 43373)'
    const name = 'Eric Randall, CFP®'

    const handleDownloadVCard = () => {
      const vcard =
        `BEGIN:VCARD
        VERSION:3.0
        N:${name};;;;
        FN:${name}
        ORG:${org}
        TITLE:Financial Advisor
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
        <div style={s.contactRow}>
          <div><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></div>
          <div><strong>Phone:</strong> <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></div>
          <div><strong>Website:</strong> <a href={website} target='_blank' rel='noreferrer'>{website}</a></div>
          <div><strong>Office:</strong> 4th floor, Ridge 6, 20 Ncondo Pl, Umhlanga Ridge, uMhlanga, 4319</div>
          <div><strong>Hours:</strong> Mon-Fri 06:30-17:00</div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button style={s.button} onClick={handleDownloadVCard}>Download vCard</button>
          <a style={s.ghost} href='https://wa.me/27820000000' target='_blank' rel='noreferrer'>WhatsApp</a>
        </div>
      </div>
    )
  }

  // ---------- finance helpers ----------
  function parseNumber(x) {
    if (typeof x === 'number') return x
    if (!x) return 0
    const cleaned = String(x).replace(/[^0-9.-]/g, '')
    const n = parseFloat(cleaned)
    return Number.isFinite(n) ? n : 0
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)) }
  function effMonthly(rAnnual) { return Math.pow(1 + rAnnual, 1 / 12) - 1 }
  function realMonthly(rAnnualNominal, inflationAnnual) {
    const realAnnual = (1 + rAnnualNominal) / (1 + inflationAnnual) - 1
    return effMonthly(realAnnual)
  }
  function fvSeries(pv, pmt, r, n) {
    if (n <= 0) return pv
    if (Math.abs(r) < 1e-12) return pv + pmt * n
    const g = Math.pow(1 + r, n)
    return pv * g + pmt * (g - 1) / r
  }
  function annuityPV(pmt, r, n) {
    if (n <= 0) return 0
    if (Math.abs(r) < 1e-12) return pmt * n
    return pmt * (1 - Math.pow(1 + r, -n)) / r
  }
  function pmtRequired(fvTarget, pv, r, n) {
    if (n <= 0) return 0
    if (Math.abs(r) < 1e-12) return Math.max(0, (fvTarget - pv) / n)
    const g = Math.pow(1 + r, n)
    return Math.max(0, r * (fvTarget - pv * g) / (g - 1))
  }
  function pmtFromPV(pv, r, n) {
    if (n <= 0) return pv
    if (Math.abs(r) < 1e-12) return pv / n
    return pv * r / (1 - Math.pow(1 + r, -n))
  }
  function monthsToDepletion(pv, pmt, r) {
    if (pmt <= 0) return Infinity
    if (Math.abs(r) < 1e-12) return Math.ceil(pv / pmt)
    let balance = pv
    let months = 0
    while (balance > 0 && months < 3600) {
      const interest = balance * r
      const principal = Math.max(0, pmt - interest)
      if (principal <= 1e-9) return Infinity
      balance = balance - principal
      months++
    }
    return months
  }
  function fmtCurrency(v) {
    try {
      return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 2 }).format(v || 0)
    } catch {
      return `R ${Number(v || 0).toFixed(2)}`
    }
  }
  function fmtDuration(months) {
    if (!Number.isFinite(months)) return '∞'
    const m = Math.max(0, Math.round(months || 0))
    const y = Math.floor(m / 12)
    const mm = m % 12
    if (y === 0) return `${mm} mo`
    if (mm === 0) return `${y} yr`
    return `${y} yr ${mm} mo`
  }

  // ---------- main render ----------
  const headerGrid = { display: 'grid', gridTemplateColumns: isMobile ? '72px 1fr' : '96px 1fr auto', gap: 16, alignItems: 'center', marginBottom: 16 }
  const avatarStyle = { ...s.avatar, width: isMobile ? 72 : 96, height: isMobile ? 72 : 96 }
  const sectionsGrid = { display: 'grid', gap: 16, gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', overflow: 'scroll' }
  const kpiBar = isMobile
    ? { gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }
    : s.kpis

  return (
    <main style={s.page}>
      <div style={s.wrap}>
        <header style={headerGrid}>
          <img
            src='/assets/eric.png'
            alt='Advisor portrait'
            style={avatarStyle}
            onError={e => { e.currentTarget.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(placeholderSvg()) }}
          />
          <div>
            <h1 style={s.name}>Eric Randall, CFP<sup>®</sup></h1>
            <p style={s.tagline}>Certified Financial Advisor • Retirement • Risk • Investments • Estate Planning</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              <span style={s.chip}>FSP 43373</span>
              <span style={s.chip}>2+ yrs experience</span>
              <span style={s.chip}>Durban North</span>
            </div>
          </div>
          <div style={kpiBar}>
            <div style={s.kpi}><div style={{ fontSize: 12, color: '#64748b' }}>Clients</div><div style={{ fontWeight: 800 }}>20+</div></div>
            <div style={s.kpi}><div style={{ fontSize: 12, color: '#64748b' }}>Avg. response</div><div style={{ fontWeight: 800 }}>≤ 1 business day</div></div>
          </div>
        </header>

        <nav style={s.nav} role='tablist' aria-label='Sections'>
          {['Profile', 'Services', 'Tools', 'Contact'].map(n => <TabButton key={n} name={n} />)}
        </nav>

        {tab === 'Profile' && (
          <div style={sectionsGrid}>
            <SectionCard title='About me' id='panel-Profile'>
              <p>
                I help individuals and families make confident money decisions. My advice is fee-transparent, goals-based,
                and aligned to your life stage. Typical work includes retirement planning, risk cover, tax-efficient investing,
                and estate planning coordination.
              </p>
              <ul style={s.list}>
                <li>Certified Financial Planner (CFP®)</li>
                <li>Registered with FSCA • FSP 43373</li>
                <li>Member of the Financial Planning Institute (FPI)</li>
              </ul>
            </SectionCard>

            <SectionCard title='Quick links'>
              <div style={{ display: 'grid', gap: 10 }}>
                <a href='https://www.linkedin.com/in/eric-randall-509554213/' target='_blank' rel='noreferrer' style={s.button}>Book an intro call</a>
                <a href='https://herefordgroup.co.za/' target='_blank' rel='noreferrer' style={s.ghost}>Disclosures & FAIS</a>
              </div>
            </SectionCard>
          </div>
        )}

        {tab === 'Services' && (
          <div style={sectionsGrid}>
            <SectionCard title='What I do' id='panel-Services'>
              <ul style={s.list}>
                <li>Retirement planning & drawdown strategies</li>
                <li>Risk planning: life, disability, severe illness</li>
                <li>Investment portfolios (unit trusts, ETFs, TFSA)</li>
                <li>Education & goal-based savings plans</li>
                <li>Estate planning liaison with your attorney</li>
              </ul>
              <p style={{ ...s.small, marginTop: 8 }}>
                Advice provided under FAIS. Product providers selected via independent research. Fees disclosed upfront.
              </p>
            </SectionCard>

            <SectionCard title='How we work'>
              <ol style={{ ...s.list, paddingLeft: 18 }}>
                <li>15-minute intro call</li>
                <li>Discovery meeting & data gathering</li>
                <li>Written plan & recommendations</li>
                <li>Implementation & annual review</li>
              </ol>
            </SectionCard>
          </div>
        )}

        {tab === 'Tools' && (
          <div style={{ display: 'grid', gap: 16 }}>
            <SectionCard title='Bond repayment calculator' id='panel-Tools-HomeLoan'>
              <BondCalculator />
            </SectionCard>

            <SectionCard title='Retirement shortfall estimator' id='panel-Tools-Ret'>
              <RetirementShortfall />
            </SectionCard>

            <SectionCard title='Drawdown sustainability (real terms)' id='panel-Tools-Drawdown'>
              <DrawdownSustainability />
            </SectionCard>

            <SectionCard title='Fee impact visualiser' id='panel-Tools-Fees'>
              <FeeImpactVisualizer />
            </SectionCard>

            <SectionCard title='More tools'>
              <div style={{ display: 'grid', gap: 10 }}>
                <div style={s.small}>Coming soon: debt snowball, affordability, TFSA tracker, refinance break-even</div>
              </div>
            </SectionCard>
          </div>
        )}

        {tab === 'Contact' && (
          <div style={sectionsGrid}>
            <SectionCard title='Get in touch' id='panel-Contact'>
              <ContactBlock />
            </SectionCard>

            <SectionCard title='Compliance'>
              <p style={s.small}>
                Authorised Financial Services Provider (FSP 43373). Advice rendered in terms of FAIS. Past performance is not
                indicative of future results. This page is general information, not personal financial advice.
              </p>
            </SectionCard>
          </div>
        )}

        <div style={s.footer}>
          © {new Date().getFullYear()} Hereford Group • All rights reserved
        </div>
      </div>
    </main>
  )

  // lightweight SVG placeholder for the headshot
  function placeholderSvg() {
    return `
<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'>
  <rect width='96' height='96' rx='12' fill='#e2e8f0'/>
  <circle cx='48' cy='36' r='16' fill='#cbd5e1'/>
  <rect x='18' y='56' width='60' height='24' rx='12' fill='#cbd5e1'/>
</svg>`
  }
}
