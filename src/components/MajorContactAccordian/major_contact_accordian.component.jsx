import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import DetailedAccordion from '../contactitems/contactItems.component'


class MajorContactAccordian extends React.Component{
    state = {
        accounts:[]
    }
    componentDidMount(){
        const {accounts} = this.props
        this.setState({
            accounts:accounts,
        })
    }
    render(){
        const {skeleton} = this.props
        return(
                <div>
                    {skeleton? (
                        <div style={{
                            width:"80%",
                            marginLeft:"auto",
                            marginRight:"auto"
                        }}>
                            <Skeleton animation="wave" height={20} width="100%" style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={20} width="100%" style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={20} width="100%" style={{ marginBottom: 6 }} />
                        </div>
                    ):(
                        <div>

                            {
                                this.state.accounts !== []?(this.state.accounts.map(item=>(<DetailedAccordion text={item.text}
                                    list={item.list}
                                    />))):(null)
                            }
                            
                        </div>

                    )}
                </div>
        )
    }
}

export default MajorContactAccordian