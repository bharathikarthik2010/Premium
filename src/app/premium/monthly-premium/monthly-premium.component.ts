import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-monthly-premium',
  templateUrl: './monthly-premium.component.html',
  styleUrls: ['./monthly-premium.component.scss']
})
export class MonthlyPremiumComponent implements OnInit {


  premiumForm: FormGroup;
  _occupationlist: any;
  _ratingfactorlist: any;
  rating_value: any;
  _calculatedpremium: any;
  _Infostring: any;
  occupationinvalid: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    const _occupation = [{ name: "-- Select Occupation --", rating: "0" }, { name: "Cleaner", rating: "Light Manual" }, { name: "Doctor", rating: "Professional" }, { name: "Author", rating: "White Collar" }, { name: "Farmer", rating: "Heavy Manual" }, { name: "Mechanic", rating: "Heavy Manual" }, { name: "Florist", rating: "Light Manual" }];
    const _Ratingfactor = [{ rating: "Professional", Factor: 1.0 }, { rating: "White Collar", Factor: 1.25 }, { rating: "Light Manual", Factor: 1.50 }, { rating: "Heavy Manual", Factor: 1.75 }];
    this._occupationlist = _occupation;
    this._ratingfactorlist = _Ratingfactor;
    this.initiateForm();
  }

  initiateForm() {
    this.premiumForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z]+$'),Validators.maxLength(200)])],
      age: [, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      DOB: ['', Validators.required],
      occupation: [0],
      sumInsured: [, Validators.compose([Validators.required, Validators.pattern("[0-9.]+$")])]
    });
    this._Infostring = "";
    this._calculatedpremium = "";
    this.occupationinvalid = false;

  }

  onOccupationChange($event) {
    // Get Rating factor value on selected occupation
    if ($event) {
      let selected_occupation = $event.target.value;
      if (selected_occupation != 0) {
        this.rating_value = this._ratingfactorlist.filter(r => (r.rating == selected_occupation))[0].Factor;
        this.occupationinvalid = false;
      }
      else {
        this.occupationinvalid = true;
      }
    }
  }

  clearform() {
    this.initiateForm();
  }

  onSubmit() {
    // Formula : Death Premium = (Death Cover amount * Occupation Rating Factor * Age) /1000 * 12
    console.warn(this.premiumForm.value);
    if (this.premiumForm.get('occupation').value == '0') {
      this.occupationinvalid = true;
    }
    else {
      this.occupationinvalid = false;
      this._calculatedpremium = ((this.premiumForm.get('sumInsured').value * this.rating_value * this.premiumForm.get('age').value) / 1000 * 12).toFixed(2);


      if (this._calculatedpremium != "") {
        this._Infostring = "Based on below input , Calculated Monthly Premium -  ";
      }
    }
  }

}
