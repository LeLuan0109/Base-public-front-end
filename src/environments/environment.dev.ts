// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  graphQLUri: 'http://117.4.242.212:10081/graphql',
  apiBaseUrl: 'http://localhost:8091/api/v1/',

  // apiBaseUrl: 'http://117.4.242.212:10081/api/',

  domain: '117.4.242.212',
  firebase: {
    apiKey: 'AIzaSyCj4RBdashyNlWhzWoBuknH73DIGpRauxg',
    authDomain: 'sls-project-5e7d6.firebaseapp.com',
    projectId: 'sls-project-5e7d6',
    storageBucket: 'sls-project-5e7d6.appspot.com',
    messagingSenderId: '192892038583',
    appId: '1:192892038583:web:fbb99ec3628550da88cc32',
    measurementId: 'G-8PWC8BLD7H'
  },
  websocket: {
    wsEndpoint: 'ws://103.97.125.32:32014/notification',
    reconnectInterval: 5000
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
