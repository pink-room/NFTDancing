import {Currency} from '@tatumio/tatum';
import {TATUM_CUSTOM_CONTRACT_ADDRESS, PAID_API_KEY} from '../utils/constants';
import axios from 'axios';
import { NFT } from '../@types/Api';

export async function listAllNFT() {
    try {
        const query = new URLSearchParams({
            pageSize: '10',
            offset: '0',
        }).toString();

        const listNFTRequest = {
            chain: Currency.CELO,
            address: TATUM_CUSTOM_CONTRACT_ADDRESS,
        };

        const response = await axios.get(
            `https://api-eu1.tatum.io/v3/nft/collection/${listNFTRequest.chain}/${listNFTRequest.address}?${query}`,
            {
                headers: {
                    'x-api-key': PAID_API_KEY,
                },
            },
        );

        console.log('RESPONSE');
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export async function listMyNFT(accountAddress: string): NFT[] {
    const requestData = {
        chain: Currency.CELO,
    };

    const response = await axios.get(
        `https://api-eu1.tatum.io/v3/nft/address/balance/${requestData.chain}/${accountAddress}`,
        {
            headers: {
                'x-api-key': PAID_API_KEY,
            },
        },
    );

    return response.data[0].metadata;
}
