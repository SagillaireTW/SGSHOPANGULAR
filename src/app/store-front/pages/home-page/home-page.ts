import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from "../../../products/components/product-card/product-card";
import { ProductService } from '../../../products/services/products.service';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {
  private productService = inject(ProductService);
  readonly paginationService = inject(PaginationService);

  productResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => this.productService.getProducts({
      offset: params.page * 9,
    })
  })
}
