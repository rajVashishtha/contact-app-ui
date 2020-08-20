import React from 'react'
import MiniDrawer  from '../../components/drawer/drawer.component'
import { connect } from 'react-redux'
import SignUp from '../../components/signup/signup.component'
import SignIn from '../../components/signin/signin.component'
import { IconButton, Tooltip } from '@material-ui/core'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'


class HomePage extends React.Component{
    state={
        signin:true,
        signup:false
    }
    transfer = ()=>{
        if(this.state.signin){
            this.setState({
                signin:false,
                signup:true
            })
            var ele = document.getElementById("signup_form")
            ele.scrollIntoView({behavior:"smooth"})
            // window.scrollTo(ele.offsetLeft,ele.offsetTop)
            return
        }else{
            this.setState({
                signin:true,
                signup:false
            })
            var ele1 = document.getElementById("signin_form")
            ele1.scrollIntoView({behavior:"smooth"})
            return
        }
    }
    render(){
        const {currentUser} = this.props
        console.log(currentUser)
        return(
            <div style={{
                backgroundImage: `url(${require('../../clint-adair-BW0vK-FA3eg-unsplash.jpg')})`,
                backgroundRepeat:"no-repeat",
                backgroundAttachment:"fixed",
                backgroundSize:"cover",
                boxShadow: "inset 2000px 0 0 0 rgba(0, 0, 0, 0.7)",
            }}>
                <MiniDrawer />
                <div style={{display:"flex",
                flexDirection:"column",
                alignItems:"flex-end",
                paddingRight:"20px"

            }}>
                        <div style={{
                            width:"100%",
                            height:"50px"
                        }} id="signin_form">

                        </div>
                        <div style={{
                            marginTop:"100px",
                            display:"flex",
                            alignItems:"flex-end"
                            
                        }}  >
                            <Tooltip title="Don't have a account">
                                <IconButton style={{
                                    marginRight:"10px",
                                    backgroundColor:"#e8e8e8"
                                }}  onClick={this.transfer}>
                                    <ArrowDownward />
                                </IconButton>
                            </Tooltip>
                            <SignIn />
                            
                        </div>
                        <div style={{
                            marginTop:"800px",
                            paddingBottom:"90px",
                            display:"flex",
                            alignItems:"flex-start"
                        }} >
                            <Tooltip title="Already have a account" placement="left">
                                <IconButton style={{
                                    marginRight:"10px",
                                    backgroundColor:"#e8e8e8"
                                }} id="signup_form" onClick={this.transfer}>
                                    <ArrowUpward />
                                </IconButton>
                            </Tooltip>
                            <SignUp />
                        </div>
                        
                </div>
            </div>
        )
    }
}

const mapStateToProps = state=>({
    currentUser:state.user.currentUser
})

export default connect(mapStateToProps)(HomePage)