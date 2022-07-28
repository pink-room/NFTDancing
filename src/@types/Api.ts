export interface ITXConfig {
    chainId: number;
    data: string;
    from: string;
    gasPrice?: string;
    gasLimit?: string;
}

export interface NFT {
    metadata: string | null;
    tokenId: string;
    url: string;
}
