import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from '../../../products/services/products.service';
import { ProductCard } from "../../../products/components/product-card/product-card";
import { Pagination } from "../../../shared/components/pagination/pagination";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  readonly paginationService = inject(PaginationService);

  gender = toSignal(this.route.params.pipe(
    map(({ gender }) => gender)
  ))

  productResource = rxResource({
    params: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1
    }),
    stream: ({ params }) => this.productService.getProducts({
      gender: params.gender,
      offset: params.page * 9
    })
  })
}
