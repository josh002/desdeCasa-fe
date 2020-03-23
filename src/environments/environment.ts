// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /*PC local*/
  WS_URL: 'http://localhost:3001/api/v1',
  // WS_URL: 'http://ec2-3-80-143-174.compute-1.amazonaws.com:3001/api/v1',
  // S3_URL: 'https://bebe-bucket.s3.us-east-2.amazonaws.com',
  georef_ar_api: 'https://apis.datos.gob.ar/georef/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
