import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Superhero } from '../../models/superhero.interface';
import { SuperheroService } from '../../services/superhero.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-superhero',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent implements OnInit {
  public superheroForm!: FormGroup;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() mode: string = 'CREATE';
  @Input() superhero: Superhero = {
    name: '',
    alias: '',
    age: 0,
    height: 0,
    weight: 0,
    superpowers: [],
  };
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  private formBuilder = inject(FormBuilder);
  private superheroService = inject(SuperheroService);

  ngOnInit(): void {
    this.superheroForm = this.formBuilder.group({
      alias: [null, [Validators.required]],
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      height: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      superpowers: [null, [Validators.required]],
      image: [null, [Validators.required]],
    });

    if (this.superhero) {
      this.superheroForm.patchValue({
        alias: this.superhero.alias,
        name: this.superhero.name,
        age: this.superhero.age,
        height: this.superhero.height,
        weight: this.superhero.weight,
        superpowers: this.superhero.superpowers,
        image: this.superhero.image,
      });
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  removeSuperpower(superpower: string) {
    const index = this.superhero.superpowers.indexOf(superpower);

    if (index >= 0) {
      this.superhero.superpowers.splice(index, 1);
    }
  }

  addSuperpower(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.superhero.superpowers.push(value);
    }
    event.chipInput!.clear();
  }

  submit() {
    if (this.mode === 'CREATE') {
      let superhero = this.superheroForm.value;
      superhero.id = uuidv4();
      this.superheroService.createSuperhero(superhero).subscribe();
    } else if (this.mode === 'EDIT') {
      this.superheroService
        .editSuperhero({
          ...this.superheroForm.value,
          id: this.superhero.id,
        })
        .subscribe(() => {
          this.closeModalEvent.emit();
        });
    }
  }

  get alias() {
    return this.superheroForm.controls['alias'];
  }

  get name() {
    return this.superheroForm.controls['name'];
  }

  get age() {
    return this.superheroForm.controls['age'];
  }

  get height() {
    return this.superheroForm.controls['height'];
  }

  get weight() {
    return this.superheroForm.controls['weight'];
  }

  get superpowers() {
    return this.superheroForm.controls['superpowers'];
  }

  get image() {
    return this.superheroForm.controls['image'];
  }
}
