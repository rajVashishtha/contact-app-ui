import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { Avatar, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column1: {
    flexBasis: '33.33%',
  },
  column2:{
      flexBasis:`66.66%`
  }
  
}));

const getIconSrc = (text) =>{
if(text === "google")
    return "https://img.icons8.com/color/48/000000/google-logo.png"
else if(text === "facebook")
    return "https://img.icons8.com/fluent/48/000000/facebook-new.png"
else if(text === "twitter")
    return "https://img.icons8.com/fluent/48/000000/twitter.png"
else if(text === "linkedin")
    return "https://img.icons8.com/fluent/48/000000/linkedin-2.png"
else if(text === "instagram")
    return "https://img.icons8.com/fluent/64/000000/instagram-new.png"
else
    return "https://img.icons8.com/dusk/64/000000/address-book.png"

}

const copyToClipBoard = (event)=>{
    const val = event.target.textContent
    const el = document.createElement('textarea')
    el.value = val
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}

export default function DetailedAccordion({text, list}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column1}>
                <Typography className={classes.heading}>{text} </Typography>
          </div>
          <div className={classes.column2}>
            <Typography className={classes.secondaryHeading}>Handles</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column1}>
              <Avatar src={getIconSrc(text)} />
          </div>
          <div className={classes.column2}>
            <div style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-around",
                flexWrap:"wrap"
            }}>
                {
                    list.map(item=>(<Tooltip title="Click to copy">
                        <Chip label={item} onDelete={() => {}}
                        style={{marginTop:"10px"}}
                        onClick={copyToClipBoard}
                        />
                    </Tooltip>))
                }
                
                
            </div>

          </div>
        </AccordionDetails>
        
      </Accordion>
      <Divider />
    </div>
  );
}
