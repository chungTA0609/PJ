import { ShopParam } from './../shared/models/shopParam';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProductType } from '../shared/models/productType';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }
  getProducts(shopParam: ShopParam) {
    let params = new HttpParams();

    if (shopParam.brandIdSelected !== 0) {
      params = params.append('brandId', shopParam.brandIdSelected.toString());
    }
    if (shopParam.typeIdSelected !== 0) {
      params = params.append('brandId', shopParam.typeIdSelected.toString());
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

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'product/brand');
  }
  getType() {
    return this.http.get<IProductType[]>(this.baseUrl + 'product/type');
  }
}
