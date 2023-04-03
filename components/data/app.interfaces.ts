export interface hero {
  name: string;
  ability: string;
  id: number;
  firstTrainedDay: any;
  SuitColors: string;
  StartingPower: number;
  CurrentPower: number;
  lastTimeTrained: any;
  HerosTrainingTimes: number;
}
export interface user {
  firstName: string;
  password: string;
  heroes: hero[];
}
