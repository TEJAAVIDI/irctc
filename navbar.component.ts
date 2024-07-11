import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  username:string="";
  useremail:string="";
  password:string="";
  conpassword:string="";
  status:boolean=false;
  displau!:any;
  logged:boolean=false;
  errortext:string="error message";
  list!:any;
  logins!:any;
  loggeduser:string="";
  loggedpassword:string="";
  constructor(private service:ServiceService,private route:Router){
    this.logeduserl();
    if (this.displau!=null){
      this.logged = true;
    }else{
      this.logged = false;
    }
  }
  ngOnInit(): void {
    this.logeduserl();
  }
  logeduserl(){
    var z =localStorage.getItem("login");
      this.displau =z;
       console.log(this.displau);
  }
  
  login(){
    debugger
    console.log("login success")
      this.service.userdetails(this.loggeduser,this.loggedpassword).subscribe((res)=>{
        if (res!=null){
          console.log(res);
          this.logins=res;
          localStorage.setItem("login",this.loggeduser)
          console.log(this.logins)
          localStorage.setItem("user",this.logins.userid)
          console.log(this.logins.userid)
          this.logeduserl();
          this.logged = true;
          
        }else{
          console.log("login fail")
          this.logged = false;
        }
        
      })
      
  }
  

  register(){
    this.list = {
      "userid": "5de2140c-f492-4f20-4dce-08dc9db36396",
      "name": this.username,
      "email": this.useremail,
      "password": this.password,
      "phonenumber": 0
    }
    //console.log(this.list)
    debugger;
    //this.service.postRegister(this.list).subscribe((res)=>{console.log(res)})
    if (this.username == "" || this.useremail =="" || this.password =="" || this.conpassword == ""){
        this.errortext="Fill all the fields"
        this.status=true
    }else   
    if (this.password==this.conpassword && this.username != "" && this.useremail!="" ){
      console.log(this.list)
      this.service.postRegister(this.list).subscribe((res)=>{
        alert("succesfully registered")
        
        console.log(res);
        
      }) 
    }
    else if (this.password!=this.conpassword){
      this.errortext="Passowrd should be match ..please check"
      this.status=true
    }
  }
  logout(){
    this.loggeduser="";
    this.loggedpassword =""
    alert(` Thanks ${this.displau} for Using this App`)
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    this.logeduserl();
    this.logged = false;
    console.log(this.logged)
    this.route.navigateByUrl('/navbar/home')
    
  }
}
