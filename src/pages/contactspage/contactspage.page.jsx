import React from 'react'
import MiniDrawer  from '../../components/drawer/drawer.component'
import './contactpage.style.scss'
import DisplayCard from '../../components/displaycard/displaycard.component'

class ContactsPage extends React.Component{
    render(){
        return(
            <div>
                <MiniDrawer />
                <div style={{
                    marginLeft:"auto",
                    marginRight:"auto",
                    marginTop:"100px",
                    width:"640px"
                }}>
                    <DisplayCard name={"Raj Vashishtha"} display_skeleton={false} 
                     desc={"My friend from Bharatpur"} accounts={
                        [
                            {
                                text:"phone",
                                list:["9785457484"]
                            },
                            {
                                text:"google",
                                list:["vashiraj2000","hello","vashirajroxx"]
                            },
                            {
                                text:"facebook",
                                list:["jsgdds"]
                            },
                            {
                                text:"instagram",
                                list:["dkcjk"]
                            }
                            
                        ]
                    } />
                </div>
            </div>
        )
    }
}

export default ContactsPage