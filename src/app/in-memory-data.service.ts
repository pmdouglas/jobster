import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Position } from './Position';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const positions = [
      { id: 1, title: 'Dr Nice', department: 'doit', description: 'this is a descr', status: 'open', creationDate: '1/1/2021'},
      { id: 2, title: 'Dr Nice', department: 'doit', description: 'this is a descr', status: 'open', creationDate: '1/1/2021'},
      { id: 3, title: 'Dr Nice', department: 'doit', description: 'this is a descr', status: 'open', creationDate: '1/1/2021'},
      { id: 4, title: 'Dr Nice', department: 'doit', description: 'this is a descr', status: 'open', creationDate: '1/1/2021'},
      { id: 5, title: 'Dr Nice', department: 'doit', description: 'this is a descr', status: 'open', creationDate: '1/1/2021'},
      { id: 6, title: 'Dr Nice', department: 'doit', description: 'this is a descr', status: 'open', creationDate: '1/1/2021'},
    ];
    return {positions};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  genId(positions: Position[]): number {
    return positions.length > 0 ? Math.max(...positions.map(position => position.id)) + 1 : 1;
  }
}