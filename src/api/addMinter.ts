import {Currency} from '@tatumio/tatum';
import axios from 'axios';
import {ITXConfig} from '../@types/Api';
import {
    CELO_NFT_MINTER,
    API_KEY,
    TATUM_CUSTOM_CONTRACT_ADDRESS,
    SIGNATURE_ID,
} from '../utils/constants';
import {getTXConfig, sendTransaction} from './transactions';

export async function addMinter(): Promise<string> {
    try {
        const mintNftRequest = {
            chain: Currency.CELO,
            contractAddress: TATUM_CUSTOM_CONTRACT_ADDRESS,
            minter: CELO_NFT_MINTER,
            index: 0,
            signatureId: SIGNATURE_ID,
            nonce: 0,
            fee: {
                gasLimit: '40000',
                gasPrice: '20',
            },
            feeCurrency: Currency.CELO,
            url: 'https://explorer.celo.org',
        };

        const response = await axios.post(
            '`https://api-eu1.tatum.io/v3/nft/mint/add`',
            {
                ...mintNftRequest,
            },
            {
                headers: {
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json',
                },
            },
        );

        const {txId} = response.data;

        return txId;
    } catch (err) {
        return '';
    }
}

export async function addNFTMinter(
    accountAddress: string,
    connector: any,
): Promise<string> {
    const signatureId = await addMinter();
    const txConfig: ITXConfig | null = await getTXConfig(
        signatureId,
        accountAddress,
    );

    if (txConfig) {
        const transactionHash = await sendTransaction(connector, txConfig);
        return transactionHash;
    }
    return '';
}
