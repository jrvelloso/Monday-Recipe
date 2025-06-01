import { IIngredients } from 'src/interfaces/iingredients';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngredientsService } from 'src/services/ingredients.service';



@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

   Form!: FormGroup;
   // categories: any[] = []; // Define your categories array
    selected: any;
    ingredients!: IIngredients[];


    constructor(private Service: IngredientsService, private fb: FormBuilder) {
      this.Form = this.fb.group({
        name: ['', Validators.required],
        isActive: [false]
      });
     }

     ngOnInit(): void {
      this.fetch();
    };

    fetch(): void {
      this.Service.getAll().subscribe((data: IIngredients[]) => {
            this.ingredients = data;
        console.log(data);
      });
    }

    select(item: IIngredients): void {
      this.selected = { ...item };
      this.Form.patchValue({
        name: item.name,
        isActive: item.isActive
      });
    }

    create(item: IIngredients): void {
      this.Service.create(item).subscribe(() => {
        this.fetch();
        this.clearForm();
      });
    }


    update(): void {
      if (this.selected) {
        this.Service.update(this.selected.id, this.selected).subscribe(() => {
          this.fetch();
          this.clearForm();
        });
      }
    }


    delete(id: number): void {
      this.Service.delete(id).subscribe(() => {
        this.fetch();
      });
    }

    onSubmit() {
      if (this.Form.valid) {
        if (this.selected) {
          // Update selected with form values
          this.selected.name = this.Form.value.name;
          this.selected.isActive = this.Form.value.isActive;
          this.update();
        } else {
          this.create(this.Form.value);
        }
      }
    }

    clearForm() {
      this.Form.reset();
      this.selected = null;
    }

}
