import BackgroundWrapper from "../components/BackgroundWrapper";
import Component from "../components/login-form";
import React from 'react'


function LoginT() {
  return (
    <BackgroundWrapper>
    <Component role={"teacher"} url="../../public/assets/images.jpeg"/>
    </BackgroundWrapper>
  )
}

export default LoginT