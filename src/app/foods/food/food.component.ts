import {CurrencyPipe, TitleCasePipe} from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {Food} from '../shared';
import {FoodService} from '../shared';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CurrencyPipe,
    TitleCasePipe,
    RouterModule,
  ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})
export class FoodComponent {
  @Input() food?: Food;

  constructor(public foodService: FoodService, public dialog: MatDialog) {

  }

  public openDialog(food: Food):void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: food,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFood(food)
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  public deleteFood(food: Food) {
    this.foodService.deleteFood(food).subscribe({
      next:() => console.log('Se esta eliminando'),
      error:(e) => console.error(e),
      complete:() => console.info('Complete'),
    })
  }
}
