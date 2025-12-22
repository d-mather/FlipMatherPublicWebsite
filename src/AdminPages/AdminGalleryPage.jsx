import React, { useState } from 'react'
import AdminGalleryUpload from './AdminGalleryUpload'
import Gallery from '../OtherPages/Gallery'
import './AdminGalleryPage.css'

function AdminGalleryPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleImageAdded = () => {
    // Trigger gallery refresh by incrementing key
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="admin-gallery-page">
      <div className="admin-gallery-container">
        {/* Upload Section */}
        <section className="admin-section">
          <h1>Gallery Manager</h1>
          <AdminGalleryUpload onImageAdded={handleImageAdded} />
        </section>

        {/* Preview Section */}
        <section className="admin-section">
          <h2>Gallery Preview</h2>
          <Gallery key={refreshKey} />
        </section>
      </div>
    </div>
  )
}

export default AdminGalleryPage
