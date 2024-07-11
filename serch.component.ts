import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';


@Component({
  selector: 'app-serch',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './serch.component.html',
  styleUrl: './serch.component.css'
})
export class SerchComponent implements OnInit {
  stations:any[]=[];
  status:boolean=false
  bookingstatus:boolean=true
  userlogged:any;
  userloggedId:any;
  fromstation:string="0";
  Tostation:string="0"
  trainFrom:string="Secundrabad";
  trainTo:string="Kakinada";
  date:string="2024/07/07"
  Alltrains:any[]=[];

  bookedList:any[]=[];
  bookingusername:string="";
  bookinguserage!:number;
  upi:string="upi";
  net:string="net";

  constructor(private  service:ServiceService,private Route:ActivatedRoute, private Router:Router){
    this.getsattions();
    this.logeduserl();
    this.Route.params.subscribe((res)=>{
      this.trainFrom=res['trainName'];
       this.trainTo=res['trainTo'];
       this.date=res['date']
    })
    
    //this.search();
    //this.swap();
  }
  ngOnInit(): void {
    this.search();
    //this.swap();
    
  }
  postbookings(){
    
    
  }

  confirm(){
    debugger;
    console.log(this.upi)
    //console.log(this.bookedList[0]);
    console.log(this.bookedList)
    this.service.passengerBookings(this.bookedList).subscribe((res)=>{
      this.Router.navigateByUrl('/navbar/bookings')
    })
    
    this.service.updateTrain()
    
  }
  add(){
    this.bookedList.push({
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "passengername": this.bookingusername,
      "passage": this.bookinguserage,
      "parentId": this.userloggedId,
    });
    console.log(this.bookedList)
    console.log(this.bookingusername)
    console.log(this.bookinguserage)
  }
  delete(bookedname:string){
    for (let i of this.bookedList){
      debugger
      if (bookedname==i.bookedname){
        console.log("user Available",i.bookedname )
        this.bookedList.splice(i,1)
      }
    }
  }
  adding(){
    this.bookingstatus =false
  }
  bokki(i:any){
    
      this.status =true
      console.log(i);
    
  }

  logeduserl(){
    var z =localStorage.getItem("login");
      this.userlogged =z;
       //console.log(this.displau);
  }
  getsattions(){
    this.service.getsations().subscribe((res)=>{
      this.stations.push(res);
    })
  }
  betweentrains(){
    
    this.service.betweenTrains(this.trainFrom,this.trainTo,this.date).subscribe((res)=>{
      
      this.Alltrains.push(res)
      console.log(this.Alltrains)
    })
  }
  serviceses(){

  }
  search(){
    this.Alltrains=[];
    console.log(this.trainFrom);
    console.log(this.trainTo)
    if (this.trainFrom ==this.trainTo){
      this.Alltrains=[];
      alert("both station codes same... change and try again")
      this.Alltrains=[];
      this.betweentrains();
    }else{
      this.Alltrains=[];
      this.betweentrains();

    }    
  }
  book(){
    this.logeduserl()
    if (this.userlogged != null ) {
      this.status =true
      const x = localStorage.getItem("user");
      this.userloggedId=x;
    }
      else {
        alert("please Login")
      }
   }
  // swap(){
  //   this.trainFrom=this.trainTo
  //   this.trainTo = this.trainFrom
  //   console.log(this.trainFrom);
  //   console.log(this.trainTo)
  //   this.Alltrains=[];
  //     this.service.betweenTrains(this.trainFrom,this.trainTo,this.date).subscribe((res)=>{
      
  //       this.Alltrains.push(res)
  //     })
  // }
}
