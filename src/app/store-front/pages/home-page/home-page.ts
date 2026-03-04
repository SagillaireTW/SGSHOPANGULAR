import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from "../../../products/components/product-card/product-card";
import { ProductService } from '../../../products/services/products.service';
import { Product } from '../../../products/interfaces/product.interface';
import { Pagination } from "../../../shared/components/pagination/pagination";

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {
  private productService = inject(ProductService);

  productResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => this.productService.getProducts({})
  })
}
