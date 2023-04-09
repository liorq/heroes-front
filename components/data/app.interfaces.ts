export interface hero {
  name: string;
  ability: string;
  id: number;
  firstDayHeroTrained: number|string;
  suitColors: string;
  startingPower: number;
  currentPower: number;
  lastTimeHeroTrained: string;
  amountOfTimeHeroTrained: number;
}
export interface user {
  firstName: string;
  password: string;
  heroes: hero[];
}
