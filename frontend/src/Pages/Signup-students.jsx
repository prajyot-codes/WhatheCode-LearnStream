import React from 'react'
import { useRef,useEffect,useState } from 'react'
import Signup from '../components/Signup'

function SignupS() {
  return (
    <div className="flex items-center justify-center h-screen-1/2 p-32 bg-gray-100">
        <Signup verb="learning" />
    </div>
  )
}

export default SignupS