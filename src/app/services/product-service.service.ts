import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../TypescriptClasses/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private baseUrl = 'http://localhost:8097/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Object> {
    console.log("Create called");
    return this.http.post(`${this.baseUrl}`, product);
  }

  updateProduct(id: number, product: Product): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
