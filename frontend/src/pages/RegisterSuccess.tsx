  import React from "react";
  import { Link } from "react-router-dom";
  const RegisterSuccess = () => (
    <div className="flex w-full justify-center pt-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 " >
           ✅ User Registered Successfully, go to <Link to="/login" className="underline text-cyan-500">Login</Link>
        </div>
    </div>

)
export default RegisterSuccess
