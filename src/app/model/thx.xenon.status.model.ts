
import { ThxStatusType } from './thx.core.model';


/// ------------------------------------------------------------------------ ///
/// Xenon: Medibus communication status levels
/// Declared objects are not visible outside of modules
/// unless they are explicitly exported
/// ------------------------------------------------------------------------ ///

var levels = {
  closed : {
    id   : 0,
    label: 'Closed',
    color: '#80000000'    /// Transparent
  }, 
  inactive: {
    id   : 1,
    label: 'Inactive',
    color: '#10B71C1C'      /// Red
  }, 
  listen: {
    id   : 2,
    label: 'Listen',
    color: '#104A148C'      /// Purple
  }, 
  stopping: {
    id   : 3,
    label: 'Stopping',
    color: '#100D47A1'      /// Blue
  }, 
  initializing: {
    id   : 4,
    label: 'Initializing',
    color: '#10006064'      /// Cyan
  },
  protocol: {
    id   : 5,
    label: 'Protocol',
    color: '#C8E6C9'        /// Green
  }
} as const;


var levelArray = [
  levels.closed,
  levels.inactive,
  levels.listen,
  levels.stopping,
  levels.initializing,
  levels.protocol
] as const;

export interface ThxXenonStatusType {
  open          : boolean,
  openText      : string ,
  path          : string,
  baudRate      : number,
  dataBits      : number,
  parity        : string,
  stopBits      : number,
  message       : string,   /// Status message of last action
  busStatus     : number,   /// Xenon.StatusController
  busStatusText : string,   /// Xenon.StatusController
  status        : ThxStatusType
}



export class ThxXenonStatus implements ThxXenonStatusType {
  
  static levels = levels;
  static levelArray = levelArray;
  
  open          : boolean = false;
  openText      : string  = '';
  path          : string  = '';
  baudRate      : number  = 0;
  dataBits      : number  = 0; 
  parity        : string  = '';
  stopBits      : number  = 0;
  message       : string  = '';
  busStatus     : number  = 0;
  busStatusText : string  = '';
  status        : ThxStatusType = levels.closed;
  
  constructor() {}
  
  updateStatus() {
    this.status = ThxXenonStatus.levelArray[this.busStatus];
    return this;
  }
  
  assign(s: ThxXenonStatusType): ThxXenonStatus {
    Object.assign(this, s).updateStatus();
    return this;
  }
  
  static from(s: ThxXenonStatusType){ 
    return new ThxXenonStatus().assign(s);
  }
  
}
