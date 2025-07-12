import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OTPVerificationPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setIsResendDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (index:number, value:any) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus to next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index:number, e:any) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
    setIsResendDisabled(true);
    setError('');
    // Add your resend OTP logic here
    console.log('Resending OTP...');
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    
    // Add your verification logic here
    console.log('Verifying OTP:', enteredOtp);
    // On successful verification:
    // navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
            <p className="text-gray-600 mt-2">We've sent a 6-digit code to your email</p>
            <p className="font-medium text-blue-600 mt-1">user@codequest.com</p>
          </div>

          <div className="flex justify-between mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={(e) => e.target.select()}
                className="w-12 h-16 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <div className="text-center mb-6">
            {isResendDisabled ? (
              <p className="text-gray-600">Resend OTP in {timer} seconds</p>
            ) : (
              <button 
                onClick={handleResendOTP} 
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Resend OTP
              </button>
            )}
          </div>

          <div className="flex justify-between gap-4">
            <button 
              onClick={handleCancel}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleVerify}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerificationPage;