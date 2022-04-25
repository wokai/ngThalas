/// //////////////////////////////////////////////////////////////////////// ///
/// Database respiration dataset
/// //////////////////////////////////////////////////////////////////////// ///

export interface MedibusParameterType {
  id:           number,
  code:         string,
  hexCode:      number,
  description:  number,
  unit:         string,
  snomedid:     number,
  format:       string,
  factor:       number,
  m:            string,
  ll:           number,
  hl:           number
}


export class MedibusParameter implements MedibusParameterType {
}
