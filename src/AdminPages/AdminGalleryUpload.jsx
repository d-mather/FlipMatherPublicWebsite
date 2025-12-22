import React, { useState } from 'react'
import useApi from '../hooks/useApi'
import './AdminGalleryUpload.css'

const AdminGalleryUpload = ({ onImageAdded }) => {
  const { api } = useApi()
  const [formData, setFormData] = useState({
    title: '',
    cloudinary_public_id: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!formData.title.trim() || !formData.cloudinary_public_id.trim()) {
      setError('Title and Cloudinary Public ID are required')
      return
    }

    try {
      setLoading(true)
      await api('/gallery', {
        method: 'POST',
        body: {
          title: formData.title.trim(),
          cloudinary_public_id: formData.cloudinary_public_id.trim(),
          description: formData.description.trim()
        }
      })

      setSuccess(true)
      setFormData({
        title: '',
        cloudinary_public_id: '',
        description: ''
      })

      // Call callback to refresh parent component
      onImageAdded?.()

      // Auto-clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Failed to add image:', err)
      setError(err.message || 'Failed to add image to gallery')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-gallery-upload">
      <div className="upload-card">
        <h2>Add Image to Gallery</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Image Title *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Umfana close up"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cloudinary_public_id">
              Cloudinary Public ID *
              <span className="help-text">
                Find this in the Cloudinary Media Library under the image details
              </span>
            </label>
            <input
              id="cloudinary_public_id"
              type="text"
              name="cloudinary_public_id"
              value={formData.cloudinary_public_id}
              onChange={handleChange}
              placeholder="e.g., umfana-close-up"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a description for this image..."
              rows="3"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="alert alert-error">
              <strong>Error:</strong> {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              ✓ Image added to gallery successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Adding...' : 'Add to Gallery'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminGalleryUpload
