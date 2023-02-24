import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  
  
  buttonToggle: any;

  constructor(){
    
  }

  ngOnInit(): void {
    this.btnToogle();
  }

  btnToogle(): void{
    const buttonToggle = document.querySelector('.toggle-btn') as HTMLInputElement | null;
    if(buttonToggle != null){
      buttonToggle.addEventListener('click', ()=>{
      console.log('click');
      document.getElementById('sidebar')?.classList.toggle('active');
    })
  }
  }
    
  }


