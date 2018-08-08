import { Injectable } from "@angular/core";
import { IProduct } from "./product";

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products/products.json';

  constructor( private http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productsUrl).pipe(
            tap( data => console.log('All : '+ JSON.stringify(data)) ),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
      let errorMsg = '';
      if( err.error instanceof ErrorEvent){
        errorMsg = `An error occurred: ${err.error.message}`;
      }else {
        errorMsg = `Server returned code: ${err.error.code} return message: ${err.error.message}`;
      }
      console.error(errorMsg);
      return throwError(errorMsg);
    }
}