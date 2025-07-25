import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts() {
    //Check if route has "id" parameter
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      this.currentCategoryId = 1;
    }


    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
        console.log("Products : ");
        for(let product of this.products) {
          console.log(JSON.stringify(product));
          console.log(product.sku+" "+product.name+" "+product.unitPrice);
        }
      }
    )
  }

}
