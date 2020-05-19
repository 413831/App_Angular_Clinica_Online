import { Component, OnInit } from '@angular/core';
import { MiservicioService } from 'src/app/servicios/miservicio.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  base64textString: string;
  reader: FileReader;
  selectedFile: File;
  centered = true;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  tiles: Tile[] = [
    {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 2, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(private servicio: MiservicioService) 
  {
  }

  ngOnInit(): void {
    this.servicio.init();
  }


}

  