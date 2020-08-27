import React from 'react'
import './customselect.syle.scss'

class CustomSelect extends React.Component{
    render(){
        const {options, defaultValue,onChange,id} = this.props
        return(
                <div className="select">
                    <select name="measure" id={id} onChange={onChange}>
                        <option defaultValue value={"none"}>{defaultValue}</option>
                        {
                            options.map(item=>(<option value={item.value}> {item.text} </option>))
                        }
                    </select>       
                </div>
            
        )
    }
}

export default CustomSelect