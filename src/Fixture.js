import React from 'react'
import { Grid, Card, Button } from '@material-ui/core' 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { subscribeMqtt } from './actions/fixtureAction'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const Fixture = (props) => {
    const [open,setOpen] = React.useState(false)
    const [byteStatus,setByteStatus]  = React.useState("")
    const [occupency,setOccupency] = React.useState("")
    const [batteryLevel,setBatteryLevel] = React.useState("")
    const [fixture_id,setId] = React.useState("")
    
    React.useEffect(() => {
        props.subscribeMqtt('ws://192.168.33.118:9001')
        
	})
    

    const handleClose = () => {
        setOpen(false);
    };

    const FixtureDeatils = (fixture) => {
        setOpen(true)
        setId(fixture.id)
        if ((fixture.byte & 0xc0) === 0x00 ) {
            setByteStatus("Battery mode")
        } 
        else if ((fixture.byte & 0xc0) === 0x40) {
            setByteStatus("Grid mode")
        }
        else if ((fixture.byte & 0xc0) === 0x80) {
            setByteStatus("Charge mode")
        }

        if ((fixture.byte & 0x20) === 0x20 ) {
            setOccupency("Present")
        } 
        else {
            setOccupency("Absent")
        }

        if ((fixture.battery & 0x80) === 0x80 ) {
            var level = fixture.battery & 0x7f
            setBatteryLevel(level)
        } 
        else {
            setBatteryLevel("Invalid Battery Level")
        }
    }
    
    return (
        <div>
        <Grid container spacing={1}>
        {
            props.info.map(fixture => 
                <Grid item xs key={fixture.id}>
                    <Card style={{height:30,width:30,margin:10 ,backgroundColor: fixture.luminaries_opmode === "0" ? ("green") :
                            (fixture.luminaries_opmode === "1" ? "orange" : "red")}} onClick={()=>FixtureDeatils(fixture)}>

                    </Card>
                </Grid>
            
            )

        }  
        </Grid>
        
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{fixture_id}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    
                        DETAILS :  <br/>
                        {byteStatus} <br/>
                        {occupency} <br/>
                        {batteryLevel} <br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                <Button onClick={handleClose} color="primary" autoFocus>
                    Okay
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

Fixture.propTypes = {
    subscribeMqtt: PropTypes.func.isRequired,
    isSubscribed: PropTypes.bool,
}
const mapStateToProps = state => ({
    isSubscribed: state.fixture.isSubscribed
})
export default connect(null,{subscribeMqtt})(Fixture)



       
        