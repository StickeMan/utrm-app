import {Component} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {Food, FoodService} from "../shared";

@Component({
  selector: 'app-form-food',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButton,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './form-food.component.html',
  styleUrl: './form-food.component.scss'
})
export class FormFoodComponent {

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    category: ['', [Validators.required]],
    image: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(2)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    public serviceFood: FoodService,
  ) {}

  public sentData() {
    if (this.form.status === 'VALID') {
      if (
        this.getName?.value &&
        this.getDescription?.value &&
        this.getCategory?.value &&
        this.getImage?.value &&
        this.getPrice?.value
      ) {
        let priceNumber = Number(this.getPrice?.value);
        let comida: Food = {
          name: this.getName?.value,
          description: this.getDescription?.value,
          category: this.getCategory?.value,
          image: this.getImage?.value,
          price: priceNumber
        }
        this.serviceFood.addFood(comida);
      }
    }
  }

  get getName() {
    return this.form.get('name');
  }

  get getDescription() {
    return this.form.get('description');
  }

  get getCategory() {
    return this.form.get('category');
  }

  get getImage() {
    return this.form.get('image');
  }

  get getPrice() {
    return this.form.get('price');
  }
}
