import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  getsations():Observable<void>{
    return this.http.get<void>("https://localhost:7175/api/Home/AllStations");
  }
  betweenTrains(staionFrom:string,stationTo:string,date:string){
    return this.http.get(`https://localhost:7175/api/Home?staionFrom=${staionFrom}&stationTo=${stationTo}&date=${date}`)
  }
  postRegister(register:object){
    console.log(register)
    return this.http.post( 'https://localhost:7175/api/Home/register',register);
  }
  userdetails(username:string,password:string){
    return this.http.get(`https://localhost:7175/api/Home/userdetails?username=${username}&password=${password}`)
  }
  userbookings(id:string){
    return this.http.get(`https://localhost:7175/api/Home/trainbyNumber?id=${id}`)
  }
  postbookings(books:any){
    return this.http.post(`https://localhost:7175/api/Home/postbookings`,books)
  }
  passengerBookings(bookings:any){
    return this.http.post('https://localhost:7175/api/Home/passenegerBokings',bookings)
  }
  updateTrain(upTrain:any){
    return this.http.put('https://localhost:7175/api/Home/updateTrain',upTrain);
  }
}
