import { ethers } from 'ethers'
import { abi } from './Politics_abi'
import { contractAddress } from './contractAddress';

export function Refund1(account, amountInEther, library) {    

    const signer = library?.getSigner(account).connectUnchecked()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    const amountToRefund = ethers.utils.parseEther(amountInEther)

    return(
        contract.refund1(amountToRefund)
        .then((txObj) => {
            console.log('txHash', txObj.hash)
        })
    )

}