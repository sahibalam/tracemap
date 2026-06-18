// // frontend/src/pages/EmailVerificationHandler.jsx
// import { useEffect, useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { applyActionCode, auth } from '../firebase/config'

// export function EmailVerificationHandler() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [status, setStatus] = useState('verifying')
//   const [message, setMessage] = useState('')

//   useEffect(() => {
//     const verifyEmail = async () => {

//       try {
    
//         const queryParams =
//           new URLSearchParams(location.search)
    
//         const token =
//           queryParams.get('token')
    
//         const response =
//           await fetch(
//            `https://tradesmap.com/api/auth/verify-email?token=${token}`
//            //`http://localhost:5001/api/auth/verify-email?token=${token}`
//           )
    
//         const data =
//           await response.json()
    
//         if (!data.success) {
//           throw new Error(data.message)
//         }
    
//         setStatus('success')
    
//         setMessage(
//           'Email verified successfully!'
//         )
    
//         const pendingEmail =
//           localStorage.getItem('pendingEmail')
    
//         const pendingPhone =
//           localStorage.getItem('pendingPhoneNumber')
    
//         setTimeout(() => {
    
//           navigate('/verify', {
//             state: {
//               email: pendingEmail,
//               phoneNumber: pendingPhone,
//               emailVerified: true
//             }
//           })
    
//         }, 2000)
    
//       } catch (error) {
    
//         setStatus('error')
    
//         setMessage(
//           error.message
//         )
    
//       }
    
//     }
  
//     verifyEmail()
//   }, [location, navigate])

//   return (
//     <div className="authPage">
//       <div className="bg bgAuth" />
//       <div className="bgOverlay" />
//       <main className="authMain">
//         <div className="authCard authCardCompact" style={{ textAlign: 'center', padding: '40px' }}>
//           {status === 'verifying' && (
//             <>
//               <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
//               <h2>Verifying your email...</h2>
//               <p>Please wait while we verify your email address.</p>
//             </>
//           )}
//           {status === 'success' && (
//             <>
//               <div style={{ fontSize: '48px', marginBottom: '20px', color: '#2fb463' }}>✓</div>
//               <h2 style={{ color: '#2fb463' }}>Email Verified Successfully!</h2>
//               <p>{message}</p>
//             </>
//           )}
//           {status === 'error' && (
//             <>
//               <div style={{ fontSize: '48px', marginBottom: '20px', color: '#e11d48' }}>✗</div>
//               <h2 style={{ color: '#e11d48' }}>Verification Failed</h2>
//               <p>{message}</p>
//               <button 
//                 onClick={() => navigate('/register')}
//                 style={{ marginTop: '20px', padding: '10px 20px', background: '#0f4ea9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
//               >
//                 Back to Registration
//               </button>
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }




import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function EmailVerificationHandler() {
  const navigate = useNavigate()
  const location = useLocation()

  const [status, setStatus] = useState('verifying')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const queryParams = new URLSearchParams(location.search)

        const token = queryParams.get('token')

        if (!token) {
          throw new Error('Verification token missing')
        }

        const response = await fetch(
          `https://tradesmap.com/api/auth/verify-email?token=${token}`
        )

        const data = await response.json()

        if (!data.success) {
          throw new Error(
            data.message || 'Email verification failed'
          )
        }

        const pendingEmail =
          localStorage.getItem('pendingEmail')

        const pendingPhone =
          localStorage.getItem('pendingPhoneNumber')

        localStorage.setItem(
          'emailVerified',
          'true'
        )

        navigate('/verify', {
          replace: true,
          state: {
            email: pendingEmail,
            phoneNumber: pendingPhone,
            emailVerified: true
          }
        })
      } catch (error) {
        setStatus('error')

        setMessage(
          error.message ||
            'Something went wrong while verifying email'
        )
      }
    }

    verifyEmail()
  }, [location, navigate])

  if (status === 'verifying') {
    return (
      <div className="authPage">
        <div className="bg bgAuth" />
        <div className="bgOverlay" />

        <main className="authMain">
          <div
            className="authCard authCardCompact"
            style={{
              textAlign: 'center',
              padding: '40px'
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}
            >
              ⏳
            </div>

            <h2>Verifying your email...</h2>

            <p>
              Please wait while we verify your email
              address.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="authPage">
      <div className="bg bgAuth" />
      <div className="bgOverlay" />

      <main className="authMain">
        <div
          className="authCard authCardCompact"
          style={{
            textAlign: 'center',
            padding: '40px'
          }}
        >
          <div
            style={{
              fontSize: '48px',
              marginBottom: '20px',
              color: '#e11d48'
            }}
          >
            ✗
          </div>

          <h2 style={{ color: '#e11d48' }}>
            Verification Failed
          </h2>

          <p>{message}</p>

          <button
            onClick={() => navigate('/register')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#0f4ea9',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Back to Registration
          </button>
        </div>
      </main>
    </div>
  )
}