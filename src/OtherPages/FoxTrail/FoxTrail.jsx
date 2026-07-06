import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ChevronLeft, Crown, Diamond, FlameKindling, KeyRound, Mail, Sparkles, TerminalSquare } from 'lucide-react'
import { motion } from 'motion/react'
import './FoxTrail.css'
import FoxTrailStepIntro from './FoxTrailStepIntro.jsx'
import FoxTrailStepRiddle from './FoxTrailStepRiddle.jsx'
import FoxTrailStepConsoleKey from './FoxTrailStepConsoleKey.jsx'
import FoxTrailStepButtonHunt from './FoxTrailStepButtonHunt.jsx'
import FoxTrailStepEscapeRoom from './FoxTrailStepEscapeRoom.jsx'
import FoxTrailStepVault from './FoxTrailStepVault.jsx'
import FoxTrailStepLetter from './FoxTrailStepLetter.jsx'

const STORAGE_KEY = 'fox-trail-frontier-v1'

const steps = [
  { id: 'intro', label: 'A tiny trailhead', icon: Sparkles, Component: FoxTrailStepIntro },
  { id: 'riddle', label: 'The riddle', icon: Crown, Component: FoxTrailStepRiddle },
  { id: 'console', label: 'Good LUCK', icon: TerminalSquare, Component: FoxTrailStepConsoleKey },
  { id: 'button-hunt', label: 'Button hunt', icon: ArrowRight, Component: FoxTrailStepButtonHunt },
  { id: 'escape-room', label: 'Escape room', icon: KeyRound, Component: FoxTrailStepEscapeRoom },
  { id: 'vault', label: 'The final vault', icon: Diamond, Component: FoxTrailStepVault },
  { id: 'letter', label: 'Letter reveal', icon: Mail, Component: FoxTrailStepLetter }
]

function readFrontier() {
  if (typeof window === 'undefined') return 0

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return 0

    const parsed = JSON.parse(raw)
    return Number.isInteger(parsed?.highestUnlockedStepIndex) ? parsed.highestUnlockedStepIndex : 0
  } catch {
    return 0
  }
}

function writeFrontier(highestUnlockedStepIndex) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ highestUnlockedStepIndex }))
}

function FoxTrailShell({ children, stepIndex, stepCount, title, subtitle, StepIcon, canAdvance }) {
  return (
    <main className="fox-trail-shell">
      <motion.section
        className="fox-trail-card"
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <div className="fox-trail-meter" aria-label={`Step ${stepIndex + 1} of ${stepCount}`}>
          {steps.slice(0, stepCount).map((step, index) => (
            <span
              key={step.id}
              className={index <= stepIndex ? 'fox-trail-meter-dot is-active' : 'fox-trail-meter-dot'}
            />
          ))}
        </div>

        <div className="fox-trail-heading-row">
          <div>
            <p className="fox-trail-kicker">Fox Trail</p>
            <h1 className="fox-trail-title">{title}</h1>
            <p className="fox-trail-subtitle">{subtitle}</p>
          </div>
          <div className="fox-trail-badge">
            {StepIcon ? <StepIcon size={18} /> : <FlameKindling size={18} />}
            <span>Jason edition</span>
          </div>
        </div>

        {children}

        <footer className="fox-trail-footer">
          <span>Step {stepIndex + 1} of {stepCount}</span>
          <span className="fox-trail-footer-glow">Built for a very specific Fox.</span>
        </footer>
      </motion.section>
    </main>
  )
}

export default function FoxTrail() {
  const { stepId } = useParams()
  const navigate = useNavigate()
  const [highestUnlockedStepIndex, setHighestUnlockedStepIndex] = useState(() => readFrontier())
  const [canAdvance, setCanAdvance] = useState(false)

  const maxAccessibleIndex = Math.max(0, Math.min(steps.length - 1, highestUnlockedStepIndex))

  const stepIndex = useMemo(() => {
    const index = steps.findIndex((step) => step.id === (stepId ?? 'intro'))
    return index === -1 ? 0 : index
  }, [stepId])

  const currentStep = steps[stepIndex]
  const nextStep = steps[stepIndex + 1]
  const previousStep = steps[stepIndex - 1]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [stepId])

  useEffect(() => {
    writeFrontier(highestUnlockedStepIndex)
  }, [highestUnlockedStepIndex])

  useEffect(() => {
    setCanAdvance(false)
  }, [stepIndex])

  useEffect(() => {
    if (!stepId) return
    const known = steps.some((step) => step.id === stepId)
    if (!known) {
      navigate('/fox-trail', { replace: true })
      return
    }

    if (stepIndex > maxAccessibleIndex) {
      navigate(`/fox-trail/${steps[maxAccessibleIndex].id}`, { replace: true })
    }
  }, [maxAccessibleIndex, navigate, stepId, stepIndex])

  if (!currentStep) {
    return <Navigate to="/fox-trail" replace />
  }

  const StepComponent = currentStep.Component
  const goToStep = (id) => navigate(`/fox-trail/${id}`)
  const nextHref = nextStep ? `/fox-trail/${nextStep.id}` : null
  const previousHref = previousStep ? `/fox-trail/${previousStep.id}` : null
  const unlockNextStep = () => {
    setCanAdvance(true)
    setHighestUnlockedStepIndex((prev) => Math.max(prev, stepIndex + 1))
  }
  const relockThisStep = () => {
    setCanAdvance(false)
  }

  if (currentStep.id === 'intro') {
    return <FoxTrailStepIntro nextHref={nextHref} onSolve={unlockNextStep} />
  }

  return (
    <FoxTrailShell
      stepIndex={stepIndex}
      stepCount={steps.length}
      title={currentStep.label}
      subtitle={currentStep.id === 'intro' ? 'A private birthday hunt for Jason, with fox energy all the way down.' : 'NEVER BACK DOWN, NEVER WHAT???'}
      StepIcon={currentStep.icon}
      canAdvance={canAdvance}
    >
      <StepComponent
        step={currentStep}
        stepIndex={stepIndex}
        stepCount={steps.length}
        nextStep={nextStep}
        previousStep={previousStep}
        nextHref={nextHref}
        previousHref={previousHref}
        canAdvance={canAdvance}
        onSolve={unlockNextStep}
        onRelock={relockThisStep}
        goToStep={goToStep}
      />

      <div className="fox-trail-nav">
        {previousHref ? (
          <Link className="fox-trail-nav-link ghost" to={previousHref}>
            <ChevronLeft size={16} />
            Previous
          </Link>
        ) : <span />}

        {nextHref && canAdvance ? (
          <Link className="fox-trail-nav-link" to={nextHref}>
            Next
            <ArrowRight size={16} />
          </Link>
        ) : nextHref ? (
          <span className="fox-trail-nav-placeholder">Solve this chamber to continue.</span>
        ) : <span />}
      </div>
    </FoxTrailShell>
  )
}

export { steps }
