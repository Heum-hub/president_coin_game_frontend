import { ethers } from 'ethers'
import { abi } from './Politics_abi'
import { contractAddress } from './contractAddress';

export function Mint1(account, amountInEther, library) {    

    const signer = library?.getSigner(account).connectUnchecked()
    const contract = new ethers.Contract(contractAddress, abi, signer)

    return(
        contract.mint1({value : ethers.utils.parseEther(amountInEther)})
        .then((txObj) => {
            console.log('txHash', txObj.hash)
        })
    )

}