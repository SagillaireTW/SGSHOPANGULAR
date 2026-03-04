import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from "../../../products/components/product-card/product-card";
import { ProductService } from '../../../products/services/products.service';
import { Product } from '../../../products/interfaces/product.interface';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage {
  private productService = inject(ProductService);

  productResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => this.productService.getProducts({})
  })
}
