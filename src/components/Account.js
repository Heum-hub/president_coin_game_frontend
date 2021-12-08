// 클레이에서  BNB 전환

import { ethers } from 'ethers'
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../connector";
import { setupNetwork } from "../connector/setUpNetwork";
import { formatEther } from '@ethersproject/units'
import { Mint1 } from './Mint1'
import { Mint2 } from './Mint2'
import { AddToken1 } from "./AddToken1";
import { AddToken2 } from "./AddToken2";
import { Supply1 } from "./Supply1";
import { Supply2 } from "./Supply2";
import { Refund1 } from "./Refund1";
import { Refund2 } from "./Refund2";
import "./Account.css";

import React, {useState, useEffect} from 'react';


function Account() {

    const {chainId, account, library, activate, deactivate, active} = useWeb3React()

    const activateWallet = () => {
        if (setupNetwork()) {
            activate(injectedConnector)
        }
    }
    
    const deactivateWallet = () => {
        deactivate(injectedConnector)
        alert("지갑 연결이 해제되었습니다!")
    }

    const [balance, setBalance] = useState()

    const getKlayBalance = () => {
      library
        .getBalance(account)
        .then((balance) => {
          if (!false) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!false) {
            setBalance(null)
          }
        })
    }

    useEffect(() => {
      if (account && library) {

        getKlayBalance()

        return () => {
          setBalance(undefined)
        }
      }
    }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

    const [supply1, setSupply1] = useState(0.00);

    useEffect(() => {

        //const provider = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option))
        const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.ninicoin.io");

        Supply1(provider)
        .then(val => setSupply1(val))

        setInterval(() =>
        Supply1(provider)
        .then(val => setSupply1(val))
        , 5000)
        
    }, [])

    const [supply2, setSupply2] = useState(0.00);

    useEffect(() => {

        // const provider = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option))
        const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.ninicoin.io");

        Supply2(provider)
        .then(val => setSupply2(val))

        setInterval(() =>
          Supply2(provider)
          .then(val => setSupply2(val))
          , 5000)
        
    }, [])


    const [sendAmount, setSendAmount] = useState("");

    const sendAmountChange = (event) => {
      setSendAmount(event.target.value);
    }

    const [refundAmount, setRefundAmount] = useState("");

    const refundAmountChange = (event) => {
      setRefundAmount(event.target.value);
    }

    return (
        <div class="intro"> 
                <h5>2022 대통령 게임! 머니 파워는 누구를 향하는가? 여러분의 지지를 보여주세요!</h5>
                <h5>"명" 코인 발행량: {parseFloat(supply1).toFixed(2)}     VS    "열" 코인 발행량: {parseFloat(supply2).toFixed(2)}</h5>
                <h5>당신의 지갑 주소 : {account} </h5>
                <h5>당신의 BNB 잔고: {balance === null ? 'Error' : balance ?  `${parseFloat(formatEther(balance)).toFixed(2)}` : ''}</h5>
                {active ? (
                   <button onClick = {deactivateWallet}>
                        메타마스크 연결 해제
                    </button>
                ) : (
                  <button onClick = {activateWallet}>
                      메타마스크 연결 하기
                  </button>
                )}
                <br></br>
                <br></br>
                <br></br>
                <a href = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target='_blank'>
                  혹시라도 메타마스크가 설치되지 않았다면? 메타마스크 설치하러 가기</a>
                <h5>송금하실 BNB 수량(최소 0.01개 이상 송금) : <input type = "number" onChange = {sendAmountChange} /></h5>                  
                <button onClick = {() => Mint1(account, sendAmount, library)
                .then(() => setTimeout(() => getKlayBalance(), 15000))
                .then(() => AddToken1())
                }>
                    "명" 코인 받기
                </button>
                {'                       '}
                <button onClick = {() => Mint2(account, sendAmount, library)
                .then(() => setTimeout(() => getKlayBalance(), 15000))
                .then(() => AddToken2())
                }>
                    "열" 코인 받기
                </button>
                <h5>송금하신 BNB 수량의 100배만큼 "명" 혹은 "열" 코인이 입급됩니다(1 BNB = 100 "명" = 100 "열")</h5>
                <h5>BNB는 빗썸(빗썸에서 구매 시 바이낸스로 출금 후 재출금 필요), 바이낸스에서 구매 가능합니다. 구매 후 메타마스크(BSC)로 전송하여 서비스를 이용해주세요!</h5>
                <h5>발행받으신 "명" 혹은 "열" 코인을 다시 BNB로 반환받으실 수 있습니다(2022년 3월 31일까지, 수수료 1.8% 제외)</h5>
                <h5>송금하실 "명" 혹은 "열" 코인 수량(최소 1개 이상 송금) : <input type = "number" onChange = {refundAmountChange} /></h5>                  
                <button onClick = {() => Refund1(account, refundAmount, library)
                .then(() => setTimeout(() => getKlayBalance(), 15000))}>
                    "명" 코인 환불
                </button>
                {'                       '}
                <button onClick = {() => Refund2(account, refundAmount, library)
                .then(() => setTimeout(() => getKlayBalance(), 15000))}>
                    "열" 코인 환불
                </button>
                <br></br>
                <h5>홀더 분께 추첨을 통하여 "명" 혹은 "열" NFT를 지급드릴 예정(당첨 확률은 보유량(2022년 3월15일 기준)에 비례)입니다!</h5>
                <br></br>
                <a href = "https://github.com/Heum-hub" target='_blank'>
                  개발자 소스코드</a>
        </div>
           
    )

}

export default Account;