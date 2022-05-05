/// //////////////////////////////////////////////////////////////////////// ///
/// Database respiration dataset
/// //////////////////////////////////////////////////////////////////////// ///

export interface ThxRespDataType {
  msgId:        number,
  device:       number,
  episode:      string,
  time:         string,
  compliance:   number,
  peak:         number,
  plateau:      number,
  peep:         number,
  rate:         number,
  tidalvolume:  number,
  minutevolume: number
}

export interface ThxGasDataType {
  msgId:    number,
  device:   number,
  episode:  string,
  time:     string,
  fio2:     number,
  feo2:     number,
  o2uptake: number,
  fico2:    number,
  feco2:    number
}

export interface ThxInhalDataType {
  msgId:    number,
  device:   number,
  episode:  string,
  time:     string,
  mac:      number,
  inhal:    number,  /// Encoded gas type: General.inhalation (array)
  gas  :    string,
  insp:     number,
  exsp:     number,
  cons:     number
}

export interface ThxEpisodeDataType {
  id:         number,
  deviceid:   number,
  value:      string,
  begin:      string,
  end:        string,
  createdAt:  string,
  updatedAt:  string
}
