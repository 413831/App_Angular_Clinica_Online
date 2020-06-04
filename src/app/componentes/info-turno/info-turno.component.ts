import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Turno } from 'src/app/clases/Turno';

@Component({
  selector: 'app-info-turno',
  templateUrl: './info-turno.component.html',
  styleUrls: ['./info-turno.component.css']
})
export class InfoTurnoComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<InfoTurnoComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: Turno ) 
  { 
    
  }

  ngOnInit(): void {
  }

}
