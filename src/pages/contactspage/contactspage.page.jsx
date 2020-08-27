import React from 'react'
import MiniDrawer  from '../../components/drawer/drawer.component'
import './contactpage.style.scss'
import DisplayCard from '../../components/displaycard/displaycard.component'
import { withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { filterContact } from './contactpage.utils'
import {setContacts} from '../../redux/contacts/contact.action'

class ContactsPage extends React.Component{
    state= {
        skeleton:true,
        contacts:[],
        noContact:false
    }
    handleIdToHandleName = (id)=>{
        if(id === 1){
            return "google"
        }
        else if(id === 2){
            return "facebook"
        }
        else if(id === 3){
            return "instagram"
        }
        else if(id === 4){
            return "linkedin"
        } 
        else if(id === 5){
            return "twitter"
        }
        else{
            return "phone"
        }
    }
    async componentDidMount(){
        const {currentUser, setContacts} = this.props
        const response = await fetch(`http://localhost:5000/contacts/all/${currentUser.user_id}`)
        const result = await response.json()
        console.log(result)
        if(result.length === 0){
            this.setState({
                noContact:true
            })
            return
        }
        var main_result = []
        for(const r of result){
            let template = {
                "google":[],
                "facebook":[],
                "twitter":[],
                "linkedin":[],
                "instagram":[],
                "phone":[]
            }
            for(const h of r.handles){
                template[this.handleIdToHandleName(h.handle_id)].push(h.handle_name)
            }
            var contact_template = []
            for (const [key, value] of Object.entries(template)) {
                console.log(value)
                // eslint-disable-next-line
                if(value.length != 0){
                    contact_template.push({
                        text:key,
                        list:value
                    })
                }
              }
            const final_result = {
                contact_name : r.contact_name,
                contact_desc:r.contact_id,
                template:contact_template
            }
            main_result.push(final_result)
        }
        console.log(main_result)
        setContacts(main_result)
        this.setState({
            skeleton:false,
            contacts:main_result
        })
    }
    render(){
        const { match, contacts} = this.props
        const { handleId }= match.params
        return(
            <div>
                <MiniDrawer />
                {
                    this.state.noContact?(<h1 style={{textAlign:"center"}}>No contact to display</h1>):(<h1 style={{textAlign:"center",marginTop:"70px"}}>{handleId}</h1>)
                }
                <div style={{
                    marginLeft:"auto",
                    marginRight:"auto",
                    marginTop:"10px",
                    width:"640px"
                }}>
        {
            this.state.skeleton?(<DisplayCard name={"gibridh"} display_skeleton={this.state.skeleton} 
                desc={"gebrish"} accounts={["temp"]} />):(null)
        }
        {
            this.state.skeleton?(<DisplayCard name={"gibridh"} display_skeleton={this.state.skeleton} 
                desc={"gebrish"} accounts={["temp"]} />):(null)
        }
        {
            contacts.map(item=>(
                <DisplayCard name={item.contact_name} key={`contact-${item.contact_name}`} display_skeleton={this.state.skeleton} 
            desc={item.contact_desc} accounts={filterContact(item.template, handleId)} />
            ))
        }
        </div>
            
        </div>
        )
    }
}
const mapStateToProps = state =>({
    currentActive : state.activeTab.currentActiveTab,
    currentUser   : state.user.currentUser,
    contacts : state.contacts.contacts
})

const mapDispatchToProps = dispatch =>({
    setContacts : user => dispatch(setContacts(user))
  })

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ContactsPage))