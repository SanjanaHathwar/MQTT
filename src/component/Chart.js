import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import c3 from 'c3'
import { connect } from 'react-redux'
import 'c3/c3.css';
import Battery from '../assets/images/Battery.png'
import * as d3 from "d3";



const Chart = ({chart:{batteryStatus}}) => {
    // useEffect(() => {
    //     console.log(batteryStatus)
       
    //     c3.generate({
    //         oninit: function() {
    //             // var element = this.selectChart[0][0]
    //             d3.select("#chart")
    //             .select('.c3-chart-arcs')
    //             .insert("image",":first-child")
    //             .attr('x', -75)
    //             .attr('y', -75)
    //             .attr('width', 150)
    //             .attr('height', 150)
    //             .attr('xlink:href', Battery)
    //             .style("background-color", "black");
    //         },
    //         data: {
    //             columns: [
    //                 ['Battery status', batteryStatus]
    //             ],
    //             type: 'gauge',
                
    //             // onclick: function (d, i) { console.log("onclick", d, i); },
    //             // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
    //             // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    //         },
    //         legend: {
    //             show: false
    //         },
    //         gauge: {
    //             fullCircle: true, 
    //            label: {
    //                format: function(value, ratio) {
    //                    return ;
    //                },
    //                show: false // to turn off the min/max labels.
    //            },
    //     //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
    //     //    max: 100, // 100 is default
    //     //    units: ' %',
    //        width: 20 // for adjusting arc thickness
    //         },
    //         color: {
    //             pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
    //             threshold: {
    //     //            unit: 'value', // percentage is default
    //     //            max: 200, // 100 is default
    //                 values: [30, 60, 90, 100]
    //             }
    //         },
    //         size: {
    //             height: 300
    //         }
    //     });
        
    // })
   
    return (
        <div>
            {/* <div id="chart" style={{zIndex:-1,position:'relative'}}>
            
            </div> */}
         
                <img src={Battery} alt="" style={{zIndex:8,position:"absolute",marginLeft:100}}/>
            
        </div>
        
         
        
       
    )
}

Chart.propTypes = {
  
    chart : PropTypes.object,
}

const mapStateToProps = state => ({
    chart : state.chart
})
export default connect(mapStateToProps,{})(Chart)
