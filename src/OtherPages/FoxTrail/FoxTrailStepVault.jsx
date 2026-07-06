import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'

const seals = [
  {
    id: 'heat',
    label: 'First seal',
    clue: 'the thing that glows inside the console fragment',
    options: ['smoke', 'coal', 'rain', 'black', 'amber', 'teal', 'rust', 'white', 'gray', 'blue', 'green', 'red', 'orange', 'yellow', 'purple', 'pink', 'brown', 'indigo', 'violet', 'magenta', 'cyan', 'turquoise', 'lavender', 'peach', 'beige', 'cream', 'tan', 'maroon', 'burgundy', 'navy', 'teal', 'olive', 'lime', 'mint', 'aqua', 'salmon', 'coral', 'fuchsia', 'plum', 'orchid', 'periwinkle', 'sapphire', 'emerald', 'ruby', 'topaz', 'amethyst', 'garnet', 'opal', 'jade', 'onyx', 'quartz', 'amber', 'citrine', 'tourmaline', 'zircon', 'moonstone', 'sunstone', 'lapis lazuli', 'malachite', 'silver', 'azurite', 'hematite', 'pyrite', 'magnetite', 'rhodonite', 'serpentine', 'tiger eye', 'aventurine', 'chalcedony', 'carnelian', 'jasper', 'agate', 'obsidian', 'sodalite', 'fluorite', 'calcite', 'dolomite', 'gypsum', 'halite', 'limestone', 'marble', 'sandstone', 'shale', 'slate', 'basalt', 'granite', 'andesite', 'diorite', 'gabbro', 'rhyolite', 'tuff'],
    correct: 'silver'
  },
  {
    id: 'creature',
    label: 'Second seal',
    clue: 'the animal that owns the trail',
    options: ['hare', 'duck', 'wolf', 'dead fox', 'squirrel', 'bear', 'cat', 'dog', 'mouse', 'rat', 'bat', 'owl', 'crow', 'raven', 'beaver', 'moose', 'deer', 'elk', 'badger', 'weasel', 'otter', 'skunk', 'opossum', 'armadillo', 'fox', 'porcupine', 'hedgehog', 'mole', 'shrew', 'ferret', 'mongoose', 'lemur', 'monkey', 'ape', 'chimpanzee', 'gorilla', 'orangutan', 'gibbon', 'tarsier', 'lemur', 'sifaka', 'aye-aye', 'indri', 'bushbaby', 'galago', 'loris', 'pottos', 'tarsiers', 'tarsier', 'lemur', 'sifaka', 'aye-aye', 'indri', 'bushbaby', 'galago', 'loris', 'pottos', 'tarsiers', 'tarsier', 'lemur', 'sifaka', 'aye-aye', 'indri', 'bushbaby', 'galago', 'loris', 'pottos'],
    correct: 'fox'
  },
  {
    id: 'light',
    label: 'Third seal',
    clue: 'The greatest of what we all should do',
    options: ['hopes', 'dreams', 'fears', 'hates', 'wishes', 'prays', 'cries', 'laughs', 'smiles', 'sings', 'dances', 'runs', 'jumps', 'flies', 'swims', 'climbs', 'crawls', 'walks', 'sits', 'stands', 'lies down', 'rests', 'sleeps', 'eats', 'drinks', 'breathes', 'thinks', 'feels', 'touches', 'hears', 'sees', 'tastes', 'smells', 'remembers', 'forgets', 'learns', 'teaches', 'loves', 'creates', 'destroys', 'builds', 'breaks', 'gives', 'takes', 'shares', 'steals', 'helps', 'hurts', 'protects', 'attacks', 'defends', 'offends', 'forgives', 'blames', 'judges', 'accepts', 'rejects', 'welcomes', 'excludes', 'includes', 'excludes', 'embraces', 'avoids', 'confronts', 'evades', 'challenges', 'complies', 'resists', 'submits', 'dominates', 'follows', 'leads'],
    correct: 'loves'
  },
  {
    id: 'home',
    label: 'Fourth seal',
    clue: 'popular animated movie character names',
    options: ['mickey', 'minnie', 'simba', 'timon', 'woody', 'buzz', 'nemo', 'dory', 'shrek', 'donkey', 'po', 'shifu', 'toothless', 'hiccup', 'manny', 'sid', 'scrat', 'elsa', 'anna', 'olaf', 'moana', 'maui', 'judy', 'nick', 'lightning', 'mater', 'wall-e', 'eve', 'mulan', 'mushu', 'ariel', 'flounder', 'sebastian', 'belle', 'beast', 'aladdin', 'jasmine', 'genie', 'tarzan', 'jane', 'baloo', 'bagheera', 'mowgli', 'cruella', 'peter', 'tinkerbell', 'pinocchio', 'bambi', 'thumper', 'dumbo', 'timothy', 'lady', 'tramp', 'aristocats', 'marie', 'duchess', 'thomas', 'robin', 'marian', 'pocahontas', 'meeko', 'mulan', 'shang', 'lilo', 'stitch', 'cruella', 'ursula', 'rapunzel', 'flynn', 'pascal', 'merida', 'angus', 'raya', 'sisu', 'mirabel', 'isabela', 'antonio', 'miguel', 'hector', 'coco', 'ernesto'],
    correct: 'scrat'
  }
]

