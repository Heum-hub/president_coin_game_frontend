import { ethers } from 'ethers'
import { abi } from './Politics_abi'
import { contractAddress } from './contractAddress'

export function Supply1(library) {    

    const contract = new ethers.Contract(contractAddress, abi, library);

    return(
        contract.token1_Balance()
        .then((txObj) => 
            ethers.utils.formatEther(txObj))
        )

}