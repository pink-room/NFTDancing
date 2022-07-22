import {CeloMintErc721, Currency} from '@tatumio/tatum';
import {SIGNATURE_ID, API_KEY, MAIN_CONTRACT_ADDRESS} from '../utils/constants';
import axios from 'axios';
import {ITXConfig} from '../@types/Api';
import {getTXConfig, sendTransaction} from './transactions';

async function createMintApiCall(
    userAddress: string,
    ipfsHash: string,
): Promise<string> {
    try {
        const contractMintRequest: CeloMintErc721 = {
            chain: Currency.CELO,
            signatureId: SIGNATURE_ID,
            feeCurrency: Currency.CELO,
            contractAddress: MAIN_CONTRACT_ADDRESS,
            tokenId: '',
            to: userAddress,
            url: ipfsHash,
        };

        const response = await axios.post(
            'https://api-eu1.tatum.io/v3/nft/mint/',
            {
                ...contractMintRequest,
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
    connector: any,
): Promise<string> {
    const signatureId = await createMintApiCall(accountAddress, ipfsHash);
    const txConfig: ITXConfig = await getTXConfig(signatureId, accountAddress);
    const transactionHash = await sendTransaction(connector, txConfig);
    return transactionHash;
}

export {mintNFT};
