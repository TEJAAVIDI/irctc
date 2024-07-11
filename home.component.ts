import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Subscription } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    stationsList:any[]=[];
    stationcode:string="0";
    travelDate!:string;
    Tostationcode:string="0";
    status:boolean =false;
    text:string="";
    obj:any=[];
  
  constructor(private service:ServiceService, private Route:Router){
    this.stations();
    //console.log(this.stationsList)
    
  }
  ngOnInit(): void {
    
  }
  stations(){
    this.service.getsations().subscribe((result)=>{
      this.stationsList.push(result);
      // console.log(result)
    })
  }
  search(){
    this.obj= {
      stationcode:this.stationcode,
      Tostationcode:this.Tostationcode,
      travelDate:this.travelDate
    }
    console.log(this.obj)
    if (this.obj.stationcode == this.obj.Tostationcode){
      this.text="From Station and To station should not be same"
        this.status=true
    }else if ( this.obj.stationcode == "0" || this.obj.Tostationcode =="0") {
      this.text="Please select From Station or To station"
       this.status=true
    }
    else{
      this.status=false
      this.Route.navigateByUrl(`/navbar/search/${this.stationcode}/${this.Tostationcode}/${this.travelDate}`)
    }
  // console.log(this.obj)
  }
}
