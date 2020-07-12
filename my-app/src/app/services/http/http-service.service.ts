
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Observer, of} from "rxjs";
import {FlowersType} from "../../types/FlowersType";
import {catchError, tap} from "rxjs/operators";
import {PotsType} from "../../types/PotsType";
import {AccessoriesType} from "../../types/AccessoriesType";


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private url1 = "http://localhost:8080/flower";
  private url2 = "http://localhost:8080/pot";
  private url3 = "http://localhost:8080/accessories";


  constructor(private httpClient: HttpClient) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


  public getFlowers(): Observable<FlowersType[]> {
    return this.httpClient.get<FlowersType[]>(this.url1).pipe(tap(() => console.log("Fetch Flowers")),
      catchError(this.handleError<FlowersType[]>("getFlowers", [])));
  }

  public getFlower(id: number): Observable<FlowersType> {
    const url = `${this.url1}/${id}`;
    console.log(url);
    return this.httpClient.get<FlowersType>(url).pipe(
      tap(_ => console.log(`fetched flower id=${id}`)),
      catchError(this.handleError<FlowersType>(`getFlower id=${id}`)))

  }

  public getPots(): Observable<PotsType[]> {
    return this.httpClient.get<PotsType[]>(this.url2).pipe(tap(() => console.log("Fetch Pots")),
      catchError(this.handleError<PotsType[]>("getPots", [])));
  }

  public getPot(id: number): Observable<PotsType> {
    const url = `${this.url2}/${id}`;
    console.log(url);
    return this.httpClient.get<PotsType>(url).pipe(
      tap(_ => console.log(`fetched pot id=${id}`)),
      catchError(this.handleError<PotsType>(`getPot id=${id}`))
    );
  }

  public getAccessories(): Observable<AccessoriesType[]> {
    return this.httpClient.get<AccessoriesType[]>(this.url3).pipe(
      tap(() => console.log("Fetch Accessories")),
      catchError(this.handleError<AccessoriesType[]>("getAccessories", [])));
  }

  public getAccessor(id: number): Observable<AccessoriesType> {
    const url = `${this.url3}/${id}`;
    console.log(url);
    return this.httpClient.get<AccessoriesType>(url).pipe(
      tap(_ => console.log(`fetched accessor id=${id}`)),
      catchError(this.handleError<AccessoriesType>(`getAccessor id=${id}`))
    );
  }

}
