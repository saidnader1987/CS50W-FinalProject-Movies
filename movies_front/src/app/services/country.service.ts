import { Injectable } from '@angular/core';
import * as data from '../models/countries.json';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  jsonData: any = (data as any).default;
  getCountries(): string[] {
    const response = this.jsonData
      .map((countryObj: any): string[] => countryObj?.name?.common)
      .sort((a: string, b: string) => a.localeCompare(b));
    return response;
  }

  getFlag(country: string): string {
    const response2 = this.jsonData.filter(
      (countryObj: any) => countryObj?.name?.common === country
    );
    return response2[0].flags.png;
  }
}
