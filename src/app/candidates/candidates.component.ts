import { Component, OnInit } from '@angular/core';
import { Candidate } from '../Candidate';
import { CandidateService } from '../candidate.service';
import { PositionService } from '../position.service';
//import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Position } from '../Position';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  candidates: Candidate[] = [];
  newCandidate: Candidate = this.createCandidate();
  positions: Position[] =[];
  
  constructor(private candidateService: CandidateService, private positionService: PositionService) { }

  ngOnInit(): void {
  	this.getCandidates();
  	this.getPositions();
  }

  getCandidates(): void {
  	this.candidateService.getCandidates().subscribe(candidates => this.candidates = candidates);
  }
  
  getPositions(): void {
  	this.positionService.getPositions().subscribe(positions => this.positions = positions);
  }
  
  add(newCandidate: Candidate): void {
    //name = name.trim();
    if (!newCandidate.name) { return; }
    this.candidateService.addCandidate(newCandidate)
      .subscribe(newCandidate => {
        this.candidates.push(newCandidate);
        this.newCandidate = this.createCandidate();
      });
  }
  
  delete(candidate: Candidate): void {
    this.candidates = this.candidates.filter(c => c !== candidate);
    this.candidateService.deleteCandidate(candidate.id).subscribe();
  }
  
  createCandidate(): Candidate{
  	return {} as Candidate
  }
  
}
