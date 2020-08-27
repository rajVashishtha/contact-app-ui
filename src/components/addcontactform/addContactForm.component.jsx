import React from 'react'
import './addContactForm.style.scss'
import CustomSelect from '../custom-select/customSelect.component'
import {handlerOptions} from './addContactForm.utils'
import InputTextField from '../textfield/textfield.component'
import { PersonOutline, DescriptionOutlined, AccountBalanceOutlined, FiberManualRecord, SaveOutlined } from '@material-ui/icons'
import { Grid } from '@material-ui/core'
import MaterialButton from '../button/button.component'
import {IconButton} from '@material-ui/core'
import $ from 'jquery'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
class AddContactForm extends React.Component{
    state={
        contact_name:"",
        description:"",
        options:handlerOptions,
        baseId : 0,
        handlers:[0],
        active:[false],
        selectedHandles:{
            "google":[],
            "facebook":[],
            "instagram":[],
            "twitter":[],
            "linkedin":[],
            "phone":[]
        }
    }
    removeHandler = (value)=>{
        var newOptions = this.state.options.filter(item=>(item.value !== value))
        console.log(newOptions)
        this.setState({
            options:newOptions,
            
        })
    }
    handleReset = ()=>{
        $("input").val("")
        $("select").val("none")
        this.setState({
            contact_name:"",
            description:"",
            options:handlerOptions,
            baseId:0,
            handlers:[0],
            active:[false],
            selectedHandles:{
            "google":[],
            "facebook":[],
            "instagram":[],
            "twitter":[],
            "linkedin":[],
            "phone":[]
        }
        })
        
    }
    handleChange = (event)=>{
        const {value ,id} = event.target
        if(value !== "none"){
            const split_arr = id.split("-")
            const active_ind = parseInt(split_arr[split_arr.length - 1])
            var new_active = []
            for(let i=0;i<this.state.active.length;i++){
                // eslint-disable-next-line
                if(active_ind == i){
                    new_active.push(true)
                }
                else{
                    new_active.push(this.state.active[i])
                }
            }
            this.setState({
                active:new_active
            })
        }
        else{
            const split_arr = id.split("-")
            const active_ind = parseInt(split_arr[split_arr.length - 1])
            var new_active_2 = []
            for(let i=0;i<this.state.active.length;i++){
                // eslint-disable-next-line
                if(active_ind == i){
                    new_active_2.push(false)
                }
                else{
                    new_active_2.push(this.state.active[i])
                }
            }
            console.log(new_active_2)
            this.setState({
                active:new_active_2
            })
        }
    }
    CustomSelectWithId = ({id, active})=>{
        return (
            <div>
                <Grid container spacing={1} alignItems="flex-end" style={{paddingLeft:"14px"}}>
                <Grid item style={{
                  paddingBottom:"5px"
                }}>
                    <AccountBalanceOutlined style={{fontSize:"40px"}} />
                </Grid>
                <Grid item>
                    <CustomSelect id={`handler-select-${id}`} onChange={this.handleChange} options={this.state.options} defaultValue="Chooose Handler" />
                </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end" style={{paddingLeft:"14px"}}>
                    <Grid item style={{paddingBottom:"15px"}}>
                        <FiberManualRecord />
                    </Grid>
                    <Grid item>
                        <InputTextField disabled={!active} id={`handler-textfield-${id}`} label="handle" type="text" variant="standard" color="black" />
                    </Grid>
                    <Grid item style={{
                        paddingBottom:"10px"
                    }}>
                        <IconButton id={`handler-button-${id}`} disabled={!active} onClick={this.addContact}>
                            <SaveOutlined id={`handler-buttonicon-${id}`}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        )
    }
    addHandler = ()=>{
        var new_id = this.state.baseId + 1
        this.setState({
            baseId:this.state.baseId+1
        })
        this.setState({
            handlers:[...this.state.handlers, new_id],
            active:[...this.state.active, false]
        })
    }
    saveContact = async ()=>{
        const {currentUser, history} = this.props
        if(currentUser === null){
            alert("Login First")
            history.push("/")
            return
        }
        const {user_id} = currentUser
        const  {contact_name, description, selectedHandles} = this.state
        const requestOptions = {
            method: 'POST',
            mode:'cors',
            headers: { 
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'X-Custom-Header',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id, contact_name, description, selectedHandles})
        };
        const response = await fetch('http://localhost:5000/contacts/add', requestOptions)
        const result = await response.json()
        console.log(result)
        this.handleReset()

    }
    addContact = (event)=>{
        const {id} = event.target
        console.log(id)
        const split_arr = id.split("-")
        const saving_ind = parseInt(split_arr[split_arr.length - 1])
        const value_of_select = $("#handler-select-"+saving_ind).val()
        const value_of_input = $("#handler-textfield-"+saving_ind).val()
        if(value_of_input !== ""){
            const selected_handler = this.state.selectedHandles[value_of_select]
            selected_handler.push(value_of_input)
            this.setState({
                selectedHandles:{
                    ...this.state.selectedHandles,
                    [value_of_select]:selected_handler
                }
            })
            console.log(this.state.selectedHandles)
            var new_active = []
            for(let i=0;i<this.state.active.length;i++){
                // eslint-disable-next-line
                if(saving_ind == i){
                    new_active.push(false)
                }
                else{
                    new_active.push(this.state.active[i])
                }
            }
            console.log(new_active)
            this.setState({
                active:new_active
            })

        }
        
    }
    textChange= (event)=>{
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }
    render(){
        return (
            <div className="addcontact_main_form">
                <div>
                    <InputTextField type="text" color="black"
                        name="contact_name"
                        value={this.state.contact_name}
                        onChange={this.textChange}
                    variant="outlined" label="Contact Name" width="250" icon={<PersonOutline style={{
                        fontSize:"40px"
                    }} />} />
                    <InputTextField type="text" rows={3} color="black"
                        name="description"
                        value={this.state.description}
                        onChange={this.textChange}
                    variant="outlined"  label="Description" placeholder="Description like address to identify between same names" width="350" icon={<DescriptionOutlined style={{
                        fontSize:"40px"
                    }} />} multiline={true} />
                    <div id="handler_div">
                        {
                            this.state.handlers.map(item=>(<this.CustomSelectWithId id={item} active={this.state.active[item]}/>))
                        }
                    </div>
                    <div className="addcontact_div_for_buttons">
                        <MaterialButton text="Add Handler" variant="outlined" onClick={this.addHandler} />
                        <MaterialButton text="Reset" variant="outlined" onClick={this.handleReset} />
                        <MaterialButton text="Save" variant="contained" onClick={this.saveContact} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    currentUser : state.user.currentUser
})
export default withRouter(connect(mapStateToProps)(AddContactForm))