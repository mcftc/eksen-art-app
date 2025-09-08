import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Eksenart - Premium Fuar Standı Tasarım ve Üretim'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              margin: 0,
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            EKSENART
          </h1>
          <p
            style={{
              fontSize: '32px',
              margin: 0,
              textAlign: 'center',
              opacity: 0.95,
            }}
          >
            Premium Fuar Standı Tasarım ve Üretim
          </p>
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginTop: '30px',
              fontSize: '24px',
              opacity: 0.9,
            }}
          >
            <span>✓ 15+ Yıl Deneyim</span>
            <span>✓ 500+ Proje</span>
            <span>✓ Ücretsiz 3D Tasarım</span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '40px',
              fontSize: '20px',
              opacity: 0.8,
            }}
          >
            <span>Ahşap Stand</span>
            <span>•</span>
            <span>Maxima Stand</span>
            <span>•</span>
            <span>Modüler Stand</span>
            <span>•</span>
            <span>Paket Stand</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}