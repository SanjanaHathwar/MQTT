import React, { useEffect } from 'react'
import { Table,TableBody,TableCell ,TableHead,TableRow} from '@material-ui/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const FictureTable = ({msg}) => {

    useEffect(()=>{
        console.log(msg)
    })
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>SL NO</TableCell>
                        <TableCell>FIXTURE ID</TableCell>
                        <TableCell>POWERMODE</TableCell>
                        <TableCell>BRIGHTNESS LEVEL</TableCell>
                        <TableCell>BATTERY LEVEL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        msg.map((row,i)=>
                        <TableRow key={row.fixtureid}>
                            <TableCell>{i}</TableCell>
                            <TableCell>{row.fixtureid}</TableCell>
                            <TableCell>{row.powerMode}</TableCell>
                            <TableCell>{row.Brightnesslevel}</TableCell>
                            <TableCell>{row.batteryPower}</TableCell>
                        </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

FictureTable.propTypes = {
msg: PropTypes.array.isRequired,

}

const mapStateToProps = state => ({
msg: state.fixture.msg
})

export default connect(mapStateToProps,{})(FictureTable)
