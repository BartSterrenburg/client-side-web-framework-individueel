import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StationService } from './../../../../../../libs/shared/services/station/station.service';  // Je service voor stations

@Component({
  selector: 'app-train-stations',
  templateUrl: './train-finder.component.html',
  styleUrls: ['./train-finder.component.css']
})
export class TrainFinderComponent implements OnInit {
  trainId: string = '';
  stations: any[] = [];
  selectedStation: any = null;
  trainsAtStation: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.trainId = this.route.snapshot.paramMap.get('id')!;
    
    this.stationService.getStationsByTrain(this.trainId).subscribe(data => {
      this.stations = data.results;
    });
    console.log(this.stations);
  }

  onStationClick(stationId: number): void {
    console.log(stationId);
    this.stationService.getTrainsAtStation(stationId).subscribe(data => {
      this.trainsAtStation = data.results;
      this.selectedStation = this.stations.find(station => station.id === stationId);
    });
  }
}