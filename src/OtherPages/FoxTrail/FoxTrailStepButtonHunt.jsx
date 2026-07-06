import { useEffect, useMemo, useRef, useState } from 'react'

const labelPool = [
  { label: 'north gate', correct: false },
  { label: 'coin flip', correct: false },
  { label: 'glass fox', correct: false },
  { label: 'moss note', correct: false },
  { label: 'ember hush', correct: true },
  { label: 'hush', correct: false },
  { label: 'orbit', correct: false },
  { label: 'saffron', correct: false },
  { label: 'blink', correct: false },
  { label: 'murmur', correct: false },
  { label: 'sparrow', correct: false },
  { label: 'trail', correct: false },
  { label: 'velvet', correct: false },
  { label: 'kindling', correct: false },
  { label: 'stitch', correct: false },
  { label: 'glow', correct: false },
  { label: 'ripple', correct: false },
  { label: 'veil', correct: false },
  { label: 'wisp', correct: false },
  { label: 'latch', correct: false },
  { label: 'scent', correct: false },
  { label: 'torch', correct: false },
  { label: 'feather', correct: false },
  { label: 'map', correct: false },
  { label: 'amber whisper', correct: false },
  { label: 'fox lantern', correct: false },
  { label: 'soft hinge', correct: false },
  { label: 'little spark', correct: false },
  { label: 'hidden seam', correct: false },
  { label: 'quiet door', correct: false },
  { label: 'stone tail', correct: false },
  { label: 'wild thread', correct: false },
  { label: 'dust path', correct: false },
  { label: 'night petal', correct: false },
  { label: 'old key', correct: false },
  { label: 'half-moon', correct: false },
  { label: 'paper fur', correct: false },
  { label: 'leaf code', correct: false },
  { label: 'silent step', correct: false },
  { label: 'river bend', correct: false }
]

function mulberry32(seed) {
  let a = seed
  return function next() {
    let t = a += 0x6D2B79F5
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle(items, seed) {
  const rng = mulberry32(seed)
  const cloned = [...items]
  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1))
    ;[cloned[index], cloned[swapIndex]] = [cloned[swapIndex], cloned[index]]
  }
  return cloned
}

function buildBoard(seed) {
  const rng = mulberry32(seed + 42)
  return shuffle(labelPool, seed).map((item, index) => ({
    ...item,
    id: `${seed}-${index}-${item.label}`,
    rotation: ((rng() * 2) - 1) * 14,
    translateY: ((rng() * 2) - 1) * 10,
    scale: 0.88 + (rng() * 0.28),
    width: 86 + Math.floor(rng() * 68),
    as: index % 13 === 0 ? 'checkbox' : index % 9 === 0 ? 'input' : 'button'
  }))
}

export default function FoxTrailStepButtonHunt({ canAdvance, onSolve, onRelock }) {
  const [solved, setSolved] = useState(canAdvance)
  const [layoutSeed, setLayoutSeed] = useState(1)
  const bottomRef = useRef(null)

  useEffect(() => {
    setSolved(canAdvance)
  }, [canAdvance])

  const board = useMemo(() => buildBoard(layoutSeed), [layoutSeed])
  const rows = useMemo(() => {
    const chunkSize = 8
    const result = []
    for (let index = 0; index < board.length; index += chunkSize) {
      result.push(board.slice(index, index + chunkSize))
    }
    return result
  }, [board])

  const handleWrong = () => {
    setSolved(false)
    onRelock()
    setLayoutSeed((value) => value + 1)
  }

  const handleCorrect = () => {
    setSolved(true)
    onSolve()
    setLayoutSeed((value) => value + 1)
    window.setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 40)
  }

  const renderControl = (control) => {
    const style = {
      transform: `rotate(${control.rotation}deg) translateY(${control.translateY}px) scale(${control.scale})`,
      width: `${control.width}px`
    }

    if (control.correct) {
      return (
        <button
          key={control.id}
          type="button"
          className="fox-trail-button ghost"//"fox-trail-button"
          style={style}
          onClick={handleCorrect}
        >
          {control.label}
        </button>
      )
    }

    if (control.as === 'input') {
      return (
        <input
          key={control.id}
          type="button"
          className="fox-trail-button ghost"
          style={style}
          value={control.label}
          onClick={handleWrong}
        />
      )
    }

    if (control.as === 'checkbox') {
      return (
        <label
          key={control.id}
          className="fox-trail-button ghost"
          style={{ ...style, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <input type="checkbox" onChange={handleWrong} />
          {control.label}
        </label>
      )
    }

    return (
      <button
        key={control.id}
        type="button"
        className="fox-trail-button ghost"
        style={style}
        onClick={handleWrong}
      >
        {control.label}
      </button>
    )
  }

  return (
    <div className="fox-trail-step fox-trail-long-scroll fox-trail-button-hunt">
      <section className="fox-trail-panel fox-trail-scroll-card">
        <p className="fox-trail-copy">
          The trail has turned into a wall of strange controls.
          Nothing here is helpful at first glance, which is exactly why it matters.
        </p>
        <p className="fox-trail-copy fox-trail-glow-accent" style={{ marginTop: 10 }}>
          The fox does not chase the loudest thing. It chooses the quiet pressure point.
        </p>
      </section>

      {rows.map((row, index) => (
        <section key={`${layoutSeed}-${index}`} className="fox-trail-panel fox-trail-scroll-card">
          <div className="fox-trail-button-cloud fox-trail-button-cloud-dense">
            {row.map(renderControl)}
          </div>
        </section>
      ))}

      <section className="fox-trail-panel" ref={bottomRef}>
        {solved ? (
          <div className="fox-trail-status">
            The trail answers quietly.
          </div>
        ) : (
          <p className="fox-trail-copy">The room feels restless. Keep hunting.</p>
        )}
      </section>
    </div>
  )
}
