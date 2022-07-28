export interface ITXConfig {
    chainId: number;
    data: string;
    from: string;
    gasPrice?: string;
    gasLimit?: string;
}

export interface INFT {
    metadata: string | null;
    tokenId: string;
    url: string;
}
