import { ethers } from 'ethers'
import { abi } from './Politics_abi'
import { contractAddress } from './contractAddress';

export function Refund2(account, amountInEther, library) {    

    const signer = library?.getSigner(account).connectUnchecked()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    const amountToRefund = ethers.utils.parseEther(amountInEther)

    return(
        contract.refund2(amountToRefund)
        .then((txObj) => {
            console.log('txHash', txObj.hash)
        })
    )

}