import { motion } from 'motion/react'

const vaultCards = [
  {
    title: 'Clever fox',
    text: 'I told you... you\'re so clever. (I knew it all along)'
  },
  {
    title: 'Strong fox',
    text: 'Wow, those muscles speak for themselves (ง°ل͜ ͡°)ง'
  },
  {
    title: 'Creative fox',
    text: 'Creative... *but chooses to play in survival mode*'
  },
  {
    title: 'Fun fox',
    text: 'I always love vloging with you'
  },
  {
    title: 'Chosen fox',
    text: 'You\'re chosen and loved by Jesus. #winning'
  }
]

// const strengths = [
//   'I love that you\'re so clever (literally). <a href="https://youtu.be/hpDQ9J6ChgI?si=Y6n2xe4lLYhE3Jnh" target="_blank" rel="noopener noreferrer">Link</a>',
//   'I love that you\'re so strong (literally). <a href="https://youtu.be/a6OGYX0HnF4?si=vPcDTqhM4gEWldQa" target="_blank" rel="noopener noreferrer">Link</a>',
//   'I love that you\'re on my wavelength. We GET each other. <a href="https://www.youtube.com/watch?v=uSChVd3yQ_A" target="_blank" rel="noopener noreferrer">Link</a>',
//   'I love that you always make the RIGHT decision instead of the EASY decision. (except with boundaries xD). <a href="https://youtu.be/RNsug2FIkHk?si=aYM2xf8QESDaoCDu" target="_blank" rel="noopener noreferrer">Link</a>',
//   'I love everything about you, but mainly 2 things. <a href="https://youtu.be/oEeDaOPU4N8?si=exvmqBna7gB9ySLM" target="_blank" rel="noopener noreferrer">Link</a>'
// ]
const strengths = [
  <>I love that you&apos;re so clever (literally). <a href="https://youtu.be/hpDQ9J6ChgI?si=Y6n2xe4lLYhE3Jnh" target="_blank" rel="noopener noreferrer">Link</a></>,
  <>I love that you&apos;re so strong (literally). <a href="https://youtu.be/a6OGYX0HnF4?si=vPcDTqhM4gEWldQa" target="_blank" rel="noopener noreferrer">Link</a></>,
  <>I love that you&apos;re on my wavelength. We GET each other. <a href="https://www.youtube.com/watch?v=uSChVd3yQ_A" target="_blank" rel="noopener noreferrer">Link</a></>,
  <>I love that you always make the RIGHT decision instead of the EASY decision. (except with boundaries xD). <a href="https://youtu.be/RNsug2FIkHk?si=aYM2xf8QESDaoCDu" target="_blank" rel="noopener noreferrer">Link</a></>,
  <>I love everything about you, but mainly 2 things. <a href="https://youtu.be/oEeDaOPU4N8?si=exvmqBna7gB9ySLM" target="_blank" rel="noopener noreferrer">Link</a></>
];


export default function FoxTrailStepLetter() {
  return (
    <div className="fox-trail-step fox-trail-letter">
      <div className="fox-trail-panel">
        <p className="fox-trail-copy fox-trail-glow-accent" style={{ marginBottom: 16 }}>
          What the vault was hiding:
        </p>
        <div className="fox-trail-vault-grid-5">
          {vaultCards.map((card) => (
            <div key={card.title} className="fox-trail-card-mini">
              <h3 style={{ marginTop: 0 }}>{card.title}</h3>
              <p className="fox-trail-copy">{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="fox-trail-letter-paper"
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <p style={{ marginTop: 0, fontWeight: 700 }}>Hey Jason Timothy Mather,</p>

        <p>
          Happy Birthday! <br />
          BTW this is <b>not</b> AI, this is Leilah and I's genuine words - hopefully you can tell...<br/>
        </p>

        <p>Five things we love about you (since Alexa asked us to... now we have to):</p>
        <ol className="fox-trail-list">
          {strengths.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
          
        <p>I'll wait for you here while you listen to all those links to completion each...</p>

        <p>
          oh ok den.
        </p>

        <p style={{ marginBottom: 0 }}>
          With lots of love,
          <br />
          Dillon & Leilah-Jade Mather (aka The ones that'll always love you the most)
        </p>
      </motion.div>
    </div>
  )
}
