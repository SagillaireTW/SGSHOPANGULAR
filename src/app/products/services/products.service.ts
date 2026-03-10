import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  private productCache = new Map<string, Product>();
  private productsCache = new Map<string, ProductsResponse>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;

    if (this.productsCache.has(key))
      return of(this.productsCache.get(key)!);

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        }
      })
      .pipe(
        tap((res) => console.log({ res })),
        tap((res) => this.productsCache.set(key, res)),
      )
  }

  getProductBySlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug))
      return of(this.productCache.get(idSlug)!);

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(
        tap((res) => console.log({ IDSLUG: res })),
        tap((res) => this.productCache.set(idSlug, res))
      );
  }

  getProductById(id: string):Observable<Product> {
    if (this.productCache.has(id))
      return of(this.productCache.get(id)!);

    return this.http.get<Product>(`${baseUrl}/products/${id}`)
      .pipe(
        tap((res) => console.log({ id: res })),
        tap((res) => this.productCache.set(id, res))
      );
  }
}
