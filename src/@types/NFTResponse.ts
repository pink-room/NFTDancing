import {IMetadata} from '../../@types/NFT';

export interface INFTResponse {
    metadata: IMetadata;
    tokenId: string;
    url: string;
}
