# NFTDancing

A mobile app that allows users to mint NFTs on Celo, using NFT Express.

The project uses NFTExpress and other methods available on Tatum, that permit for example the listing of NFTs a address has in a contract.

## Introduction

The NFTDDancing app allows the users to mint video NFTs with dance moves. It is divided in two major sections.

In the *Create* section, the users can mint new NFTS with their dance moves.

In the *Profile* section, the users can check their minted NFTs and see a details page clicking on the desired NFT.

## Instalation

Run the following commands by the following order


1. First run this command in a folder of your selction.
 - `git clone https://github.com/pink-room/NFTDancing.git` 

2. Then, enter the project folder automatically created
 - `cd NFTDancing`

3. Install all dependencies
 - `yarn install`

	If you're runnig on iOS, be sure to also run these commands
 	- iOS
		- `cd ios && pod install`
		- (for M1 users): `sudo arch -x86_64 gem install ffi && cd ios && arch -x86_64 pod install`

## Run the App

To run the app, one must be in the root folder of the project.

 - Android
	- `yarn android`
 - iOS
	- `yarn ios`

## Roadmap

The following steps for the project are:

- Change the NFT standard from 721 to 1155;
- List all available dance NFTs in the marketplace;
- Allow users to mint fungible tokens of each dance move, which grants them the right to use the dance move in social media or for commercial purposes, paying a percentage back to the original creator;
- Add the fungible tokens the user owns in the Profile page;

## Security

The project is not audited and should not be used in production. 

The app is a submission for a [Gitcoin Bounty](https://gitcoin.co/issue/28659).
