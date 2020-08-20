import React from 'react'
import '../signin/signin.style.scss'
import { Typography, InputAdornment, IconButton } from '@material-ui/core';
import InputTextField from '../textfield/textfield.component';
import {VisibilityOffOutlined, VisibilityOutlined, PhoneAndroidOutlined, PersonOutline} from '@material-ui/icons/'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import MaterialButton from '../button/button.component';
import {setCurrentUser} from '../../redux/user/user.action';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class SignUp extends React.Component{
    state={
        showPassword:false,
        name:"",
        email:"",
        phone:"",
        password:"",
        wrongDetails:false,
        wrongDetailsText:"Incomplete Form"
    }
    handleClickShowPassword=()=>{
        this.setState({
            showPassword:!this.state.showPassword
        })
    }
    handleSubmit = async ()=>{
      const {setCurrentUser,history} = this.props;
      const {email,name,phone, password} = this.state
      if(name === "" || (email==="" && phone === "") || password === ""){
          this.setState({
            wrongDetails:true
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
        body: JSON.stringify({name, email, phone, password})
    };//requestOptions
    const response = await fetch('http://localhost:5000/users/signup', requestOptions)
    const result = await response.json()
    if(result.user === null){
        this.setState({
          wrongDetails:true,
          wrongDetailsText:result.message
        })
    }else{
      console.log(result.user)
      setCurrentUser(result.user)
      this.handleReset()
      history.push("/contacts/all")
    }
      
    }
    handleChange = (event)=>{
      const {name, value} = event.target
      this.setState({
        [name]:value
      })
      console.log(this.state)
    }
    handleReset = ()=>{
      this.setState({
        email:"",
        phone:"",
        password:""
      })
    }
    render(){
        return(
            <div className="signin-form-div" style={{height:"80%"}}>
                <form className="signin-form" noValidate autoComplete="off">
                <Typography variant="h6" component="h1" align="center" style={{color:"white"}}> Register with us </Typography>

                <InputTextField
                    InputProps={{
                        endAdornment:(
                          <InputAdornment position="end">
                            <IconButton style={{cursor:"text"}} disableFocusRipple={true} focusRipple={false} disableTouchRipple={true} disableRipple={true}>
                                <PersonOutline />
                            </IconButton>
                          </InputAdornment>
                              )
                      }}
                    type="text"
                    name="name"
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    variant="outlined" width="280px" icon={null} />

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
                    type="email"
                    name="email"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    variant="outlined" width="280px" icon={null} />

                    <InputTextField
                    InputProps={{
                        endAdornment:(
                          <InputAdornment position="end">
                            <IconButton style={{cursor:"text"}} disableFocusRipple={true} focusRipple={false} disableTouchRipple={true} disableRipple={true}>
                                <PhoneAndroidOutlined />
                            </IconButton>
                          </InputAdornment>
                              )
                      }}
                    type="text"
                    name="phone"
                    label="Phone Number"
                    value={this.state.phone}
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
                    <div style={{
                      display:"flex",
                      flexDirection:"row",
                      justifyContent:"center"
                    }}>
                      {
                      this.state.wrongDetails?(<Typography variant="subtitle1" style={{color:"black",textAlign:"center"}} >{this.state.wrongDetailsText}</Typography>):(null)
                      }
                      <MaterialButton text="Submit" variant="contained" onClick={this.handleSubmit}  />
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

export default withRouter(connect(null,mapDispatchToProps)(SignUp))