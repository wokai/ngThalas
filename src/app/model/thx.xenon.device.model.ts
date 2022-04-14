
import { ThxDeviceData, ThxStatusType   }               from './thx.core.model';
import { ThxComStatusType, ThxComResult, ThxComStatus } from './thx.com.status.model';
import { ThxOsStatusType, ThxOsStatus }                 from './thx.os.status.model';
import { ThxXenonStatusType, ThxXenonStatus }           from './thx.xenon.status.model';
import { ThxVentDataType, ThxVentData }                 from './thx.vent.data.model';

/// //////////////////////////////////////////////////////////////////////// ///
/// Complete Xenon device 
/// //////////////////////////////////////////////////////////////////////// ///


let levels = {
  empty:  {
    id   : 0,
    label: 'Empty',     /// No query result present (default)
    color: '#80000000'  /// Transparent
  },
  offline: {
    id   : 1,
    label: 'Offline',   /// No result on ping or any other query
    color: '#FFCCBC'    /// Deep Orange 
  },
  device: {
    id   : 2,
    label: 'Device present',    /// Os result obtained
    color: '#FFECB3'    /// Amber
  },
  path: {
    id   : 3,
    label: 'Path detected',      /// Path detected 
    color: '#1565C0'    /// Blue
  },
  active: {
    id   : 4,
    label: 'Active connection',    /// Hardware connection opened
    color: '#C8E6C9'    /// Green
  }
};


let levelArray: Array<ThxStatusType> = [
  levels.empty,
  levels.offline,
  levels.device,
  levels.path,
  levels.active
];


export interface ThxXenonDeviceType extends ThxDeviceData {
  com    : ThxComStatus,    /// From ComResult
  status : ThxStatusType,   /// DeviceStatusList
  os     : ThxOsStatus,
  xenon  : ThxXenonStatus,
  paths  : string [],
  vent   : ThxVentDataType,
}


export class ThxXenonDevice implements ThxXenonDeviceType {
  
  static levels = levels;
  static levelArray: Array<ThxStatusType> = levelArray;
  
  id:   number = 0;
  ip:   string = '';
  name: string = '';
  port: number = 0; 
  
  com   : ThxComStatus    = new ThxComStatus();
  status: ThxStatusType   = levels.empty;
  os    : ThxOsStatus     = new ThxOsStatus();
  xenon : ThxXenonStatus  = new ThxXenonStatus();
  paths : string []       = [];
  vent  : ThxVentDataType = new ThxVentData();
  
  constructor() {}
  
  assign(d: ThxDeviceData): ThxXenonDevice {
    Object.assign(this, d);
    return this;
  }
  
  static from(d: ThxDeviceData): ThxXenonDevice {
    return new ThxXenonDevice().assign(d);
  }
  
}

