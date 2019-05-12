import { Injectable } from '@angular/core';

interface ICommonService {
  sendEmail(): void;
  printForm(): void;
}

@Injectable()
export class CommonService implements ICommonService {
  sendEmail() {}
  printForm() {}
}
