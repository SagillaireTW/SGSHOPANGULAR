import { Component, input } from '@angular/core';
import { Product } from '../../../../products/interfaces/product.interface';
import { ProductSwiper } from "../../../../products/components/product-swiper/product-swiper";

@Component({
  selector: 'product-details',
  imports: [ProductSwiper],
  templateUrl: './product-details.html',
})
export class ProductDetails {
  product = input.required<Product>();

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
}
