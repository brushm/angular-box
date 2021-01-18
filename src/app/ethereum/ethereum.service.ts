import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { ethers } from "ethers";

declare let window: any;
const INFURA_NETWORK = environment.infuraNetwork;
const INFURA_TOKEN = environment.infuraToken;
const ETHEREUM_URL = environment.ethUrl;

@Injectable({
  providedIn: 'root'
})
export class EthereumService {

  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.providers.JsonRpcSigner;
  private accounts: string[] = [];
  private account: string = '';

  allAccountsSubscription = new Subject<string[]>();
  accountSubscription = new Subject<string>();

  constructor() {
    // If Metamask is availabe, it will be used.
    if (window.ethereum) {
      this.configureMetaMask();

    // If an Infura Token is specified, use the infura flow
    } else if (INFURA_TOKEN) {
      this.configureInfura();

    // No Metamask or Infura so fall back to a specified ethereum node
    } else {
      this.configureRpc();
    }

    // Populate account data
    this.retrieveAccounts();
  }

  // Return an observable to retrieve all available accounts
  getAccounts() {
    return this.allAccountsSubscription.asObservable();
  }

  // Return an observable to retrieve the current active account
  getAccount() {
    return this.accountSubscription.asObservable();
  }

  // Return an asyncronous call to get the balance of an account
  async getBalanceForAccount(account: string) {
    const balance = await this.provider.getBalance(account);
    return ethers.utils.formatEther(balance);
  }

  // Retrieve all available accounts from either the blockchain or metamask
  private retrieveAccounts() {
    this.provider.listAccounts().then(accounts => {
      if (accounts === undefined || accounts.length < 1) return;
      this.accounts = accounts;
      this.account = accounts[0];
      this.allAccountsSubscription.next([...this.accounts]);
      this.accountSubscription.next(this.account);
    });
  }

  // Set up the Infura Provider
  private configureInfura() {
    this.provider = new ethers.providers.InfuraProvider(INFURA_NETWORK, INFURA_TOKEN);
    this.configureProviderEvents();
  }

  // Set up the Metamask Provider
  private configureMetaMask() {
    var self = this;
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = this.provider.getSigner();

    // Handle account changes in Metamask
    window.ethereum.on('accountsChanged', function (accounts) {
      self.retrieveAccounts();
    });

    // Handle network changes in Metamask
    window.ethereum.on('chainChanged', function (network) {
      window.location.reload();
    });
  }

  // Set up the Ethereum Node provider that connects to a specific node
  private configureRpc() {
    if (ETHEREUM_URL.startsWith("ws")) {
      this.provider = new ethers.providers.WebSocketProvider(ETHEREUM_URL);
    } else {
      this.provider = new ethers.providers.JsonRpcProvider(ETHEREUM_URL);
    }
    this.signer = this.provider.getSigner();
    this.configureProviderEvents();
  }

  // This will configure provider events for all but the Metamask provider which has it's own event listeners
  private configureProviderEvents() {
    this.provider.on('network', (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        window.location.reload();
      }
    });
  }
}
