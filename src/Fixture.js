import React ,{ useEffect , useState } from 'react'
import { Grid, Card, Button } from '@material-ui/core' 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { subscribeMqtt  } from './actions/fixtureAction'
import { fixtureLog , timer } from './actions/fixtureLogAction'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import FictureTable from './FictureTable';
import Chart from './component/Chart';
import { getBatteryStatus } from './actions/chartAction';

const Fixture = ({subscribeMqtt,fixtureLog,msg,timer,getBatteryStatus}) => {
    const [open,setOpen] = useState(false)
    const [byteStatus,setByteStatus]  = useState("")
    const [occupency,setOccupency] = useState("")
    const [batteryLevel,setBatteryLevel] = useState("")
    const [fixtureId,setId] = useState("")
    // eslint-disable-next-line no-unused-vars
    const [ message , setMessage ] = useState("")
    
    useEffect(() => {
        fixtureLog()
        subscribeMqtt('ws://192.168.33.118:9001')
    },[fixtureLog,subscribeMqtt])


    useEffect(() => {
      
        setInterval(() => {
            
            setMessage(timer())
        }, 10000);
        getBatteryStatus()
    },[timer,getBatteryStatus])

   

  
    

    const handleClose = () => {
        setOpen(false);
    };

    const FixtureDeatils = (fixture) => {
        setOpen(true)
        setId(fixture.fixtureid)
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

        if ((fixture.battery_level & 0x80) === 0x80 ) {
            var level = fixture.battery_level & 0x7f
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
                                <Card key={fixture.id} style={{height:30,width:30,margin: 10 ,backgroundColor: fixture.last_received < 3 ? "green" :
                                    fixture.last_received >= 3 && fixture.last_received < 5 ? "orange" : "red"}} onClick={()=>FixtureDeatils(fixture)}>

                                </Card>
                            </Grid>
                        
                        ) 
                : 
                    null
            }  
            </Grid>

            <FictureTable/>
            <Chart/>
        
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
    msg: PropTypes.array.isRequired,
    getBatteryStatus: PropTypes.func.isRequired,
   
}
const mapStateToProps = state => ({
    isSubscribed: state.fixture.isSubscribed,
    msg: state.fixture.msg
})


export default connect(mapStateToProps,{subscribeMqtt,fixtureLog,timer,getBatteryStatus})(Fixture)



       
        
