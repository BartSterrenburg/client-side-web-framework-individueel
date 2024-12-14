export class Station {
  stationId: number;
  stationName: string;
  stationLocation: string;


  constructor(
    stationId: number,
    stationName: string,
    stationLocation: string,

    ) {
    this.stationId = stationId;
    this.stationName = stationName;
    this.stationLocation = stationLocation;
  }
}
