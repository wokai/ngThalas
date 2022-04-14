
import { ThxStatusType } from './thx.core.model';

/// ------------------------------------------------------------------------ ///
/// Status of last communication between Thalas server and Xenon-device
/// ------------------------------------------------------------------------ ///

export interface ThxComStatusType {
  online: boolean,
  errno:  number,
  code:   string,
  status: ThxStatusType
}


/// Communication result layers: Status of communication and transferred data
export interface ThxComResult<Type> {
  com: ThxComStatus,
  data: Type
}


export class ThxComStatus implements ThxComStatusType {
  
  static levels = {
    empty: {
      id   : 0,
      label: '(Empty)',
      color: '#80000000'  /// Transparent
    }, 
    offline: {
      id   : 1,
      label: 'Offline',
      color: '#FFCCBC'    /// Deep Orange 
    }, 
    online: {
      id   : 2,
      label: 'Online',
      color: '#C8E6C9'    /// Green
    }
  } as const;

  online: boolean = false;
  errno : number  = 0;
  code  : string  = '';
  status: ThxStatusType = ThxComStatus.levels.empty;
  
  constructor() {}
  
  updateStatus(): ThxComStatus {
    this.status = this.online ? ThxComStatus.levels.online : ThxComStatus.levels.offline;
    return this;
  }
  
  assign(s: ThxComStatusType): ThxComStatus {
    Object.assign(this, s).updateStatus();
    return this;
  }
  
  static from (s: ThxComStatusType): ThxComStatus {    
    return new ThxComStatus().assign(s);
  }
  
}
