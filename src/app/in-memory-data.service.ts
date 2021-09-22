import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Position } from './Position';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const positions = [
      
      { id: 1, title: 'Developer I', department: 'information technology', description: 'no experience needed', status: 'open', creationDate: '1/1/2021'},
      { id: 2, title: 'Developer II', department: 'information technology', description: 'some experience needed', status: 'open', creationDate: '1/1/2021'},
      { id: 3, title: 'Developer III', department: 'information technology', description: 'lots of experience needed', status: 'open', creationDate: '1/1/2021'},
      { id: 4, title: 'Business Analyst', department: 'information technology', description: 'business experience required', status: 'open', creationDate: '1/1/2021'},
    ];
    
    
    const candidates = [
      {id: 1,  name: 'Tom Cat',  level: 'junior',  skills: '',  applyTo: 1,  accepted: false},
      {id: 2,  name: 'Jerry Mouse',  level: 'intermediate',  skills: '',  applyTo: 2, accepted: false},
      {id: 3,  name: 'Micky Rourke',  level: 'intermediate',  skills: '',  applyTo: 3, accepted: false},
      {id: 4,  name: 'Howard Rourke',  level: 'senior',  skills: '',  applyTo: 4, accepted: false}
    ];
    return {positions, candidates};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  genId(positions: Position[]): number {
    return positions.length > 0 ? Math.max(...positions.map(position => position.id)) + 1 : 1;
  }
}