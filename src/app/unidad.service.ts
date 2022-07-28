import { Respuesta } from './models/respuesta';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Unidad } from './models/unidad';
import { Peticion } from './models/peticion';
@Injectable()
export class UnidadService {
  ROOT:string="http://localhost:8080/"
  ALL:string=this.ROOT+"all"
  ADD:string=this.ROOT+"add"
  constructor(private http:HttpClient) { }
  
  getUnidades(): Observable <Unidad[]>{
    return this.http.get<Unidad[]>(this.ALL)
    .pipe(
      catchError(this.handleError))
    
  }
  addUnidad(peticion : Peticion){
   // const options =  new HttpParams().set('nombre',nombre)
    return this.http.post<Respuesta>(this.ADD,peticion)
    .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);

    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(`Backend returned code ${error.status}, body was: ${error.error.error}`));
  }
}

