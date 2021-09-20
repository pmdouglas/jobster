import { Component, OnInit } from '@angular/core';
import { Position } from '../Position';
import { POSITIONS } from '../mock-positions';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  positions = POSITIONS;
  
  constructor() { }
  
  selectedPosition?: Position;
  
  onSelect(position:Position): void {
  	this.selectedPosition = position;
  }  
  
  ngOnInit(): void {
  }

}
