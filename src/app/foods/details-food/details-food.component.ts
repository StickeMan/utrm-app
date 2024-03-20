import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../shared';
import { FoodService } from '../shared';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-details-food',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TitleCasePipe, CurrencyPipe, MatIcon],
  templateUrl: './details-food.component.html',
  styleUrl: './details-food.component.scss'
})
export class DetailsFoodComponent implements OnInit{

  constructor(public  foodService:FoodService){

  }

  activedRoute: ActivatedRoute = inject(ActivatedRoute)
  foodId:number = -1;
  food?:Food = {
    name:'',
    description:'',
    category: '',
    image:'',
    price:0

  }

  ngOnInit(): void{
    this.foodId = Number(this.activedRoute.snapshot.params['id']);
    this.food = this.foodService.getOne(this.foodId);
    console.log(this.food);
  }
}
