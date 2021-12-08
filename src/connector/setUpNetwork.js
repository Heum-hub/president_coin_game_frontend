/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */

export const setupNetwork = async () => {

  const provider = window.ethereum

  const nodes = ["https://bsc-dataseed1.ninicoin.io"]//"https://api.cypress.ozys.net:8651"]//, "https://kaikas.cypress.klaytn.net:8651"] // , "https://api.baobab.klaytn.net:8651"]

  if (provider) {

    const chainId = parseInt("56", 10)

    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Binance Smart Chain',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'bnb',
              decimals: 18,
            },
            rpcUrls: nodes,
            blockExplorerUrls: ["https://bscscan.com/"]//`https://scope.klaytn.com`], //`https://baobab.scope.klaytn.com`
          },
        ],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the Klaytn network on metamask because window.ethereum is undefined")
    return false
  }
}
