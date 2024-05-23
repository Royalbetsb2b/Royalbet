import React, { useEffect, useState } from 'react'
import { ContractAddress, contractABI, chainETH } from '../../components/utils/constants';
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';
import { shortenAddress } from '../utils/trauncate';
import Countdown from '../countdown/Countdown';

function Contest({address, setLoading, signer, provider, connect, setNotify, setNotifyType, setNotifyMsg, isRaffleOpen, round, ticketPrice, currentPot, dateEnd, ticketBought, contestHistory, contestInfo }) {


    const navigate = useNavigate();
    const [inputData, setInputData] = useState();
    const [gottenDdata, setGottendata] = useState();


    const handleinputData = (event) => {
        setInputData(event.target.value);
    };

    /* global BigInt */
   const getContract = async () => {
    const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer =  temporalProvider.getSigner();
    return new ethers.Contract(ContractAddress, contractABI, signer);
   }



   const buyTicket = async () => {
    //check that user is registered
    //console.log("Called buy");
    if(!address) {
        setNotify(true);
        setNotifyType("warn")
        setNotifyMsg("Connect wallet to proceed");
      return;
    }

    if(!inputData) {
        setNotify(true);
        setNotifyType("warn")
        setNotifyMsg("Add number of tickets to buy");
      return;
    }


    if(inputData < 0) {
        setNotify(true);
        setNotifyType("warn")
        setNotifyMsg("Cannot buy a negative number");
      return;
    }
    
  try {
      
    setLoading(true);
    const contractInstance =  await getContract();
      
      console.log(inputData, "second one check");
      const fees = ethers.utils.parseEther(String(parseFloat(ticketPrice * inputData)));
        const stats = await contractInstance.buyTickets(inputData, {
         value: fees
        });
        await stats.wait();

        setNotify(true);
        setNotifyType("success")
        setNotifyMsg(`${inputData} tickets bought`);
        setLoading(false);


        } catch (error) {
            setNotify(true);
            setNotifyType("warn")
            setNotifyMsg("User cancelled transaction");
            setLoading(false);
        }
    
     }



     useEffect(() => {
        if(!address) {
          setNotify(true);
          setNotifyType("warn")
          setNotifyMsg("Please connect your wallet to proceed");
          navigate("/");
        }
        contestInfo();
      }, [address])

    return (
        <section className='h-[80vh] '>
         <div className="mt-36 text-white px-3">
           { isRaffleOpen 
           
           ? 
            <div className="border-2 border-[#FDE047]  to-blue-900 from-violet-800 bg-gradient-to-br  p-5 flex md:flex-row flex-col gap-[30px] md:gap-[0px] items-center relative justify-center md:justify-between rounded-md  md:w-full text-white h-30">
             {/*<div className="absolute -bottom-2 bg-[#2469b7] game-font border px-3 -right-2 py-1 cursor-pointer" onClick={() => buyTicket()}>Buy</div>*/}
                <div className="flex flex-row md:flex-col items-start ">
                    <h1 className='text-white game-font text-[12px] mt-4'> Status : {isRaffleOpen && "Active"}</h1>
                    <h1 className='text-white game-font text-[12px] mt-4'>Round: {round}</h1>
                    <h1 className='text-white game-font text-[12px] mt-4 flex gap-[17px]'> <span>End Date:</span> <span><Countdown time={dateEnd} signerAddress={address} key={dateEnd} /></span> </h1>
                </div>
                <div className="flex flex-wrap">
                    <div className="flex flex-col md:w-44 w-24 items-center">
                        <h2 className='game-font text-[12px]'> Price </h2>
                        <b>{ticketPrice} BNB</b>
                    </div>
                    <div className="flex flex-col md:w-44 w-36 items-center">
                        <h2 className='game-font text-[12px]'>Tickets bought</h2>
                        <b>{ticketBought}</b>
                    </div>
                    <div className="flex flex-col md:w-44 w-36 items-center">
                        <h2 className='game-font text-[12px]'>Pot</h2>
                        <b>{currentPot}</b>
                    </div>

                    <div className="flex flex-col md:w-44 w-36 items-center">
                        <h2 className='game-font text-[12px]'>No of Tickets</h2>
                        <input className='bg-transparent text-center default-font font-bold w-full outline-none text-white border border-[#fff] rounded-[5px]' type="number" onChange={(e) => handleinputData(e)} />
                        <button class="w-32 sm:w-36 py-5 flex items-center text-xs justify-center text-center  h-9 rounded-full  hover:brightness-110 bg-opacity-0 shadow-sm  mt-1 bg-gradient-to-t from-[#2269B7] via-[#335296] default-font font-bold text-white to-[#2c84c25d]" onClick={() => buyTicket()}>Buy</button>
                    </div>
                </div>
             </div>
           :

            <div className="game-font">No contest going on</div>

           }



        <div className="grid gap-5 scroll-m-0 overflow-y-scroll h-[80vh] pb-16 scroll-smooth px-4 mt-7">
        {
            contestHistory?.length !== 0 
            ?
         <>
          <div className='game-font text-[#FDE047]'>History</div>
          <div className="flex  justify-center flex-col gap-[10px] items-center overflow-y-auto h-[150px] pt-[13s0px]">
           { contestHistory?.map((data) => (

                    <div className="border-2 border-[#FDE047]  to-blue-900 from-violet-800 bg-gradient-to-br p-5 flex flex-col md:flex-row items-center relative justify-between rounded-md md:w-4/5 w-96 text-white md:h-28">
                        <div className="flex flex-col items-center mb-6 md:mb-auto">
                            <h2>Player</h2>
                            <h1 className='text-white game-font text-[12px] mt-4'>{shortenAddress(data.player)}</h1>
                        </div>
                        <div className="flex">
                            <div className="flex flex-col md:w-44 w-24 items-center">
                                <h2 className='game-font text-[12px]'>Round</h2>
                                <b>{
                                    parseInt(data.round/10)
                                }</b>
                            </div>

                            <div className="flex flex-col md:w-44 w-36 items-center">
                                <h2 className='game-font text-[12px]'>pot</h2>
                                <b>
                                {
                                    (Math.round(data.pot/10) * 10 ) / 10**18
                                    }                                
                                </b>
                            </div>

                            <div className="flex flex-col md:w-44 w-36 items-center">
                                <h2 className='game-font text-[12px]'>Stats</h2>
                                <b>
                                { data.isWin ?
                                "won"
                                :
                                "loss"
                                }                                
                                </b>
                            </div>

                        </div>


                    </div>
            ))
            }
          </div>
         </>

        :
        <div className="text-[#FDE047] text-center font-bold"> No History</div>
        }
         
        </div>

         </div>
        </section>
    )
}

export default Contest