// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import useAuth from "../../hooks/useAuth"

export default function SignUpGiveawayCard({ onSignUp }) {
    const { isUserLoggedIn } = useAuth()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-sm w-full mx-auto"
    >
        <div style={{ padding: 8 }}>
          <h2 style={{ marginTop: 3 }}>🎉 Giveaway Alert!</h2>
          <p className="text-base text-gray-700">
            The <span className="font-semibold">first 100 users</span> to sign up will be entered
            into a raffle to win <span className="font-bold text-green-600">R1000</span>!
          </p>
          <p className="text-sm text-gray-500">Don't miss out - join now!</p>
          {!isUserLoggedIn ? <button
            onClick={onSignUp}
            className="w-full rounded-xl py-6 text-lg shadow-md">
            Sign Up
          </button> : <p style={{ color: 'green', fontWeight: 'bold', marginBottom: 5 }}>✔ Entered</p>}
        </div>
    </motion.div>
  )
}
