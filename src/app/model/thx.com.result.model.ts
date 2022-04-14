
/// Communication result layers: Status of communication and transferred data
export interface ThxComResultType<Type> {
  com: ComStatus,
  data: Type
}



export class ThxComResult {}
