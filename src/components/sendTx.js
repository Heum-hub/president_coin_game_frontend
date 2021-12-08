import { ethers } from 'ethers'

export function sendTx(account, amountInEther, receiverAddress, library) {    

    const signer = library?.getSigner(account).connectUnchecked()
    
    const tx = {
        to: receiverAddress,
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther(amountInEther)
    }

    // Send a transaction
    // A transaction result can be checked in a etherscan with a transaction hash
    return(
        signer?.sendTransaction(tx)
        .then((txObj) => {
            console.log('txHash', txObj.hash)
        })        
    )

}