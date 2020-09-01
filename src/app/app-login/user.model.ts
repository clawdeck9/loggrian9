export class User {
    constructor(
        public name: string,
      private _jwt: string
    ) {}
  
    get token() {
    //   if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
    //     return null;
    //   }
      return this._jwt;
    }
  }
  