import {
    deployNFT,
    CeloDeployErc721,
    Currency,
    TransactionHash,
} from '@tatumio/tatum';
import {SIGNATURE_ID} from '../utils/constants';

async function createContract(): Promise<string> {
    try {
        const contractDeployRequest: CeloDeployErc721 = {
            name: 'Pink Dancers',
            chain: Currency.CELO,
            feeCurrency: Currency.CELO,
            symbol: 'PD',
            signatureId: SIGNATURE_ID,
        };
        console.log('BEFORE DEPLOYING');
        const creationTransactionHash: TransactionHash = await deployNFT(
            false,
            contractDeployRequest,
        );
        console.log('DEBUG createContract -> ', creationTransactionHash);
        return creationTransactionHash.txId;
    } catch (err) {
        console.log(err);
        return '';
    }
}

export {createContract};
