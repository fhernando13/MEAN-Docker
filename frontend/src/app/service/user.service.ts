import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  API_URI ='http://localhost:4000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(this.API_URI);    
  }

  saveUser(user: User){
    return this.http.post(this.API_URI,user);
  }

  deleteUser(_id:string): Observable<any>{
    return this.http.delete(this.API_URI+'/'+_id);
  }

  getUser(_id: string): Observable<any>{
    return this.http.get(this.API_URI+'/'+_id);
  }
  
  updateUser(_id: string, updateUser: User): Observable<any>{
    return this.http.put(this.API_URI+'/'+_id, updateUser);
  }
}