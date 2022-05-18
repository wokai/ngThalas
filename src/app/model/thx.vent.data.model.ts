/// //////////////////////////////////////////////////////////////////////// ///
/// Medibus ventilation dataset
/// //////////////////////////////////////////////////////////////////////// ///

export interface ThxVentDataType {
  msgId: number,
  time: string,
  episode: string,
  respiration: {
    peak        : number,
    plateau     : number,
    peep        : number,
    tidalvolume : number,
    minutevolume: number,
    rate        : number
  },
  gas: {
    fio2 : number,
    feo2 : number,
    feco2: number,
    fico2: number,
    o2uptake: number
    
  },
  inhalation: {
    mac  : number,
    isoflurane: {
      insp: number,
      exp:  number,
      cons: number,
    },
    desflurane: {
      insp: number,
      exp:  number,
      cons: number,
    },
    sevoflurane: {
      insp: number,
      exp:  number,
      cons: number,
    }
  }
}


export class ThxVentData implements ThxVentDataType {
  
  msgId: number = 0;
  time: string = '';
  episode: string = '';
  respiration: {
    peak        : number,
    plateau     : number,
    peep        : number,
    tidalvolume : number,
    minutevolume: number,
    rate        : number
  };
  gas: {
    fio2 : number,
    feo2 : number,
    feco2: number,
    fico2: number,
    o2uptake: number
  };
  inhalation: {
    mac  : number,
    isoflurane: {
      insp: number,
      exp:  number,
      cons: number,
    },
    desflurane: {
      insp: number,
      exp:  number,
      cons: number,
    },
    sevoflurane: {
      insp: number,
      exp:  number,
      cons: number,
    }
  };
  
  constructor(){
    this.time = '';
    this.respiration = {
        peak        : 0,
        plateau     : 0,
        peep        : 0,
        tidalvolume : 0,
        minutevolume: 0,
        rate        : 0
      };
    this.gas = {
      fio2 : 0,
      feo2 : 0,
      feco2: 0,
      fico2: 0,
      o2uptake: 0
    };
    this.inhalation = {
      mac : 0,
      isoflurane: {
        insp: 0,
        exp:  0,
        cons: 0
      },
      desflurane: {
        insp: 0,
        exp:  0,
        cons: 0
      },
      sevoflurane: {
        insp: 0,
        exp:  0,
        cons: 0
      }
    }
  }
  
  assign(vent : ThxVentDataType) : ThxVentData {
    Object.assign(this, vent);
    return this;
  }
  
  static from(vent : ThxVentDataType) {
    return new ThxVentData().assign(vent);
  }
}
