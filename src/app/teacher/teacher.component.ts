import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl,FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private auth:AuthService) { }
  
  orderForm: FormGroup;
  items: FormArray;
  // orderForm = new FormGroup({
  //   name: new FormControl('', [
  //     Validators.required,

  //   ])
  // })
  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      name:  ['', Validators.required],
      id:['', Validators.required],
      items: this.formBuilder.array([ this.createItem() ])
    });
    this.getapi();
  }
teacherData:any;
  getapi(){
    this.auth.loadTeacherData().subscribe(data=>{
      console.log(data,"aja");
      this.teacherData=data;
    })
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      sclass: ['', Validators.required],
      section: ['', Validators.required]
    });
  }
  deleteItem(index: number) {
    this.items.removeAt(index);
  }
  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

 
  deleteUser(id){
    let data={
      "_id":id
    }
    console.log(data);
    this.auth.delTeacherData(data).subscribe(data=>{
      console.log(data); 
  })
  this.getapi();
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
  else if(sec=="id"){
    temp={
      _id:id,
      id :event.target.textContent,
      }
  }
  console.log(temp)
  this.auth.updateTeacherData(temp).subscribe(data=>{
    console.log(data);

  // const section=event.target.querySelector('#'+sec).value;
  // console.log(section);

})
}

updateInnerList(id,i,sec,event,j,k){
  console.log(sec,event.target.textContent)
  let temp;
  if(sec=="sclass"){
    temp={
      _id:id,
      cs :[{
        "sclass":event.target.textContent,
        "section":this.teacherData[j].cs[k].section
      }]
    }
  }
  else if(sec=="section"){
    temp={
      _id:id,
      cs :[{
        "sclass":this.teacherData[j].cs[k].sclass,
        "section":event.target.textContent
      }]
      }
      // this.getapi();
  }
  console.log(temp)
  this.auth.updateTeacherData(temp).subscribe(data=>{
    console.log(data);
    this.getapi();
  // const section=event.target.querySelector('#'+sec).value;
  // console.log(section);

})
}


  saveData(){

    let temp={
      name:this.orderForm.get('name').value,
      id:this.orderForm.get('id').value,
      cs:this.orderForm.get('items').value
    
  }
  console.log(temp)

    this.auth.saveTeacherData(temp).subscribe(data=>{
      console.log(data);
    })
    this.getapi();
  }
  
}
