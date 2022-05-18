/// //////////////////////////////////////////////////////////////////////// ///
/// Operation system status 
/// //////////////////////////////////////////////////////////////////////// ///

export interface ThxOsStatusType {
  interface : string,
  hostname  : string,
  freemem   : number,
  totalmem  : number,
  uptime    : number
}

export class ThxOsStatus implements ThxOsStatusType {
  
  interface: string = '';
  hostname : string = '';
  freemem  : number = 0;
  totalmem : number = 0;
  uptime   : number = 0;
  
  constructor(){}
  
  assign(s: ThxOsStatusType): ThxOsStatus {
    Object.assign(this, s);
    return this;
  }

  static from (s: ThxOsStatusType) {
    return new ThxOsStatus().assign(s);
  }
}
  
