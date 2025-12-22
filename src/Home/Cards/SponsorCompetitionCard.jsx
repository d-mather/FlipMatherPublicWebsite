// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import useAuth from "../../hooks/useAuth"

export default function SponsorCompetitionCard({ onSponsor }) {
  const { isUserLoggedIn } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ top: -10, position: 'relative', paddingLeft: 5 }}>
        <h2>🎁 Surprise Competition!</h2>

        <p>
          The prize could be 
          <strong> anything</strong> - a cool gadget, a cash prize, or even a fun feature in a vlog!
        </p>

        <p>
          To enter, simply sponsor any amount to support the vlog.
        </p>

        {isUserLoggedIn ? (
          <p>
            <span style={{ color: 'green', fontWeight: 'bold' }}>✔ Logged in</span> - you'll receive an <strong>extra entry</strong>!
          </p>
        ) : (
            <p>Login for an extra entry when you enter</p>
        )}

        <button onClick={onSponsor}>
          Sponsor & Enter
        </button>
      </div>
    </motion.div>
  )
}
