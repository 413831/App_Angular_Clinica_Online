import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.css']
})
export class AltaAdminComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  
  constructor() { }

  ngOnInit(): void {
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
