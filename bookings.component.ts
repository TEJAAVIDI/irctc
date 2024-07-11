import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [FormsModule,CommonModule,],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {
  id!:string;
  status:boolean=false
  bookingstatus:boolean=true
  traindetails:any[]=[];
  tbookedseats!:string;
  ttrainDepatTime!:string;
  ttrainFrom!:string;
  ttrainNumber!:string;
  ttrainTo!:string;
  ttrainname!:string;
  constructor(private route:ActivatedRoute, private service : ServiceService){
    this.route.params.subscribe((res)=>{
      this.id=res['id']
    })
    this.bookings();
   
  }
  adding(){
    this.bookingstatus =false
  }
  bokki(){
    this.status =true
  }
  bookings(){
    this.service.userbookings(this.id).subscribe((res)=>{
      this.traindetails.push(res)
      this.tbookedseats = this.traindetails[0].bookedseats
      this.ttrainDepatTime = this.traindetails[0].trainDepatTime
      this.ttrainFrom = this.traindetails[0].trainFrom
      this.ttrainNumber = this.traindetails[0].trainNumber
      this.ttrainTo = this.traindetails[0].trainTo
      this.ttrainname = this.traindetails[0].trainname
   })
  }

}
