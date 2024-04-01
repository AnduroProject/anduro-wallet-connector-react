type Props = {
    walletUrl: string;
};
interface connectParams {
    chainId: number;
    onComplete: any;
}
interface createTransactionParams {
    transactionType: string;
    amount: number;
    receiverAddress?: string | undefined;
    feeRate?: number | undefined;
    onComplete: any;
}
interface NetworkInfo {
    chainId: any;
    networkType: string;
}
interface PropertiesType {
    type: string;
    value: string;
}
interface CreateassetParams {
    name: string;
    symbol: string;
    imageUrl: string;
    supply: number;
    properties: PropertiesType[];
    assetType: number;
    transactionType: string;
    receiverAddress: string;
    onComplete: any;
    assetId?: number;
}
interface TransferAssetParams {
    assetId: number;
    receiverAddress: string;
    supply: number;
    onComplete: any;
}
interface WalletInfo {
    accountPublicKey: string;
    connectionState: string;
}
declare const useConnector: (props: Props) => {
    connect: (params: connectParams) => Promise<unknown>;
    getNetworkInformation: () => NetworkInfo;
    send: (params: createTransactionParams) => void;
    createasset: (params: CreateassetParams) => void;
    transferasset: (params: TransferAssetParams) => void;
    disconnect: () => void;
    getWalletInformation: () => WalletInfo;
};

export { useConnector };
