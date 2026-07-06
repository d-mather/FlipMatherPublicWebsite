import { Link } from 'react-router-dom'

export default function FoxTrailStepIntro({ nextHref, onSolve }) {
  return (
    <section style={{ textAlign: 'center', padding: '2rem' }}>
      <p>psst, hey you, Fox...</p>
      <p>It's for you...</p>
      <p>
        Click below, go on, it won't hurt, I promise. Just follow the trail and you'll find your way to the den. 
      </p>
      <p>
        Do it. <br /> Ok how bout we BOTH do it?
      </p>
      <Link to={nextHref} onClick={onSolve}>definitely harmless</Link>
    </section>
  )
}
