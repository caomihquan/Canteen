import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { AppRoutes } from 'src/app/shares/constants/AppRoutes';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { WebConfig } from '../config/WebConfig';
import { LanguageService } from 'src/app/shares/services/language/language.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHead: boolean = false;
  constructor(private router: Router,
    private _user:AuthService,
    private idle: Idle,
    private keepalive: Keepalive,
    private _langSevice:LanguageService
    ){
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const route = Object.values(AppRoutes)
        if (event.url.includes(AppRoutes.login) ||  !_user.getUser()) {
          this.showHead = false;
        }
        else if(event.url.includes(AppRoutes.changepassword)){
          this.showHead = false;
        }
        else {
          this.showHead = true;
        }
      }
    });

    //idle time
    idle.setIdle(WebConfig.IdleTime);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      console.log('No longer idle.');
      idle.watch();
    });

    idle.onTimeout.subscribe(() => {
      console.log('Timed out!');
      localStorage.clear()
      this.router.navigate([AppRoutes.login]);
    });

    idle.onIdleStart.subscribe(() => {
      console.log('You\'ve gone idle!');
    });


    keepalive.interval(15);
    this._user.checkLogin().subscribe(userLoggedIn => {
      if (userLoggedIn) {
        idle.watch()
      } else {
        idle.stop();
      }
    })
    this.getLanguage();

  }

  getLanguage = async() =>{
    this._langSevice.I18LangService = await this._langSevice.getLanguage();
  }

}
