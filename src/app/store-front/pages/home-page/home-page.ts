import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from "../../../products/components/product-card/product-card";
import { ProductService } from '../../../products/services/products.service';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {
  private productService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);

  currentPage = toSignal(this.activatedRoute.queryParamMap.pipe(
    map((params) => params.get('page') ? +params.get('page')! : 1),
    map((page) => isNaN(page) ? 1 : page)
  ),
    {
      initialValue: 1
    }
  );

  productResource = rxResource({
    params: () => ({ page: this.currentPage() - 1 }),
    stream: ({ params }) => this.productService.getProducts({
      offset: params.page * 9,
    })
  })
}
