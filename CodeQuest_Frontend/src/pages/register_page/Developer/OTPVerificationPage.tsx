import { useAuth } from '@/context/AuthProvider';
import  { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

function OTPVerificationPage() {
  const location = useLocation();
  var {otpcode, email} = location.state|| {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [isResendDisabled, setIsResendDisabled] = useState(true);  
  const [error, setError] = useState('');
  const navigate = useNavigate();
const {selectedRole} = useAuth()
  const [signupOTP, setSignupOTP] = useState(otpcode);

  useEffect(()=>{

    if(otpcode)
    setSignupOTP(otpcode)
  }, [])

 

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

  const handleResendOTP = async() => {
    setOtp(['', '', '', '', '', ''])
    const otpValue = Math.floor(100000 + Math.random() * 900000).toString()

 
     otpcode = {otpValue, generatedAt: Date.now()}

     setSignupOTP(otpcode)


    
    try {
       await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/resendCode`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({OTP:otpValue, Email:email})
      });

      // const resendOtpResponsejson = await resendOtpResponse.json()
   
    } catch (error) {
      console.log(error)
    }
 
     
    setTimer(59);
    setIsResendDisabled(true);
    setError('');
   
};


  const handleVerify = async () => {
    const enteredOtp = otp.join('');
   

    if (enteredOtp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }


      if(Date.now() > (signupOTP?.generatedAt+ 60000) ){
        toast.error('OTP has been expired please resend new OTP!')
        return;
      }

    if(signupOTP?.otpValue != enteredOtp){
      toast.error('Wrong OTP!')
      return;
    }
 
    
try {
   const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/verifyemail`,{

    method: 'POST',
    headers:{
       'Content-type': 'application/json'
    },
    body:JSON.stringify({Email:email})
   })

   const verifyResponse = await response.json()

if(verifyResponse.msg === 'Email verified successfully')
      {
        toast.success("Email verified successfully!")
        navigate(`/signin/${selectedRole}`)
      }
      else{
        toast.error("Invalid or Expired code!")
      }

} catch (error) {
  console.log(error)
}
};

  const handleCancel = () => {
    navigate('/');
  };


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
  }, [isResendDisabled]);


  return (
    <div className="flex items-center justify-center min-h-screen  p-4 bg-gradient-to-br from-blue-50 to-indigo-100 ">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden ">
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
            <p className="text-gray-600 mt-2">We've sent a 6-digit code to your email</p>
            <p className="font-medium text-black-600 mt-1">{email}</p>
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
                className="text-black-600 font-medium hover:text-blue-800 transition-colors"
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