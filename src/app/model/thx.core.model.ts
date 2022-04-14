/// //////////////////////////////////////////////////////////////////////// ///
/// Device configuration as loaded from config-file
/// //////////////////////////////////////////////////////////////////////// ///

export interface ThxDeviceData {
  id:   number,
  ip:   string,  
  name: string,
  port: number
}

export interface ThxStatusType {
  readonly id: number,
  readonly label: string,
  readonly color: string
}


export interface ThxIntervalType {
  id: number,
  start: string,
  stop: string,
  cycles: number
}
