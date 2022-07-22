import axios from 'axios';
import {ITXConfig} from '../@types/Api';
import {API_KEY} from '../utils/constants';

async function getTXConfig(
    signatureId: string,
    address: string,
): Promise<ITXConfig> {
    const {data} = await axios.get(
        'https://api-eu1.tatum.io/v3/kms/' + signatureId,
        {
            headers: {
                'x-api-key': API_KEY,
            },
        },
    );

    let txConfig: ITXConfig = JSON.parse(data.serializedTransaction);
    txConfig = prepareTxConfig(txConfig, address);

    return txConfig;
}

function prepareTxConfig(txConfig: ITXConfig, address: string): ITXConfig {
    txConfig.from = address;
    txConfig.gasPrice = txConfig.gasPrice
        ? parseInt(txConfig.gasPrice, 10).toString(16)
        : undefined;

    return txConfig;
}

async function sendTransaction(
    connector: any,
    data: ITXConfig,
): Promise<string> {
    const transactionHash = await connector.sendTransaction(data);
    return transactionHash;
}

export {getTXConfig, sendTransaction};
