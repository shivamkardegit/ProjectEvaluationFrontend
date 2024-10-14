import { Component, OnInit } from '@angular/core';
import { Product } from '../../TypescriptClasses/Product';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productForm: Product = { id: 0, name: '', price: 0 };

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  createOrUpdateProduct(): void {
    if (this.productForm.id === 0) {
      // Add new product
      this.productService.createProduct(this.productForm).subscribe(() => {
        this.resetForm();
        this.getProducts();
      });
    } else {
      // Update existing product
      this.productService.updateProduct(this.productForm.id, this.productForm).subscribe(() => {
        this.resetForm();
        this.getProducts();
      });
    }
  }

  editProduct(product: Product): void {
    this.productForm = { ...product };
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProducts();
    });
  }

  resetForm(): void {
    this.productForm = { id: 0, name: '', price: 0 };
  }
}
