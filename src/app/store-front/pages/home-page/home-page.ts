import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from "../../../products/components/product-card/product-card";
import { ProductService } from '../../../products/services/products.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage {
  items = Array(12).fill(0);

  private productService = inject(ProductService);

  productResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => this.productService.getProducts()
  })
}
