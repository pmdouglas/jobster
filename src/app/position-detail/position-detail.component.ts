import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Position } from '../Position';
import { PositionService } from '../position.service';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.css']
})
export class PositionDetailComponent implements OnInit {
	
	position: Position | undefined;

  constructor(
    private route: ActivatedRoute,
    private positionService: PositionService,
    private location: Location
  ) { }

  ngOnInit(): void {
  	this.getPosition();
  }

  getPosition(): void {
  	const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  	this.positionService.getPosition(id).subscribe(position => this.position = position);
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
  	if (this.position){
  		this.positionService.updatePosition(this.position).subscribe(()=>this.goBack());
  	}
  }

}
