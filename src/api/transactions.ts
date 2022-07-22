import {ITXConfig} from '../@types/Api';

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

export {prepareTxConfig, sendTransaction};
