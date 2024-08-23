/*
Project : Anduro Wallet Connector
FileName : handleWalletWindow.tsx
Author : 
File Created : 13/04/2024
CopyRights : 
Purpose : This is the file that is used to handle wallet window.
*/
/**
 * The following function used to handle wallet window opening part
 * @param url The URL of the page to open.
 * @returns A reference to the opened window
 */
export const openWalletWindow = (url: any) => {
  var inputWidth = 370
  var inputHeight = 550
  const viewportwidth = document.documentElement.clientWidth
  const tempW: any = window.top?.outerWidth
  const tempH: any = window.top?.outerHeight
  const tempSY: any = window.top?.screenY
  const tempSX: any = window.top?.screenX
  var y = tempH / 2 + tempSY - inputHeight / 2
  var x = tempW / 2 + tempSX - inputWidth / 2
  if (viewportwidth > 800) {
    x = viewportwidth - 300
    y = 0
  }
  return window.open(
    url,
    "_blank",
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${1}, height=${1}, right=0, top=${y}, left=${x}`,
  )
}
