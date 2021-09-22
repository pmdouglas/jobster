import { Injectable } from '@angular/core';
import { Candidate } from './Candidate'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient, private messageService: MessageService) { }
  
  private candidatesUrl = 'api/candidates';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  getCandidates(): Observable<Candidate[]>{
  	return this.http.get<Candidate[]>(this.candidatesUrl)
  	  .pipe(
    	  tap(_ => this.log('fetched candidates')),
  	    catchError(this.handleError<Candidate[]>('getCandidates',[]))
  	  );
  }
  
  /** GET candidate by id. Will 404 if id not found */
  getCandidate(id: number): Observable<Candidate> {
    const url = this.candidatesUrl+ '/' +id;
    return this.http.get<Candidate>(url).pipe(
      tap(_ => this.log('fetched candidate id=' + id)),
      catchError(this.handleError<Candidate>('getCandidate id='+id))
    );
  }
  
  /**POST new candidate */
  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.candidatesUrl, candidate, this.httpOptions).pipe(
      tap((newCandidate: Candidate) => this.log('added position with id='+newCandidate.id)),
      catchError(this.handleError<Candidate>('addCandidate'))
    );
  }
  
  /** PUT: update the candidate on the server */
  updateCandidate(candidate: Candidate): Observable<any> {
    return this.http.put(this.candidatesUrl, candidate, this.httpOptions).pipe(
      tap(_ => this.log('updated candidate id=' + candidate.id)),
      catchError(this.handleError<any>('updateCandidate'))
    );
  }
  
  /** DELETE: delete the candidate from the server */
  deleteCandidate(id: number): Observable<Candidate> {
    const url = this.candidatesUrl+'/'+id;

    return this.http.delete<Candidate>(url, this.httpOptions).pipe(
      tap(_ => this.log('deleted candidate id='+id)),
      catchError(this.handleError<Candidate>('deleteCandidate'))
    );
  }
  
  
  /** Log a CandidateService message with the MessageService */
  private log(message: string) {
    this.messageService.add('CandidatesService: '+ message);
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
