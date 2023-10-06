import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private appService: AppService, private router: Router){

  }

  title = 'angular-app';
  isLogin = true
  user: any = {
    userName: "",
    password: ""
  }

  handleSubmit(){
    //here we have to call api

    if(this.isLogin) {
      this.appService.post("/auth",this.user).subscribe({
        next: (data)=> {
          console.log(data)
          
          setTimeout(()=>this.handleGetUserlist(), 3000)
          // this.handleGetUserlist();
        },
        error: (err)=>{
          console.log(err)
          alert(err.error.err)
          this.user = {}
        }
      })
    }else {
      this.appService.post("/create-user",this.user).subscribe({
        next: (data)=> {
          console.log(data)
          sessionStorage.setItem("users",JSON.stringify(this.user))
          setTimeout(()=>this.handleGetUserlist(), 3000)
        },
        error: (err)=>{
          console.log(err)
          alert(err.error.err)
          this.user = {}
        }
      })
    }


    console.log(this.user)
  }

  handleGetUserlist() {

    ///redirect user to user page
    // this.router.navigate(["users"])

    this.appService.get("/get-details").subscribe({
      next: (data)=> {
        console.log(data)
      },
      error: (err)=>{
        console.log(err)
        alert(err.error.err)
        this.user = {}
      }
    })
  }

  changePageStatus() {
    this.isLogin = !this.isLogin;
  }


}
