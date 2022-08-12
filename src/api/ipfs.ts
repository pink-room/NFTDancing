import {IMetadata} from './../@types/NFT';
import {PINATA_API_KEY, PINATA_API_SECRET} from '../utils/constants';
import axios from 'axios';

export async function uploadToVideoIPFS(data: FormData): Promise<string> {
    const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data,
        {
            headers: {
                pinata_api_key: `${PINATA_API_KEY}`,
                pinata_secret_api_key: `${PINATA_API_SECRET}`,
                'content-type': 'multipart/form-data',
            },
        },
    );

    return `ipfs://${response.data.IpfsHash}`;
}

export async function uploadToJSONIPFS(data: IMetadata): Promise<string> {
    const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        JSON.stringify(data),
        {
            headers: {
                pinata_api_key: `${PINATA_API_KEY}`,
                pinata_secret_api_key: `${PINATA_API_SECRET}`,
            },
        },
    );

    return `ipfs://${response.data.IpfsHash}`;
}

export async function retrieveFromIPFS(ipfsHash: string) {
    const response = await axios.get(
        `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
    );

    console.log(response);

    return response.data;
}
