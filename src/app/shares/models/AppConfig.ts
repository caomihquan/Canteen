import { MetaDefinition } from "@angular/platform-browser";

export abstract class AppConfig {
  ContentPolicy: MetaDefinition[];
  IdleTime: number;
  strUrl:string;
  SF:string;
  CONSTANT_KEY:string;
}