export default function FoxTrailStepVault({ canAdvance, onSolve, onRelock }) {
  const [choices, setChoices] = useState(() => seals.reduce((acc, seal) => ({ ...acc, [seal.id]: '' }), {}))
  const [submissionState, setSubmissionState] = useState(canAdvance ? 'correct' : 'idle')

  useEffect(() => {
    setSubmissionState(canAdvance ? 'correct' : 'idle')
  }, [canAdvance])

  const canUnlock = useMemo(() => seals.every((seal) => choices[seal.id] === seal.correct), [choices])

  const handleSealChange = (id, value) => {
    setChoices((current) => ({ ...current, [id]: value }))
  }

  const handleSubmit = () => {
    if (canUnlock) {
      setSubmissionState('correct')
      onSolve()
      return
    }

    setSubmissionState('incorrect')
    onRelock()
  }

  return (
    <div className="fox-trail-step fox-trail-vault">
      <div className="fox-trail-panel">
        <motion.p
          className="fox-trail-copy"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45 }}
        >
          The fox vault is the biggest lock in the trail.
          It will only open if you can remember the thread running through the whole journey.
        </motion.p>

        <div className="fox-trail-vault-grid" style={{ marginTop: 18 }}>
          {seals.map((seal, index) => (
            <motion.div
              key={seal.id}
              className="fox-trail-card-mini"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index, duration: 0.45 }}
            >
              <h3 style={{ marginTop: 0 }}>{seal.label}</h3>
              <p className="fox-trail-copy">{seal.clue}</p>
              <select
                className="fox-trail-select"
                value={choices[seal.id]}
                onChange={(event) => handleSealChange(seal.id, event.target.value)}
              >
                <option value="">Choose</option>
                {seal.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="fox-trail-panel">
        <p className="fox-trail-copy fox-trail-glow-accent">
          The vault listens to the same story in four parts.
          Creature, heat, moon-fur, and home.
        </p>
        <div className="fox-trail-button-row">
          <button className="fox-trail-button" type="button" onClick={handleSubmit}>
            awaken the vault
          </button>
        </div>

        {submissionState === 'correct' && (
          <div className="fox-trail-status" style={{ marginTop: 16 }}>
            The grand lock opens.
          </div>
        )}

        {submissionState === 'incorrect' && (
          <div className="fox-trail-status" style={{ marginTop: 16, background: 'rgba(255, 116, 116, 0.1)', borderColor: 'rgba(255, 116, 116, 0.2)', color: '#ffe1e1' }}>
            The vault still resists.
          </div>
        )}
      </div>
    </div>
  )
}
