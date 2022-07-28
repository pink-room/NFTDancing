import {CeloDeployErc721, Currency} from '@tatumio/tatum';
import {SIGNATURE_ID} from '../utils/constants';
import axios from 'axios';
import {PAID_API_KEY} from '../utils/constants';
import {ITXConfig} from '../@types/Api';
import timeout from '../utils/timeout';
import {getTXConfig, sendTransaction} from './transactions';

async function createContractApiCall(): Promise<string> {
    try {
        const contractDeployRequest: CeloDeployErc721 = {
            name: 'Pink Dancers',
            chain: Currency.CELO,
            feeCurrency: Currency.CELO,
            symbol: 'PDNFT',
            signatureId: SIGNATURE_ID,
        };

        const response = await axios.post(
            'https://api-eu1.tatum.io/v3/nft/deploy/',
            {
                ...contractDeployRequest,
            },
            {
                headers: {
                    'x-api-key': PAID_API_KEY,
                },
            },
        );

        const {signatureId} = response.data;

        return signatureId;
    } catch (err) {
        console.log('ERRO createContractApiCall: ');
        console.log(err.toJSON());
        return '';
    }
}

async function getContractAddress(hash: string): Promise<string> {
    try {
        const contractInformation = await axios.get(
            'https://api-eu1.tatum.io/v3/blockchain/sc/address/CELO/' + hash,
            {
                headers: {
                    'x-api-key': PAID_API_KEY,
                },
            },
        );

        return contractInformation.data.contractAddress;
    } catch (err) {
        console.log('ERRO getContractAddress: ', err);
        return '';
    }
}

async function deployNftContract(
    accountAddress: string,
    connector: any,
): Promise<string> {
    const signatureId = await createContractApiCall();
    const txConfig: ITXConfig | null = await getTXConfig(
        signatureId,
        accountAddress,
    );
    if (txConfig) {
        const transactionHash = await sendTransaction(connector, txConfig);
        await timeout(3000);
        const contractAddress = await getContractAddress(transactionHash);
        return contractAddress;
    }
    return '';
}

export {deployNftContract};
