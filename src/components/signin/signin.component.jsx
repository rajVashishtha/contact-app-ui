import React from 'react'
import './signin.style.scss'
import { Typography, InputAdornment, IconButton } from '@material-ui/core';
import InputTextField from '../textfield/textfield.component';
import {VisibilityOffOutlined, VisibilityOutlined} from '@material-ui/icons/'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import MaterialButton from '../button/button.component';
import {setCurrentUser} from '../../redux/user/user.action';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class SignIn extends React.Component{
    state={
        showPassword:false,
        email_phone:"",
        password:"",
        wrongPassword:false,
        noEmail:false
    }
    handleClickShowPassword=()=>{
        this.setState({
            showPassword:!this.state.showPassword
        })
    }
    

    handleSubmit = async ()=>{
      const {setCurrentUser,history} = this.props;
      const {email_phone, password} = this.state
      if(email_phone === "" || password === ""){
          this.setState({
            noEmail:true
          })
          return
      }
      const requestOptions = {
        method: 'POST',
        mode:'cors',
        headers: { 
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'X-Custom-Header',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email_phone, password})
    };//requestOptions
    const response = await fetch('http://localhost:5000/users/login', requestOptions)
    const result = await response.json()
    if(result.user === null){
        this.setState({
          wrongPassword:result.incorrectPassword,
          noEmail:result.noEmail
        })
    }else{
      setCurrentUser(result.user[0])
      this.handleReset()
      history.push("/contacts/all")
    }
      
    }
    handleChange = (event)=>{
      const {name, value} = event.target
      this.setState({
        [name]:value
      })
    }
    handleReset = ()=>{
      this.setState({
        email_phone:"",
        password:""
      })
    }
    render(){
        return(
            <div className="signin-form-div">
                <form className="signin-form" noValidate autoComplete="off">
                <Typography variant="h6" component="h1" align="center" style={{color:"white"}}> Login with us </Typography>
                    <InputTextField
                    InputProps={{
                        endAdornment:(
                          <InputAdornment position="end">
                            <IconButton style={{cursor:"text"}} disableFocusRipple={true} focusRipple={false} disableTouchRipple={true} disableRipple={true}>
                                <EmailOutlinedIcon />
                            </IconButton>
                          </InputAdornment>
                              )
                      }}
                    type="text"
                    name="email_phone"
                    label="Email or Phone"
                    value={this.state.email_phone}
                    onChange={this.handleChange}
                    variant="outlined" width="280px" icon={null} />
                    <InputTextField
                    InputProps={{
                        endAdornment:(
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                            >
                              {this.state.showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                            </IconButton>
                          </InputAdornment>
                              )
                      }}
                    type={this.state.showPassword ? "text" : "password"}
                    value={this.state.password}
                    onChange={this.handleChange}
                    name="password"
                    label="Password" variant="outlined" width="280px" icon={null} />
                    {
                      this.state.wrongPassword?(<Typography variant="subtitle1" style={{color:"black",textAlign:"center"}} >Incorrect Password</Typography>):(null)
                    }
                    {
                      this.state.noEmail?(<Typography variant="subtitle1" style={{color:"black",textAlign:"center"}} >Wrong Details</Typography>):(null)
                    }
                    <div style={{
                      display:"flex",
                      flexDirection:"row",
                      justifyContent:"center"
                    }}>
                      <MaterialButton text="Login" variant="contained" onClick={this.handleSubmit}  />
                      <span>
                         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      </span>
                      <MaterialButton text="Reset" variant="outlined" onClick={this.handleReset}  />
                    </div>

                </form>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default withRouter(connect(null,mapDispatchToProps)(SignIn))