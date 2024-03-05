import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import deviceReducer from "../store/devices/slice";
import systemReducer from "./devices/system/system";
import interfaceReducer from './interfaces/slice';
import ipReducer from './ip/slice';
import hotspotReducer from './hotspot/slice';
import voucherReducer from './voucher/slice';
import userReducer from './accounts/slice';
import firewallRedux from './firewall/slice'
import studentSlice from './students/slice'


export default configureStore({
  reducer: {
    auth: authReducer,
    devices: deviceReducer,
    system: systemReducer,
    interfaces: interfaceReducer,
    ip: ipReducer,
    hotspot: hotspotReducer,
    voucher: voucherReducer,
    users: userReducer,
    firewall: firewallRedux,
    students: studentSlice
  },
});
