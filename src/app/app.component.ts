import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ReactiveForms';

  group: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, this.validateAge]),
    civilStatus: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
    comments: new FormArray([
      new FormControl('')
    ])
  });

  validateAge(control: AbstractControl) {
    const value = control.value;
    let error = null;
    if (!Number(value) || value != "") {
      error = { ...error, notNumber: 'Debe ser un número' };
    } else {
      if (Number(value) < 18)
        error = { ...error, over18: 'Debe se mayor de 18 años' };
    }

    return error;
  }

  getComments() {
    return (this.group.get('comments') as FormArray).controls;
  }

  addComment() {
    this.getComments().push(
      new FormControl('')
    )
  }

  deleteComment(index) {
    this.getComments().splice(index, 1);
  }

  onSubmit() {
    const validForm = this.group.valid;
    if(validForm){
      alert("Formulario correcto");
    } else {
      alert("Formulairo erróneo");
    }
  }
}
