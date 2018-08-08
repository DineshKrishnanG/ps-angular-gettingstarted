import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './products.service';
 

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    private pageTitle: string = 'Product List';
    private imageWidth: number = 50;
    private imageMargin: number = 2;
    private showImage: boolean = false;
    errorMessage: any ;

    private _listFilter:string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filterProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    filterProducts: IProduct[];
    products: IProduct[] = [];
    

      constructor(private productService: ProductService) {
        this.listFilter = '';//cart 
      }

      ngOnInit(): void {
        console.log('Inisde ngOnInit');
        this.productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filterProducts = this.products;
            },
            error => this.errorMessage = <any> error
        );
        //this.products = this.productService.getProducts().subscribe();
        
      }

      toggleImage(): void {
          this.showImage = !this.showImage;
      }

      performFilter(filterBy: string): IProduct[] {
          console.log
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter( (product: IProduct) => 
                product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }

      onRatingClicked(message: string): void {
        console.log(`Notification received - ${message}`);
        this.pageTitle = `Product List - ${message}`;
      }
}