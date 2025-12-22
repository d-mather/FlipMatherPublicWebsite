import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import useDarkMode from '../../hooks/useDarkMode';

const HomeCard = ({ onClick, pictureId, title, firstText, secondText, buttonText }) => {
  const isDarkMode = useDarkMode()
  const cld = new Cloudinary({ cloud: { cloudName: 'dhoat9x2c' } })

  const createOptimizedImage = (publicId) => {
    return cld
      .image(publicId)
      .format('auto')
      .quality('auto')
      .resize(auto().gravity(autoGravity()))
  }

  const cardStyle = {
    cursor: 'help',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }

  const imageWrapperStyle = {
    width: '100%',
    height: '250px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '10px',
    marginBottom: '15px'
  }

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0
  }

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '15px',
    borderRadius: '10px'
  }

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
  }

  const descStyle = {
    fontSize: '0.9rem',
    color: '#ffffff',
    lineHeight: '1.4',
    textShadow: '0 1px 3px rgba(0,0,0,0.5)'
  }

  const ctaStyle = {
    padding: '10px 15px',
    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
    border: '1px solid ' + (isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'),
    borderRadius: '8px',
    color: isDarkMode ? '#f5f5f5' : '#222',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'center'
  }

  return (
    <div style={cardStyle}>
      <div style={imageWrapperStyle}>
        <AdvancedImage 
          cldImg={createOptimizedImage(pictureId)}
          alt={title}
          style={imageStyle}
        />
        <div style={overlayStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <p style={descStyle}>
            {firstText}
            <br />
            {secondText}
          </p>
        </div>
      </div>
      <button onClick={onClick} style={ctaStyle}>{buttonText}</button>
    </div>
  )
}

export default HomeCard
