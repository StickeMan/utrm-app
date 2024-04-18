import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {Food} from './food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  API_URL: string = '';

  constructor(private http: HttpClient) {
    this.API_URL = `${environment.API_URL}`;
  }

  public getAll():Observable<Food[]> {
    return this.http.get<Food[]>(this.API_URL+'foods/all');
  }

  public addFood(food: Food):Observable<Food> {
    return this.http.post<Food>(this.API_URL+'foods/save', food)
  }

  public deleteFood(deleteFood: Food):Observable<unknown> {
    return this.http.delete(this.API_URL+'foods/delete/'+deleteFood.id);
  }

  public getOne(id: number):Observable<Food> {
    return this.http.get<Food>(this.API_URL+'foods/find/'+id);
  }
}
