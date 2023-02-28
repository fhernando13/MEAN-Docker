import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

import { ActivatedRoute, Router } from '@angular/router';

// Angular Material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Sweetalert
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  title="list user"
  displayedColumns: string[] = [ 'name', 'lastname', 'age', 'email', 'phone', 'edit'];
  dataSource = new MatTableDataSource();

 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  users: any = [];
 
  constructor(private usersService: UserService,
              private router: Router,
              private activedRouted: ActivatedRoute){
    
  }

  ngOnInit(){
     this.listUsers();
  }

  listUsers(){
     this.usersService.getUsers().subscribe({
      next: res =>{
        this.dataSource.data = res;
      },
      error: err =>{console.log(err)}}
    );  
  }

  askDelete(_id: string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(_id),
        Swal.fire(
          'Deleted!',
          'The user has been deleted.',
          'success'
        )
      }
      return this.listUsers();
    })
  }

  deleteUser(_id: string){
    this.usersService.deleteUser(_id).subscribe(
      {
        next: res =>{ this.users = res },
        error: err =>{console.log(err)}
      }
    )
  }

}
