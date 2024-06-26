import React, { useState,useContext } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
 
  TextField,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import MyContext from '../context/MyContext';
const styles = {
  mainBox: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
ContentBox: {
    maxWidth: 400,
    padding: 3,
    boxShadow: 3,
    borderRadius: 2,
    backgroundColor: '#fff',
  
  },
};

function Login({ setShowLogin }) {
  const [currentState, setCurrentState] = useState("sign up");
const {url ,setToken}=useContext(MyContext)  ;

  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  const onchangeHandler=(event)=>{
    const name = event.target.name;
    const value= event.target.value;
    setData(data=>({...data,[name]:value}))
  }
    const onLogin =  async(event)=>{
      event.preventDefault()
      let newUrl=url;
      if (currentState==="Login") {
        newUrl +="/api/user/login"
      }
      else{
        newUrl +="/api/user/register"

      }
      const response =await axios.post(newUrl,data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }

   

  return (
    <Box sx={styles.mainBox}>
      <Box sx={styles.ContentBox}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">{currentState === "sign up" ? "Sign Up" : "Login"}</Typography>
          <IconButton onClick={() => setShowLogin(false)}>
            <CloseIcon/>
          </IconButton>
        </Box>
        <Box component="form" onSubmit={onLogin}>
          <FormControl fullWidth margin="normal"  >
            {currentState === "sign up" && (
              <TextField
                label="Your Name"
                variant="outlined"
                type='text'
                name='name' 
                onChange={onchangeHandler}
                value={data.name}
                required
              />
            )}
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Your Email"
              type="email"
              variant="outlined"
              name='email'
              onChange={onchangeHandler}
              value={data.email}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Enter Password"
              type="password"
              variant="outlined"
              name='password'
              value={data.password}
              onChange={onchangeHandler}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Button variant="contained" color="primary" type="submit">
              {currentState === "sign up" ? "Create Account" : "Login"}
            </Button>
          </FormControl>
          <FormControl margin="normal">
            <FormControlLabel
              control={<Checkbox required />}
              label="I agree to the terms of use & privacy policy."
            />
          </FormControl>
          <Typography variant="body2" align="center">
            {currentState === "Login" ? (
              <span>
                Create a new account?{' '}
                <Typography
                  component="span"
                  color="primary"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setCurrentState("sign up")}
                >
                  Click here
                </Typography>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <Typography
                  component="span"
                  color="primary"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setCurrentState("Login")}
                >
                  Login here
                </Typography>
              </span>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;

