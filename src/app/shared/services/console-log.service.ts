import { Injectable } from "@angular/core";
import { environment } from "@env";

@Injectable({
  providedIn: 'root',
})
export class ConsoleLogService {

  disableConsoleInProduction(): void {
    if (environment.production) {
      console.warn = function (): void { };
      console.log = function (): void { };
      console.debug = function (): void { };
      console.warn = function (): void { };
      console.info = function (): void { };
    }
  }
}