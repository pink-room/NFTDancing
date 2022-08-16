import {CeloMintErc721, Currency} from '@tatumio/tatum';
import {
    TATUM_API_KEY,
    CELO_NFT_MINTER,
    TATUM_CUSTOM_CONTRACT_ADDRESS,
} from '../utils/constants';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function mintNFTCustomContract(
    userAddress: string,
    ipfsHash: string,
): Promise<string> {
    try {
        const mintNftRequest: CeloMintErc721 = {
            to: userAddress,
            url: ipfsHash,
            minter: CELO_NFT_MINTER,
            contractAddress: TATUM_CUSTOM_CONTRACT_ADDRESS,
            tokenId: '1',
            chain: Currency.CELO,
            feeCurrency: Currency.CELO,
        };

        const response = await axios.post(
            'https://api-eu1.tatum.io/v3/nft/mint/',
            {
                ...mintNftRequest,
            },
            {
                headers: {
                    'x-api-key': TATUM_API_KEY,
                    'Content-Type': 'application/json',
                },
            },
        );
        const {txId} = response.data;

        return txId;
    } catch (err: any) {
        console.log('ERRO mintNFTCustomContract');
        console.log(err.toJSON());

        return '';
    }
}

async function createMintApiCall(
    userAddress: string,
    ipfsHash: string,
): Promise<string> {
    try {
        const mintNftRequest: CeloMintErc721 = {
            chain: Currency.CELO,
            feeCurrency: Currency.CELO,
            tokenId: '1',
            contractAddress: TATUM_CUSTOM_CONTRACT_ADDRESS,
            to: userAddress,
            url: ipfsHash,
        };

        const response = await axios.post(
            'https://api-eu1.tatum.io/v3/nft/mint/',
            {
                ...mintNftRequest,
            },
            {
                headers: {
                    'x-api-key': TATUM_API_KEY,
                    'Content-Type': 'application/json',
                },
            },
        );

        const {txId} = response.data;

        return txId;
    } catch (err) {
        console.log('ERRO createMintApiCall: ', err);
        return '';
    }
}

async function mintNFT(
    accountAddress: string,
    ipfsHash: string,
): Promise<string> {
    const transactionHash = await createMintApiCall(accountAddress, ipfsHash);

    // this method mints an NFT in our deployed smart contract, but since we didn't had a paid plan, this couldn't be achieved
    /* const transactionHash = await mintNFTCustomContract(
        accountAddress,
        ipfsHash,
    ); */
    return transactionHash;
}

export {mintNFT};
