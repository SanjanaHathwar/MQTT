import React ,{ useEffect , useState } from 'react'
import { Grid, Card, Button } from '@material-ui/core' 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { subscribeMqtt } from './actions/fixtureAction'
import { fixtureLog , timer } from './actions/fixtureLogAction'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const Fixture = ({subscribeMqtt,fixtureLog,msg,timer}) => {
    const [open,setOpen] = useState(false)
    const [byteStatus,setByteStatus]  = useState("")
    const [occupency,setOccupency] = useState("")
    const [batteryLevel,setBatteryLevel] = useState("")
    const [fixtureId,setId] = useState("")
    const [ message , setMessage ] = useState("")
    
    useEffect(() => {
        fixtureLog()
        subscribeMqtt('ws://192.168.33.118:9001')
    },[fixtureLog,subscribeMqtt])


    useEffect(() => {
      
        setInterval(() => {
            
            setMessage(timer())
        }, 10000);
    },[timer])

   

  
    

    const handleClose = () => {
        setOpen(false);
    };

    const FixtureDeatils = (fixture) => {
        setOpen(true)
        setId(fixture.fixtureId)
        if ((fixture.powermode & 0xc0) === 0x00 ) {
            setByteStatus("Battery mode")
        } 
        else if ((fixture.powermode & 0xc0) === 0x40) {
            setByteStatus("Grid mode")
        }
        else if ((fixture.powermode & 0xc0) === 0x80) {
            setByteStatus("Charge mode")
        }

        if ((fixture.powermode & 0x20) === 0x20 ) {
            setOccupency("Present")
        } 
        else {
            setOccupency("Absent")
        }

        if ((fixture.fixtureBattery & 0x80) === 0x80 ) {
            var level = fixture.fixtureBattery & 0x7f
            setBatteryLevel(level)
        } 
        
        else {
            setBatteryLevel("Invalid Battery Level")
        }
    }
    
    return (
        <div> 
            <Grid container spacing={0}>
            {
                (msg.length > 0 ) ? 
                    msg.map(fixture => 
                            <Grid item xs key={fixture.fixtureId}>
                                <Card key={fixture.id} style={{height:30,width:30,margin:10 ,backgroundColor: fixture.last_received < 3 ? "green" :
                                    fixture.last_received >= 3 && fixture.last_received < 5 ? "orange" : "red"}} onClick={()=>FixtureDeatils(fixture)}>

                                </Card>
                            </Grid>
                        
                        ) 
                : 
                    null


            }  
            </Grid>
        
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{fixtureId}</DialogTitle>
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
    fixtureLog: PropTypes.func.isRequired,
    timer: PropTypes.func.isRequired,
    subscribeMqtt: PropTypes.func.isRequired,
    isSubscribed: PropTypes.bool,
    msg: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    isSubscribed: state.fixture.isSubscribed,
    msg: state.fixture.msg
})


export default connect(mapStateToProps,{subscribeMqtt,fixtureLog,timer})(Fixture)



       
        