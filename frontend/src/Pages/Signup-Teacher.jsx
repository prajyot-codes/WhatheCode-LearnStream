import React from 'react'
import { useRef,useEffect,useState } from 'react'
import Signup from '../components/Signup'

function SignupT() {
  return (
    <div className="flex items-center justify-center h-screen-1/2 p-32 bg-gray-100">
        <Signup verb="teaching" role="teacher" />
    </div>
  )
}

export default SignupT