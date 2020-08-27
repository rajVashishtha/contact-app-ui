import React from 'react'
import MiniDrawer from '../../components/drawer/drawer.component'
import './addContactpage.style.scss'
import AddContactForm from '../../components/addcontactform/addContactForm.component'

class AddContactPage extends React.Component{
    render(){
        return(
            <div>
                <MiniDrawer />
                <div className="main_for_addcontactpage">
                    <AddContactForm />
                </div>
            </div>
        )
    }
}

export default AddContactPage