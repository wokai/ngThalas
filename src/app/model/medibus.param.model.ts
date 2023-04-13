/// //////////////////////////////////////////////////////////////////////// ///
/// Database respiration dataset
/// //////////////////////////////////////////////////////////////////////// ///

export interface MedibusParameterType {
  id:           number,
  code:         string,
  hexCode:      number,
  description:  string,
  unit:         string,
  snomedid:     number,
  format:       string,
  factor:       number,
  m:            string,
  ll:           boolean,
  hl:           boolean
}

export class MedibusParameter implements MedibusParameterType {
  
  id          : number = 0;
  code        : string = '';
  hexCode     : number = 0;
  description : string = '';
  unit        : string = '';
  snomedid    : number = 0;
  format      : string = '';
  factor      : number = 1;
  m           : string = 'x';
  ll          : boolean = false;
  hl          : boolean = false;
  
  constructor() {}
  
  assign(m: MedibusParameterType): MedibusParameter {
    Object.assign(this, m);
    return this;
  }
  
  static from (m: MedibusParameterType): MedibusParameter {    
    return new MedibusParameter().assign(m);
  }
}

/**
 * @see{thalas} - (/routes/param) - (
 **/

export interface TransactResultType {
  status:  string,
  success: boolean,
  reason:  string
}

export class TransactResult {
  constructor() {}
  
  assign(t: TransactResultType): TransactResult {
    Object.assign(this, t);
    return this;
  }
  
  static from (t: TransactResultType): TransactResult {
    return new TransactResult().assign(t);
  }
}
