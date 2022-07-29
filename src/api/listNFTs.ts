import {Currency} from '@tatumio/tatum';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TATUM_CUSTOM_CONTRACT_ADDRESS, API_KEY} from '../utils/constants';
import axios from 'axios';
import {INFTResponse} from './@types/NFTResponse';

// Code that we didn't used, because we couldn't deploy and mint in our custom Smart Contract
/* export async function listAllNFT() {
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
                    'x-api-key': API_KEY,
                },
            },
        );
    } catch (error) {
        console.log(error);
    }
} */

export async function listMyNFT(
    accountAddress: string,
): Promise<INFTResponse[]> {
    const requestData = {
        chain: Currency.CELO,
    };

    const response = await axios.get(
        `https://api-eu1.tatum.io/v3/nft/address/balance/${requestData.chain}/${accountAddress}`,
        {
            headers: {
                'x-api-key': API_KEY,
            },
        },
    );

    return response.data[0].metadata;
}
