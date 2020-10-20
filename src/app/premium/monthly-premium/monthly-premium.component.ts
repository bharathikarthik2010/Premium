import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators  ,FormGroup} from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-monthly-premium',
  templateUrl: './monthly-premium.component.html',
  styleUrls: ['./monthly-premium.component.scss']
})
export class MonthlyPremiumComponent implements OnInit {

  premiumForm : FormGroup;
  _occupationlist :any;
  _ratingfactorlist : any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    
    const _occupation = [{ name: "Cleaner", rating: "Light Manual" }, {name: "Doctor", rating: "Professional" }];
    const _Ratingfactor = [{rating: "Professional" , Factor: 1.0},{rating: "Light Manual" , Factor : 1.50}];
    this._occupationlist = _occupation;
    this._ratingfactorlist =_Ratingfactor;
    this.initiateForm();
  }

  initiateForm()
  {
    this.premiumForm = this.fb.group({
      name: ['', Validators.required],
      age: [0,Validators.required],
      DOB: ['',Validators.required],
      occupation: ["Cleaner"],
      sumInsured: [0]
    });
  }

  onOccupationChange($event)
  {

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.premiumForm.value);
  }

}
