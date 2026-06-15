import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import OtpInput from "react-otp-input"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { verifyLoginOtp } from "../services/operations/authAPI"

function VerifyOtp() {
  const [otp, setOtp] = useState("")
  const { loginData, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loginData?.email) {
      navigate("/login")
    }
  }, [loginData, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!loginData?.email || !otp) return

    dispatch(verifyLoginOtp(loginData.email, loginData.password, otp, navigate))
  }

  return (
    <main className="page-shell grid min-h-[calc(100vh-5rem)] place-items-center px-0 py-8 sm:py-12">
      {loading ? (
        <div className="spinner" aria-label="Loading" />
      ) : (
        <section className="form-shell w-11/12 max-w-[540px]">
          <p className="section-kicker mb-3">Verification</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[2.25rem] sm:leading-[2.75rem]">
            Verify your login
          </h1>
          <p className="my-4 text-base font-medium leading-7 text-slate-600 sm:text-[1.125rem] sm:leading-[1.75rem]">
            Enter the 6-digit code sent to {loginData?.email || "your email"} to finish signing in.
          </p>

          <form onSubmit={handleSubmit}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="aspect-square w-[44px] rounded-xl border border-slate-200 bg-white text-center text-lg font-bold text-slate-900 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:w-[52px] lg:w-[60px]"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 8px",
              }}
            />

            <button type="submit" className="btn-primary mt-8 min-h-[48px] w-full text-base font-bold">
              Verify OTP
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link
              to="/login"
              className="inline-flex items-center gap-x-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
              <BiArrowBack /> Back to Login
            </Link>
          </div>
        </section>
      )}
    </main>
  )
}

export default VerifyOtp