/*
Project : Anduro Wallet Connector
FileName : handleResponse.tsx
Author : 
File Created : 13/04/2024
CopyRights : 
Purpose : This is the file that is used to store error message verbiage
*/

const FAIL_PROCESS = "Can't process your request"
export const ERROR_MESSAGES = {
  walletNotConnected: "The wallet is not connected.",
  transactionTypeRequired: `${FAIL_PROCESS}, Transaction Type is required`,
  transactionTypeInvalid: `${FAIL_PROCESS}, Invalid transaction type`,
  amountRequired: `${FAIL_PROCESS}, Amount is required`,
  nameRequired: `${FAIL_PROCESS}, Name is required`,
  symbolRequired: `${FAIL_PROCESS}, Symbol is required`,
  imageUrlRequired: `${FAIL_PROCESS}, Image Url is required`,
  supplyRequired: `${FAIL_PROCESS}, Supply is required`,
  assetTypeRequired: `${FAIL_PROCESS}, Asset Type is required`,
  assetTypeInvalid: `${FAIL_PROCESS}, Invalid Asset Type`,
  assetIdRequired: `${FAIL_PROCESS}, Asset Id is required`,
  receiverAddressRequired: `${FAIL_PROCESS}, Receiver Address is required`,
  precisionRequired: `${FAIL_PROCESS}, Precision is required.`,
}
