import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { CSP_NONCE } from '@angular/core';
import { registerLicense } from '@syncfusion/ej2-base';
import { WebConfig } from './app/core/config/WebConfig';
const myRandomNonceValue = generateRandomNonceValue();

registerLicense(WebConfig.SF);

platformBrowserDynamic().bootstrapModule(AppModule,
  {
    providers: [{
      provide: CSP_NONCE,
      useValue: myRandomNonceValue
    }]
  })
  .catch(err => console.error(err));

function generateRandomNonceValue(): string {
    // Generate a random string for the nonce value
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 16;
    let nonce = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      nonce += characters.charAt(randomIndex);
    }
    return nonce;
}
