import {CeloDeployErc721, Currency} from '@tatumio/tatum';
import {SIGNATURE_ID, API_KEY} from '../utils/constants';
import axios from 'axios';
import {TXConfig} from '../@types/Api';

async function createContractApiCall(): Promise<string> {
    try {
        const contractDeployRequest: CeloDeployErc721 = {
            name: 'Pink Dancers',
            chain: Currency.CELO,
            feeCurrency: Currency.CELO,
            symbol: 'PD',
            signatureId: SIGNATURE_ID,
        };

        const response = await axios.post(
            'https://api-eu1.tatum.io/v3/nft/deploy/',
            {
                ...contractDeployRequest,
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
        console.log('ERRO createContractApiCall: ', err);
        return '';
    }
}

async function getContractInfo(
    signatureId: string,
    address: string,
): Promise<TXConfig> {
    const {data} = await axios.get(
        'https://api-eu1.tatum.io/v3/kms/' + signatureId,
        {
            headers: {
                'x-api-key': API_KEY,
            },
        },
    );

    let txConfig: TXConfig = JSON.parse(data.serializedTransaction);
    txConfig = prepareTxConfig(txConfig, address);

    return txConfig;
}

function prepareTxConfig(txConfig: TXConfig, address: string): TXConfig {
    txConfig.from = address;
    txConfig.gasPrice = txConfig.gasPrice
        ? parseInt(txConfig.gasPrice).toString(16)
        : undefined;

    return txConfig;
}

async function sendTransaction(
    connector: any,
    data: TXConfig,
): Promise<string> {
    const transactionHash = await connector.sendTransaction(data);
    return transactionHash;
}

async function getContractAddress(hash: string): Promise<string> {
    try {
        const contractInformation = await axios.get(
            'https://api-eu1.tatum.io/v3/blockchain/sc/address/CELO/' + hash,
            {
                headers: {
                    'x-api-key': API_KEY,
                },
            },
        );

        return contractInformation.data.contractAddress;
    } catch (err) {
        console.log('ERRO getContractAddress: ', err);
        return '';
    }
}

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deployNftContract(
    account: string,
    connector: any,
): Promise<string> {
    const signatureId = await createContractApiCall();
    const txConfig: TXConfig = await getContractInfo(signatureId, account);
    const transactionHash = await sendTransaction(connector, txConfig);
    await timeout(3000);
    const contractAddress = await getContractAddress(transactionHash);
    return contractAddress;
}

export {deployNftContract};
