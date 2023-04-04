export interface hero {
  name: string;
  ability: string;
  id: number;
  firstDayHeroTrained: any;
  suitColors: string;
  startingPower: number;
  currentPower: number;
  lastTimeHeroTrained: any;
  amountOfTimeHeroTrained: number;
}
export interface user {
  firstName: string;
  password: string;
  heroes: hero[];
}
