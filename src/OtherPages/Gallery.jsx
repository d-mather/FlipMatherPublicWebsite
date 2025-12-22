import React, { useState, useEffect } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'
// import { fill } from '@cloudinary/url-gen/actions/resize'
import useAuth from '../hooks/useAuth'
import useApi from '../hooks/useApi'
import './Gallery.css'
import { Link } from 'react-router-dom'

const Gallery = () => {
  const { isUserAdmin } = useAuth()
  const { api } = useApi()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const isOnAdminPage = window.location.pathname.includes('/admin')
  const cld = new Cloudinary({ cloud: { cloudName: 'dhoat9x2c' } })

  const fetchGalleryImages = async () => {
    try {
      setLoading(true)
      const response = await api('/gallery', { method: 'GET' })
      if (response.data) {
        setImages(response.data?.data || [])
      }
    } catch (error) {
      console.error('Failed to load gallery:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchGalleryImages()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?') || !isUserAdmin) {
      return
    }

    try {
      setDeleting(imageId)
      await api(`/gallery?id=${imageId}`, { method: 'DELETE' })
      setImages(images.filter(img => img.id !== imageId))
    } catch (error) {
      console.error('Failed to delete image:', error)
    } finally {
      setDeleting(null)
    }
  }

  const createOptimizedImage = (publicId) => {
    return cld
      .image(publicId)
      .format('auto')
    //   .resize(fill().width(800))
      .quality('auto:good')
  }

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null)
    }
  }

  const handleModalMouseEvent = (e) => {
    // Prevent any mouse events from reaching elements behind the modal
    e.stopPropagation()
  }

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    if (selectedImage) {
      window.addEventListener('keydown', handleEscKey)
      return () => window.removeEventListener('keydown', handleEscKey)
    }
  }, [selectedImage])

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="gallery-loading">Loading gallery...</div>
      </div>
    )
  }

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Photography Gallery</h1>
        {isUserAdmin && (isOnAdminPage ? <Link to="/gallery">Go to Gallery</Link> : <Link to="/admin/gallery">Go to Gallery Manager</Link>)}
        <p className="gallery-note">
            Photography and Videography for any event or purpose can be booked by emailing flipmather@gmail.com
            <br />
            Parties • Portraits • Business • Proposals & Engagements • Promotions • Events • More
        </p>
      </div>

      {images.length === 0 ? (
        <div className="gallery-empty">
          <p>No images in gallery yet.</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => handleImageClick(image)}
            >
              <div className="gallery-image-wrapper">
                <AdvancedImage 
                  cldImg={createOptimizedImage(image.cloudinary_public_id)}
                  alt={image.title}
                />
              </div>
              {image.title && (
                <div className="gallery-item-title">
                  <h3>{image.title}</h3>
                </div>
              )}
              {isUserAdmin && (
                <button
                  className="gallery-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteImage(image.id)
                  }}
                  disabled={deleting === image.id}
                  title="Delete image"
                >
                  {deleting === image.id ? '...' : '✕'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div 
          className="gallery-modal" 
          onClick={closeModal}
          onMouseDown={handleModalMouseEvent}
          onMouseUp={handleModalMouseEvent}
          onMouseMove={handleModalMouseEvent}
          onPointerDown={handleModalMouseEvent}
          onPointerUp={handleModalMouseEvent}
          onPointerMove={handleModalMouseEvent}
          style={{ pointerEvents: 'auto' }}
        >
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="gallery-modal-close"
              onClick={() => setSelectedImage(null)}
              title="Close"
            >
              ✕
            </button>
            <div className="gallery-modal-image">
              <AdvancedImage 
                cldImg={createOptimizedImage(selectedImage.cloudinary_public_id)}
                alt={selectedImage.title}
                responsive
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="gallery-modal-info">
              {selectedImage.title && <h2>{selectedImage.title}</h2>}
              {selectedImage.description && <p>{selectedImage.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
