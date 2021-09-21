import { Component, OnInit } from '@angular/core';
import { Position } from '../Position';
import { PositionService } from '../position.service';


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  positions: Position[] = [];
  newPosition: Position = this.createPosition();
  
  constructor(private positionService: PositionService) { }
  
  ngOnInit() {
  	this.getPositions();
  }
  
  getPositions(): void {
  	this.positionService.getPositions().subscribe(positions => this.positions = positions);
  }
  
  add(newPosition: Position): void {
    //name = name.trim();
    if (!newPosition.title) { return; }
    this.positionService.addPosition(newPosition)
      .subscribe(newPosition => {
        this.positions.push(newPosition);
        this.newPosition = this.createPosition();
      });
  }

  delete(position: Position): void {
    this.positions = this.positions.filter(p => p !== position);
    this.positionService.deletePosition(position.id).subscribe();
  }
  
  createPosition(): Position{
  	 //return { id: null, title: '', department: '', description: '', status: '', creationDate: ''}; 
  	 return {} as Position;
  }

}
