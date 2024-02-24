import {Route} from '@angular/router';
import {FoodListComponent} from './food-list/food-list.component';

export default [
  {
    path: "food-list",
    component: FoodListComponent
  },
] satisfies Route[];
