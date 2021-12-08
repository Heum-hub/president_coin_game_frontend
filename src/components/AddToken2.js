import { base64 } from "./base64";

export function AddToken2() {
  try {
    const wasAdded = window.ethereum
    .request({
        method: 'wallet_watchAsset',
        params: {
        type: 'ERC20',
        options: {
            address: '0x337c37cf9f50944738D489f688117eC3c30FCDe6',
            symbol: 'SYT',
            decimals: 18,
            image: base64[1],
            },
        },
    });
    
    if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }

}