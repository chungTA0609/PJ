import { IProduct } from './../shared/models/products';
import { ShopParam } from './../shared/models/shopParam';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProductType } from '../shared/models/productType';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getProducts(shopParam: ShopParam) {
    let params = new HttpParams();

    if (shopParam.brandIdSelected !== 0) {
      params = params.append('brandId', shopParam.brandIdSelected.toString());
    }
    if (shopParam.typeIdSelected !== 0) {
      params = params.append('brandId', shopParam.typeIdSelected.toString());
    }

    if(shopParam.search){
      params = params.append('search', shopParam.search);
    }
    params = params.append('sort', shopParam.sortSelect);
    params = params.append('pageIndex', shopParam.pageNumber.toString());
    params = params.append('pageIndex', shopParam.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'product', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'product/' + id);
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'product/brand');
  }
  getType() {
    return this.http.get<IProductType[]>(this.baseUrl + 'product/type');
  }
}
