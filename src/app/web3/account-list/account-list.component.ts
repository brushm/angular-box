import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: string[];

  constructor(private web3service: Web3Service) { }

  async ngOnInit() {
    const self = this;
    this.accounts = await this.web3service.getAccounts();
    this.web3service.getAccountsListener().subscribe(result => {
      self.accounts = result;
    });
  }

}
