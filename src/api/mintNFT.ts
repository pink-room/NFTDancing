import {CeloMintErc721, Currency} from '@tatumio/tatum';
import {API_KEY} from '../utils/constants';
import axios from 'axios';

async function createMintApiCall(
    userAddress: string,
    ipfsHash: string,
): Promise<string> {
    try {
        const mintNftRequest: CeloMintErc721 = {
            chain: Currency.CELO,
            feeCurrency: Currency.CELO,
            // tokenId: '1',
            // contractAddress: MAIN_CONTRACT_ADDRESS,
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
                    'x-api-key': API_KEY,
                },
            },
        );

        const {signatureId} = response.data;

        return signatureId;
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
    return transactionHash;
}

export {mintNFT};
