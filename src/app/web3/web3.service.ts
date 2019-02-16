import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';

declare let window: any;

const ETHEREUM_URL = environment.ethUrl;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private web3: Web3;

  private accounts: string[];
  private accountsListener = new Subject<string[]>();

  constructor() {
    const self = this;
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      if ('enable' in window.ethereum) {
        window.ethereum.enable()
          .then((accounts: string[]) => {
            self.accounts = accounts;
            self.accountsListener.next(self.accounts);
            window.ethereum.publicConfigStore.on('update', (result) => {
              this.accountsListener.next([result.selectedAddress]);
            });
          })
          .catch(() => {
            console.error('User denied access');
          });
      }
    } else if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
      this.getAccounts();
    } else {
      this.web3 = new Web3(ETHEREUM_URL);
      this.getAccounts();
    }
  }

  getWeb3() {
    return this.web3;
  }

  getAccountsListener() {
    return this.accountsListener.asObservable();
  }

  async getAccounts() {
    this.accounts = await this.web3.eth.getAccounts();
    this.accountsListener.next(this.accounts);
    return this.accounts;
  }
}
