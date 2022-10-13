import React from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import NavBar from '../Components/NavBar';

const LoginPage = (props) => {
  const githubAuth = () => {
    window.open('/auth/github', '_self');
  };

  return (
    <div>
      <NavBar />,
      <Box display="flex" marginTop="20%" paddingBottom="22%" justifyContent="center">
        <Button className="login-button" onClick={githubAuth}>
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="Github Logo"
          />
          Login with Github
        </Button>
      </Box>
    </div>
  );
};

export default LoginPage;
