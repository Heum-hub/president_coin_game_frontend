import { base64 } from "./base64";

export function AddToken1() {
  try {
    const wasAdded = window.ethereum
    .request({
        method: 'wallet_watchAsset',
        params: {
        type: 'ERC20',
        options: {
            address: '0x493926EbA69F75D1c86Ce018773c1E52e1bcA38c',
            symbol: 'JMT',
            decimals: 18,
            image: base64[0],
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