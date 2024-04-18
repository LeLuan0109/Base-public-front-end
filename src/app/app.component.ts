import { Component } from '@angular/core';
import { MessagingService } from '@shared/services/messaging.service';
import { SwPush } from '@angular/service-worker';
import { ConsoleLogService } from '@shared/services/console-log.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // message;
  constructor(private messagingService: MessagingService, private swPush: SwPush,
    private consoleLogService: ConsoleLogService
  ) {
    // this.messagingService.requestPermission()
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage
  }

  ngOnInit() {
    this.requestSubscription()
    this.consoleLogService.disableConsoleInProduction();
  }

  requestSubscription = () => {
    if (!this.swPush.isEnabled) {
      console.log("Notification is not enabled.");
      return;
    }

    this.swPush.requestSubscription({
      serverPublicKey: 'BF-kjmRJnOPzBqbEzOw6o7PzWsfj1mFqcv49XtarTMUOVvpA3AsOUEodiFu9sVA4HoBmLjXe5ZU8RtwC5u2z_kk'
    }).then((_) => {
      console.log(JSON.stringify(_));
    }).catch((_) => console.log);
  };

  title = 'edu soln';
}
