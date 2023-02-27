import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

//Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.css']
})
export class UserFormsComponent implements OnInit{
  private emailPattern: any =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  title = "Add information the user";
  button = "save";
  _id: string|null;

createFormGroup() {
  return new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(60)]),
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.emailPattern)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]), 
  });
}

  userForm: FormGroup | any;

  constructor(private usersService: UserService,
              private router: Router,
              private activedRouted: ActivatedRoute){
  this.userForm = this.createFormGroup();
  this._id = this.activedRouted.snapshot.paramMap.get('_id');
}
  
get name() {
  return this.userForm.get('name');
}

get lastname() {
  return this.userForm.get('lastname');
}

get age() {
  return this.userForm.get('age');
}

get email() {
  return this.userForm.get('email');
}

get phone() {
  return this.userForm.get('phone');
}

  ngOnInit(): void{    
    this.isUpdate();
  }

   isUpdate(){    
    if(this._id){
      this.title = "Update user";
      this.button = "Update"
      const data = this.usersService.getUser(this._id)
      .subscribe(
        {
          next: data=>(this.userForm.setValue(            
            {
             name: data.name,
             lastname: data.lastname,
             age: data.age,
             email: data.email,
             phone: data.phone
           }
          )),
          error: err=>(console.log(err)),
        }
      )
    }
  }

  buttonSave(){
    if(this._id !== null){
      this.usersService.updateUser(this._id, this.userForm.value).subscribe({
        next: data =>(this.userForm = data),
        error: err => console.log(err),
      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User has been updated',
        showConfirmButton: false,
        timer: 1500
      })    
    }else{
      //create user
    if(this.userForm){
      console.log(this.userForm);
      this.usersService.saveUser(this.userForm.value).subscribe({
        next: res => this.userForm.value = res,
        error: (err) => console.log(err)
      })
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })      
    }else {
      console.log('error');
    }
    }//back to home
    return this.router.navigate(['/users']);
  }

  backToHome(){
    Swal.fire({
      title: 'Are you sureAre you sure you want to go to Home?',
      text: "Your changes will not be saved!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, go to Home it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/users'])
      }
    })
  }
  

  
}
