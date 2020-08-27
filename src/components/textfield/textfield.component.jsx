import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
}));
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: "black",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: "black",
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: "black",
      },
      '&:hover fieldset': {
        borderColor: "black",
      },
      '&.Mui-focused fieldset': {
        borderColor: "black",
      },
    },
  },
})(TextField)
 

export default function InputTextField(props) {
  const classes = useStyles();
  const {type, label, variant, icon,color="white", width} = props
  return (
    <div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item style={{
            paddingBottom:"10px"
          }}>
            {icon}
          </Grid>
          <Grid item>
            <CssTextField 
            className={classes.margin}
            label={label}
            type={type}
            variant={variant}
            id={`${label}-text`}
            inputProps={{
              style:{
                width:`${width}px`,
                color:`${color}`
              }
            }}
            {...props}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

InputTextField.propTypes = {
  type : PropTypes.string.isRequired,

}