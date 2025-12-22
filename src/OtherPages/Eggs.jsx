import { useEffect, useState } from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import useApi from '../hooks/useApi'
import GlassPaper from '../components/GlassPaper'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const styles = {
  card: {
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    maxWidth: '420px',
    height: 'auto',
    borderRadius: '16px'
  },
  heading: {
    fontSize: '30px',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#0548b2'
  },
  subHeading: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '16px'
  },
  text: {
    marginBottom: '12px',
    lineHeight: 1.5
  },
  list: {
    paddingLeft: '18px',
    marginBottom: '0'
  },
  form: {
    display: 'grid',
    gap: '12px'
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px'
  },
  textarea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    resize: 'vertical'
  },
  button: {
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: '14px',
    cursor: 'pointer'
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  }
}

function EggOrderPage() {
    const { api } = useApi()
    const { user } = useAuth()
    const navigate = useNavigate()

    const cld = new Cloudinary({
        cloud: { cloudName: 'dhoat9x2c' }
    })

    const createOptimizedImage = (publicId) => {
        return cld.image(publicId).quality('auto').format('auto')
    }

    const emptyForm = {
        name: user?.first_name || '',
        phone: '',
        quantity: '',
        notes: ''
    }

    const [form, setForm] = useState(emptyForm)

    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    
    useEffect(() => {
    window.scrollTo(0, 0)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { data } = await api('/egg-order', {
        method: 'POST',
        body: {
          ...form
        }
      })

      console.log(data)
      if (data?.success) {
        setSubmitted(true)
        setForm(emptyForm)
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
        <GlassPaper size="small">
            <h1 style={{ color: 'green' }}>Order Received!</h1>
            <h3>We will be in touch shortly to confirm availability and delivery.</h3>
            <p>Please consider sponsoring Flip Mather vlogs:</p>
            <button onClick={() => navigate("/sponsor")}>
                Sponsor
            </button>
        </GlassPaper>
    )
  }

  return (
    <GlassPaper size="small">
      <section style={styles.card}>
        <h1 style={styles.heading}>Elli's Eggcellent Eggs</h1>
        <AdvancedImage
          cldImg={createOptimizedImage('elli-eggs')}
          alt="Fresh eggs advert"
          style={styles.image}
        />

        <span style={styles.text}>
            <p>
                Fresh, local, home-grown chicken eggs available weekly.
                Orders are confirmed manually, subject to availability.
            </p>
            <h3 style={{ color: 'green', marginBottom: 0 }}>Only through THIS page can you get the cheapest deal!</h3> {' '}
            <span title={ 'Backstory: \nFlip Mather sold a PS4 Pro for Elli\'s eggs! \nNow you get to reap the rewards with him. \nWatch the vlog for more info.' }>
                <span style={{ textDecoration: 'underline', cursor: 'help', color: 'grey' }}>
                    Why so cheap?
                </span>
                <span style={{ cursor: 'help', color: 'grey' }}>
                {' '}(hover)
                </span>
            </span>
        </span>
        <h3 style={{ color: 'green', margin: 0 }}>Flip Mather Prices:</h3>
        <ul style={styles.list}>
          <li>Tray of <span style={{ color: 'green' }}>30</span> eggs -
            <span style={{ color: 'green' }}> R60</span> (6 free eggs) - Was <strike>R75</strike></li>
          <li>Tray of <span style={{ color: 'green' }}>18</span> eggs -
            <span style={{ color: 'green' }}> R37.50</span> (3 free eggs) - Was <strike>R45</strike></li>
          <li>Tray of <span style={{ color: 'green' }}>12</span> eggs -
            <span style={{ color: 'green' }}> R25</span> (2 free eggs) - Was <strike>R30</strike></li>
        </ul>
      </section>

      <section style={styles.card}>
        <h2 style={styles.subHeading}>Place an Order</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            style={styles.input}
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone number"
            required
            style={styles.input}
          />

          <select
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            style={styles.input}
            >
                <option value="" disabled>
                Select quantity
                </option>
                <option value="12 eggs for R25 (2 free eggs)">12 eggs - R25</option>
                <option value="18 eggs for R37.50 (3 free eggs)">18 eggs - R37.50</option>
                <option value="30 eggs for R60 (6 free eggs)">30 eggs - R60</option>
        </select>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Optional notes"
            rows={3}
            style={styles.textarea}
          />

          <button
            type="submit"
            disabled={submitting}
            style={{
              ...(submitting ? styles.buttonDisabled : null)
            }}
          >
            {submitting ? 'Sending...' : 'Submit Order'}
          </button>
        </form>
      </section>
    </GlassPaper>
  )
}

export default EggOrderPage
