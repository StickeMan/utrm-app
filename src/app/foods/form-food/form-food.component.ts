import {Component, Inject, inject} from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

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
    public router:Router,
  ) {}

  foodId:number = -1;
  edit:boolean = false;
  activeRoute:ActivatedRoute = inject(ActivatedRoute);
  food?: Food = {
    name: '',
    description:'',
    category:'',
    image:'',
    price:0
  }

  ngOnInit(): void{
    if (this.activeRoute.snapshot.params['id']){
      this.edit = true;
      this.foodId = Number(this.activeRoute.snapshot.params['id']);
      console.log(this.foodId);
      this.food = this.serviceFood.getOne(this.foodId);
      if (this.food) {
        this.form.patchValue({
          name: this.food.name,
          category: this.food.category,
          description: this.food.description,
          image: this.food.image,
          price: this.food.price.toString()
        })
      }
    }
  }

  public sendData(){
    if (this.form.status == 'VALID') {

      if(this.getName?.value && this.getDescription?.value && this.getCategory?.value && this.getImage?.value && this.getPrice?.value){
        let priceNumber = Number(this.getPrice.value)
        let comida:Food = {
          name: this.getName?.value,
          description: this.getDescription?.value,
          category: this.getCategory?.value,
          image: this.getImage?.value,
          price: priceNumber
        };
        console.log(comida);
        this.serviceFood.addFood(comida);
        this.router.navigate(['/food/food-list'])
      }
    }
  }

  public updateData(){
    if (this.form.status == 'VALID') {

      if(this.getName?.value && this.getDescription?.value && this.getCategory?.value && this.getImage?.value && this.getPrice?.value){
        let priceNumber = Number(this.getPrice.value)
        let comida:Food = {
          id: this.foodId,
          name: this.getName?.value,
          description: this.getDescription?.value,
          category: this.getCategory?.value,
          image: this.getImage?.value,
          price: priceNumber
        };
        console.log(comida);
        this.serviceFood.updateFood(comida);
        this.router.navigate(['/food/food-list'])
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
