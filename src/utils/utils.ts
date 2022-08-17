import {IMetadata} from '../@types/NFT';
import {INFTResponse} from '../@types/NFTResponse';

export function trimIpfsHash(ipfsHash: string): string {
    // trim the hash to the right format
    const trimmed = ipfsHash.slice(7);
    return trimmed;
}

export function extractNFT(nftResponse: INFTResponse): IMetadata {
    const nft: IMetadata = {
        name: nftResponse?.metadata?.name,
        description: nftResponse?.metadata?.description,
        video: nftResponse?.metadata?.video,
    };
    return nft;
}
