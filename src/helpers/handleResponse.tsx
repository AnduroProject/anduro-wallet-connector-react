/*
Project : Anduro Wallet Connector
FileName : handleResponse.tsx
Author : 
File Created : 13/04/2024
CopyRights : 
Purpose : This is the file that is used to handle response structure.
*/

/**
 * The following function used to handle error response structure
 * @param error
 */
export const handleErrorResponse = (error: any = null) => {
  return { status: false, result: null, error }
}
/**
 * The following function used to handle success response structure
 * @param result
 */
export const handleSuccessResponse = (result: any = null) => {
  return { status: true, result: result.result ? result.result : result, error: null }
}
