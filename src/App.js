import React from 'react';
import Messenger from './components/Messenger';

import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider';

const App = () => {

  const clientId = '939797144543-jlm95db121duiqrbce95o1gmcc56o060.apps.googleusercontent.com'

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger/>
      </AccountProvider>
    </GoogleOAuthProvider>
  )
}

export default App