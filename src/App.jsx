import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'
import useAuth from './hooks/useAuth.js'
import AdminRoute from './hooks/AdminRoute.jsx'

const Home              = lazy(() => import('./Home/Home.jsx'))
const Holding           = lazy(() => import('./Home/Holding.jsx'))
const SignUp            = lazy(() => import('./Accounts/SignUp.jsx'))
const VerifyEmail       = lazy(() => import('./Accounts/VerifyEmail.jsx'))
const ForgotPassword    = lazy(() => import('./Accounts/ForgotPassword.jsx'))
const ResetPassword     = lazy(() => import('./Accounts/ResetPassword.jsx'))
const Login             = lazy(() => import('./Accounts/Login.jsx'))
// const Leilah        = lazy(() => import('./OtherPages/Leilah.jsx'))
const AdminUsers        = lazy(() => import('./AdminPages/AdminUsers.jsx'))
const AdminSponsors     = lazy(() => import('./AdminPages/AdminSponsors.jsx'))
const AdminGalleryPage  = lazy(() => import('./AdminPages/AdminGalleryPage.jsx'))
const AdvisorPage       = lazy(() => import('./OtherPages/Advisor.jsx'))
const TrainerPage       = lazy(() => import('./OtherPages/Trainer.jsx'))
const APIPlay           = lazy(() => import('./OtherPages/ApiPlayground.jsx'))
const SponsorPage       = lazy(() => import('./OtherPages/Sponsor.jsx'))
const ThankYouPage      = lazy(() => import('./OtherPages/ThankYou.jsx'))
const GalleryPage       = lazy(() => import('./OtherPages/Gallery.jsx'))
const FireShowPage      = lazy(() => import('./OtherPages/FireShow.jsx'))
const EggsPage          = lazy(() => import('./OtherPages/eggs.jsx'))
const NotFound          = lazy(() => import('./OtherPages/NotFound.jsx'))
const BetSoftwareCoverLetter    = lazy(() => import('./OtherPages/BetSoftwareCoverLetter.jsx'))

const HIDE_HEADER_ROUTES = [
  "/eric",
  "/mackie",
  "/ApiPlayground",
  "/BetSoftwareCoverLetter"
]

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isUserLoggedIn, isUserAdmin, logout, user } = useAuth()
  const hideHeader = HIDE_HEADER_ROUTES.includes(location.pathname)
  const isOnHomePage = location.pathname === "/" || location.pathname === "/home"

  return (
    <>
    {!hideHeader && (
      <>
        <header className="header">
          <Link to="/" className='logo-link'>
            <picture>
                <source srcSet="/assets/logos/WhiteOnTransparentFM.svg" media="(prefers-color-scheme: dark)" />
                <img
                  className="header-logo"
                  src="/assets/logos/BlackOnTransparentFM.svg"
                  alt="FM logo"
                />
            </picture>
          </Link>
          <div style={{ float: 'right', display: 'flex', gap: '1rem', marginRight: '1rem' }}>
            {isUserAdmin && (
              <>
                <Link className="header-link admin-header-link" to="/admin/sponsors">Sponsors</Link>
                <Link className="header-link admin-header-link" to="/admin/users">Users</Link>
              </>
            )}
            <Link className="header-link" to="/sponsor">SPONSOR</Link>
            {isUserLoggedIn ? (
                <a className="header-link" onClick={() => logout() && navigate("/home", { replace: true })}>Logout</a>
              ) : <>
                    <a className="header-link" onClick={() => navigate("/login", { state: { from: location } })}>Login</a>
                    <Link className="header-link" to="/signup">Sign Up</Link>
                  </>
            }
          </div>
        </header>
        {!isOnHomePage && <a className='back-button' onClick={() => navigate(-1)}>⮜ Back</a>}
      </>
    )}
    {/* routes */}
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/holding" element={<Holding />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sponsor" element={<SponsorPage />} />
        <Route path="/fireshow" element={<FireShowPage />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/eggs" element={<EggsPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Admin routes */}
        <Route 
          path="/admin/users" 
          element={
            <AdminRoute user={user}>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route 
          path="/admin/sponsors" 
          element={
            <AdminRoute user={user}>
              <AdminSponsors />
            </AdminRoute>
          }
          />
          <Route 
            path="/admin/gallery" 
            element={
              <AdminRoute user={user}>
                <AdminGalleryPage />
              </AdminRoute>
            }
          />
        
        {/* header not shown for these routes */}
        <Route path="/eric" element={<AdvisorPage />} />
        <Route path="/mackie" element={<TrainerPage />} />
        <Route path="/ApiPlayground" element={<APIPlay />} />
        <Route path="/BetSoftwareCoverLetter" element={<BetSoftwareCoverLetter />} />
      </Routes>
    </Suspense>
    </>
  )
}

export default App
