import { Box, Dialog, List, ListItem, styled, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { qrCodeImage } from '../../constants/data';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import { AccountContext } from '../../context/AccountProvider';
import { addUser } from '../../service/api';

const Component = styled(Box)`
  display: flex;

`

const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`

const QRCode = styled('img')({
  height: 264,
  width: 264,
  margin: '50px 0 0 50px',
})

const Title = styled(Typography)`
  font-size: 26px;
  color: #525252;
  font-weight: 300;
  font-famliy: inherit;
  margin-bottom: 25px;
`

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    line-height: 20px;
    color: #4a4a4a;

  }
`

const dialogStyle = {
  height: '90%',
  marginTop: '12%',
  width: '60%',
  maxWidth: '100%',
  maxHeight: '100%',
  boxShadow: 'none',
  overflow: 'hidden'
}

function LoginDialog() {

  const {setAccount}  = useContext(AccountContext);
  
  const onLoginSuccess = async (res) => {
    const decoded = jwt_decode(res.credential);
    // console.log(decoded);
    setAccount(decoded);
    await addUser(decoded);
  }

  const onLoginError = () => {
    return
  }
  
  return (
    <Dialog
      open={true}
      PaperProps={{ sx: dialogStyle}}
      hideBackdrop={true}
    >
      <Component>
        <Container>
          <Title>To use WhatsApp in your computer:</Title>
          <StyledList>
            <ListItem>1. Open WhatsApp on your system.</ListItem>
            <ListItem>2. Tap <b>&nbsp; Menu </b>&nbsp; or <b>&nbsp; Settings </b> &nbsp;and select <b>&nbsp;WhatsApp web</b></ListItem>
            <ListItem>3. Point your phone to this screen to capture the code</ListItem>
          </StyledList>
        </Container>
        <Box style={{ position: 'relative'}}>
          <QRCode src={qrCodeImage} alt="qr code" />
          <Box style={{ position: 'absolute', top: '50%', transform: "translateX(25%)"}}>
            <GoogleLogin
              onSuccess={onLoginSuccess}
              onError={onLoginError}
            />
          </Box>
        </Box>
      </Component>
    </Dialog>
  )
};

export default LoginDialog;