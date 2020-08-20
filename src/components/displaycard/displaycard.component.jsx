import React from 'react'
import './displaycard.style.scss'
import { Avatar, Typography, IconButton , Paper, Collapse, List, ListItem, ListItemAvatar, ListItemText} from '@material-ui/core'
import { ExpandMore, ExpandLess } from '@material-ui/icons'
import DetailedAccordion from '../contactitems/contactItems.component'
import MajorContactAccordian from '../MajorContactAccordian/major_contact_accordian.component'
import Skeleton from '@material-ui/lab/Skeleton'

class DisplayCard extends React.Component{
    state={
        expand:false
    }
    handleExpand = ()=>{
        this.setState({
            expand:!this.state.expand
        })
    }
    render(){
        const {name, desc, accounts, display_skeleton} = this.props
        return(
                <Paper className="paper_style">
                    <div className="main_display_area">
                    <div className="initial_visible_area">
                        {
                            display_skeleton?(
                                <Skeleton animation="wave" variant="circle" width={80} height={80} />
                            ):(
                                <Avatar src="https://picsum.photos/200/300" className="avatar_style"/>
                            )
                        }
                        {
                            display_skeleton ? (
                                <div>
                                    <Skeleton variant='rect' animation="wave" height={40} width={500}
                                    style={{
                                        marginBottom: 6
                                    }}
                                    />
                                    <Skeleton variant='rect' animation="wave" height={20} width={500} />
                                </div>
                                
                            ):(
                                <div>
                                    <Typography variant="h5" color="textSecondary">{name}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">{desc}</Typography>
                                </div>
                            )
                        }
                        {
                            display_skeleton?(
                                null
                            ):(<IconButton onClick={this.handleExpand}>
                                {
                                    this.state.expand ? (<ExpandLess />):(<ExpandMore />)
                                }
                                </IconButton>)
                        }
                    </div>
                    <Collapse in={this.state.expand} timeout="auto" style={{
                        marginTop:"20px"
                    }} unmountOnExit>
                        <MajorContactAccordian skeleton={false} accounts={accounts}/>
                    </Collapse>

                    </div>
                </Paper>
            )
    } 
}

export default  DisplayCard