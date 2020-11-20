import { Injectable } from '@angular/core';

import{HttpClient} from '@angular/common/http';
import{environment} from '../environments/environment';
interface studentResponse{
  success:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // hangmanServer= environment.apiBaseUrl;
  hangmanServer="https://whispering-inlet-08924.herokuapp.com";
  constructor(private http: HttpClient){}
  saveStudentData(name,rollno,sclass,section){
    console.log("coming",name,rollno,sclass,section);
    return this.http.post<studentResponse>(`${this.hangmanServer}/api/student`,{
      name,
      rollno,
      sclass,
      section
    })
  }
  delStudentData(data){
    // console.log("coming",name,rollno,sclass,section);
    return this.http.post(`${this.hangmanServer}/api/student/deleteData`,data)
  }
  
  updateStudentData(data){
    console.log("coming",data);

    return this.http.post(`${this.hangmanServer}/api/student/update`,data)
  }

  loadStudentData(){
    // console.log("coming",name,rollno,sclass,section);
    return this.http.get(`${this.hangmanServer}/api/student`)
  }

  saveTeacherData(temp){
    console.log("coming",temp);
    return this.http.post(`${this.hangmanServer}/api/teacher`,temp)
  }

  loadTeacherData(){
    // console.log("coming",name,rollno,sclass,section);
    return this.http.get(`${this.hangmanServer}/api/teacher`)
  }
  delTeacherData(data){
    // console.log("coming",name,rollno,sclass,section);
    return this.http.post(`${this.hangmanServer}/api/teacher/deleteData`,data,{responseType: 'text'})
  
  }

  updateTeacherData(data){
    console.log("coming",data);

    return this.http.post(`${this.hangmanServer}/api/teacher/update`,data)
  }
  // ${this.hangmanServer}
}
