import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = "http://localhost:3000"
  constructor(private httpClient: HttpClient) {
  }


  get(url: string){
    const actualUrl = this.baseUrl.concat(url)
    return this.httpClient.get(actualUrl,{
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }
    })
  }

  post(url: string, data: any){
    const actualUrl = this.baseUrl.concat(url)
    return this.httpClient.post(actualUrl, data, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }
    })
  }


}
