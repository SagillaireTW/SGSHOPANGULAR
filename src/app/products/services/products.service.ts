import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductsResponse } from '../interfaces/product.interface';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<ProductsResponse> {
    return this.http
      .get<ProductsResponse>(`http://localhost:3000/api/products?limit=52`)
      .pipe(tap((res) => console.log({ res })))
  }
}
