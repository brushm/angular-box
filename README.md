# AngularBox

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Ethereum Connnections

To use the connection to ethereum, please import the EthereumService service in src/app/ethereum.

If Metamask is available in the browser, it will be the first choice for ethereum connections. Otherwise Infura or a specified Ethereum Node can be specified. This can be configured in the environment files.

The default dev server will be configured to connect to local ganache on port 7545 or use Metamask if it is available. To start a local version of Ganache run `npm run ganache` in a terminal.

Run `npm run start:ropsten` for a dev server that will use Infura to connect to the ropsten network.

Run `npm run start:prod` to run a dev version of the production server that will connect to Infura on mainnet

To use Infura specify a token in the environment file using the parameter infurToken. The network can be configured with the property infuraNetwork. This property takes the name of the network, ie.. homestead, ropsten. If it is not specified homestead/mainnet will be used.

To use a specified node, configure the ethUrl property in the environment files and do not set a Infura token.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

There is also a build configuration for the ropsten network by running `npm run build:ropsten` option.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
