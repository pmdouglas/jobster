import { Injectable } from '@angular/core';
import { Position } from './Position'
import { POSITIONS } from './mock-positions'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient, private messageService: MessageService) { }
  
  private positionsUrl = 'api/positions';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  getPositions(): Observable<Position[]>{
  	return this.http.get<Position[]>(this.positionsUrl)
  	  .pipe(
    	  tap(_ => this.log('fetched positions')),
  	    catchError(this.handleError<Position[]>('getPosition',[]))
  	  );
  }

  /** GET position by id. Will 404 if id not found */
  getPosition(id: number): Observable<Position> {
    const url = '${this.positionsUrl}/${id}';
    return this.http.get<Position>(url).pipe(
      tap(_ => this.log('fetched position id=' + id)),
      catchError(this.handleError<Position>('getposition id='+id))
    );
  }

  addPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(this.positionsUrl, position, this.httpOptions).pipe(
      tap((newPosition: Position) => this.log('added position with id='+newPosition.id)),
      catchError(this.handleError<Position>('addPosition'))
    );
  }

  /** PUT: update the position on the server */
  updatePosition(position: Position): Observable<any> {
    return this.http.put(this.positionsUrl, position, this.httpOptions).pipe(
      tap(_ => this.log('updated position id=' + position.id)),
      catchError(this.handleError<any>('updatePosition'))
    );
  }

  /** DELETE: delete the position from the server */
  deletePosition(id: number): Observable<Position> {
    const url = this.positionsUrl+'/'+id;

    return this.http.delete<Position>(url, this.httpOptions).pipe(
      tap(_ => this.log('deleted position id='+id)),
      catchError(this.handleError<Position>('deletePosition'))
    );
  }

  /** Log a PositionService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PositionsService: '+ message);
  }
  
  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(operation + ' failed: ' + error.message);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
