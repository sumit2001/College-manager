import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private auth:AuthService) { }
studentData:any;
flag:boolean=false;
  ngOnInit(): void {
    
this.auth.loadStudentData().subscribe(data=>{
  console.log(data,"aja");
  this.studentData=data;
})
  }
saveData(event){
  event.preventDefault();
  const target=event.target;
  const name=target.querySelector('#name').value;
  const rollno=target.querySelector('#rollno').value;
  const sclass=target.querySelector('#class').value;
  const section=target.querySelector('#section').value;
  if(name!=''&&rollno!=''&&sclass!=''&&section!=''){

    console.log("Coming",name,rollno,sclass,section);

    this.auth.saveStudentData(name,rollno,sclass,section).subscribe(data=>{
  this.ngOnInit();
    
      console.log(data);
  })
  
  
  }
  else{
    window.alert("Fill all the details")
  }
}

updateList(id,i,sec,event){
  console.log(sec,event.target.textContent)
  let temp;
  if(sec=="name"){
    temp={
      _id:id,
      name :event.target.textContent
    }
  }
  else if(sec=="rollno"){
    temp={
      _id:id,
      rollno :event.target.textContent,
      }
  }
  else if(sec=="sclass"){
    temp={
      _id:id,
      sclass:event.target.textContent,
      }
  }
  else{
    temp={
      _id:id,
      section :event.target.textContent
    }
  }
  console.log(temp)
  this.auth.updateStudentData(temp).subscribe(data=>{
    console.log(data);
  // const section=event.target.querySelector('#'+sec).value;
  // console.log(section);

})
}

deleteUser(id){
  let data={
    "_id":id
  }
  this.auth.delStudentData(data).subscribe(data=>{
    console.log(data); 
    this.ngOnInit();
})

}


}
