import { IProductType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { ShopService } from './shop.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/products';
import { ShopParam } from '../shared/models/shopParam';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true })
  searchTerm!: ElementRef;
  products: IProduct[] = [];
  brands: IBrand[] = [];
  types: IProductType[] = [];
  shopParam = new ShopParam();
  totalCount: number = 0;
  sortOptions =[
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];
  constructor(private shopService :ShopService ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParam).subscribe(response => {
      this.products = response!.data;
      this.shopParam.pageNumber = response!.pageIndex;
      this.shopParam.pageSize = response!.pageSize;
      this.totalCount = response!.count;
    }, error => {
      console.log(error);
    });
  }
  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getType().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId: number){
    this.shopParam.brandIdSelected = brandId;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParam.typeIdSelected = typeId;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParam.sortSelect = sort;
    this.getProducts();
  }

  onPageChanged(e : any){
    if(this.shopParam.pageNumber !== e){
      this.shopParam.pageNumber = e;
    this.getProducts();
    }
  }
  onSearch(){
    this.shopParam.search = this.searchTerm.nativeElement.value;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }
  onReset(){
    this.searchTerm.nativeElement.value = undefined;
    this.shopParam = new ShopParam();
    this.getProducts();
  }
}
