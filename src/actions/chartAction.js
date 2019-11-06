import { BATTERY_STATUS } from "./type";
import Axios from "axios";

export const getBatteryStatus = () => async dispatch => {
  
  try {
    const res = await Axios.get('http://192.168.33.106:8080/api/v1/batterystatus')
    dispatch({
        type: BATTERY_STATUS,
        payload : res.data
    })
  } catch (error) {
      console.log(error)
  }
}