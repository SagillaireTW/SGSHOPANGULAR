import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '../../../../products/interfaces/product.interface';
import { ProductSwiper } from "../../../../products/components/product-swiper/product-swiper";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { FormErrorLabel } from "../../../../shared/components/form-error-label/form-error-label";
import { ProductService } from '../../../../products/services/products.service';

@Component({
  selector: 'product-details',
  imports: [ProductSwiper, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = input.required<Product>();
  productService = inject(ProductService);

  fb = inject(FormBuilder)

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [
      Validators.required,
      Validators.pattern(FormUtils.slugPattern),

    ]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kids|unisex/)]]
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit() {
    this.setFormValue(this.product())
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any)
    // this.productForm.patchValue(formLike as any)
    this.productForm.patchValue({ tags: formLike.tags?.join(', ') })
  }

  onSizeChange(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size, 1))
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes })
  }

  onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;
    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...formValue as Partial<Product>,
      tags: formValue.tags
      ?.toLowerCase()
      .split(',')
      .map((tag) => tag.trim()) ?? [],
    }

    this.productService.updateProduct(this.product().id, productLike).subscribe(
      product => console.log('Actualizado')
    )
  }
}
