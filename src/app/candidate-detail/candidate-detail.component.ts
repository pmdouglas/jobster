import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Candidate } from '../Candidate';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {

  candidate: Candidate| undefined;
  
  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private location: Location
  ) { }

  ngOnInit(): void {
  	this.getCandidate();
  }

  getCandidate(): void {
  	const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  	this.candidateService.getCandidate(id).subscribe(candidate => this.candidate = candidate);
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
  	if (this.candidate){
  		this.candidateService.updateCandidate(this.candidate).subscribe(()=>this.goBack());
  	}
  }

}
