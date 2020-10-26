import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';


@Component({
  selector: 'app-monthly-premium',
  templateUrl: './monthly-premium.component.html',
  styleUrls: ['./monthly-premium.component.scss']
})
export class MonthlyPremiumComponent implements OnInit {

  //variable declaration
  premiumForm: FormGroup;
  _occupationlist: any;
  _ratingfactorlist: any;
  rating_value: any;
  _calculatedpremium: any;
  _Infostring: any;
  occupationinvalid: boolean;
  IsAgevalid: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // set occupation and rating factors
    const _occupation = [{ name: "-- Select Occupation --", rating: "0" }, { name: "Cleaner", rating: "Light Manual" }, { name: "Doctor", rating: "Professional" }, { name: "Author", rating: "White Collar" }, { name: "Farmer", rating: "Heavy Manual" }, { name: "Mechanic", rating: "Heavy Manual" }, { name: "Florist", rating: "Light Manual" }];
    const _Ratingfactor = [{ rating: "Professional", Factor: 1.0 }, { rating: "White Collar", Factor: 1.25 }, { rating: "Light Manual", Factor: 1.50 }, { rating: "Heavy Manual", Factor: 1.75 }];
    this._occupationlist = _occupation;
    this._ratingfactorlist = _Ratingfactor;
    this.initiateForm();
  }

  initiateForm() {

    // initialize form values
    this.premiumForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z]+$'), Validators.maxLength(200)])],
      age: [, Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      DOB: ['', Validators.required],
      occupation: [0, Validators.required],
      sumInsured: [, Validators.compose([Validators.required, Validators.pattern("[0-9.]+$"), Validators.maxLength(10)])]
    });
    this._Infostring = "";
    this._calculatedpremium = "";
    this.occupationinvalid = false;
    this.IsAgevalid = true;

  }


  onOccupationChange($event) {
    // Get Rating factor value on selected occupation 
    if ($event) {
      let selected_occupation = $event.target.value;

      if (selected_occupation == '0') {
        this.occupationinvalid = true;
        this._Infostring = "";
        this._calculatedpremium = "";
      }
      else {
        this.occupationinvalid = false;
         if( this.IsAgevalid  && this.premiumForm.valid )
         this.GetPremium(selected_occupation);
      }
    }
  }
  onDOBSelect($event) {
    // calculate age 
    let _agevalue;
    if ($event) {
      let selected_DOB = $event.target.value;
      console.log(selected_DOB);
      _agevalue = this.calculateDateDiff(selected_DOB);
      if (_agevalue <= 0) {
        this.premiumForm.patchValue({ age: 0 });
        this.IsAgevalid = false;
        this._Infostring = "";
        this._calculatedpremium = "";
      }
      else {
        this.premiumForm.patchValue({ age: this.calculateDateDiff(selected_DOB) });
        this.IsAgevalid = true;
      }
    }

  }

  clearform() {
    // clear form value
    this.initiateForm();
  }

  calculateDateDiff(inp) {
    let currentDate = new Date();
    inp = new Date(inp);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(inp.getFullYear(), inp.getMonth(), inp.getDate())) / (1000 * 60 * 60 * 24) / 365);
  }

  GetPremium(Occupationvalue) {
    //calculate monthly premium


    this.rating_value = this._ratingfactorlist.filter(r => (r.rating == Occupationvalue))[0].Factor;

    this._calculatedpremium = ((this.premiumForm.get('sumInsured').value * this.rating_value * this.premiumForm.get('age').value) / 1000 * 12).toFixed(2);

    //show output on screen
    if (this._calculatedpremium != "") {
      this._Infostring = "Based on below input , Calculated Monthly Premium is $";
    }

    //

  }

  onSubmit() {
    // Formula : Death Premium = (Death Cover amount * Occupation Rating Factor * Age) /1000 * 12

    if (this.premiumForm.get('occupation').value == '0') {
      this.occupationinvalid = true;
      this._Infostring = "";
      this._calculatedpremium = "";
    }
    else {
      this.occupationinvalid = false;
      this.GetPremium(this.premiumForm.get('occupation').value);

    }

  }

}
