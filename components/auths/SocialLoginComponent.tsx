'use client'

import React from 'react'
import GoogleButton from './GoogleButton';
// import GitHubButton from './GitHubButton';
// import MicrosoftButton from './MicrosoftButton';
// import AppleButton from './AppleButton';
import { useSelector } from 'react-redux';
import { localStateType } from '@/types/localType';

const SocialLoginComponent = () => {

  const disableOtherLoginOptions = useSelector((state:localStateType) => state.localState.disableOtherLoginOptions);

  return (
    <div className="grid gap-4">
      <GoogleButton disableButton={disableOtherLoginOptions} />
      {/* <GitHubButton disableButton={disableOtherLoginOptions}/>
      <MicrosoftButton disableButton={disableOtherLoginOptions}/>
      <AppleButton disableButton={disableOtherLoginOptions}/> */}
    </div>
  );
}

export default SocialLoginComponent
