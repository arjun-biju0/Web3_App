import React,{ useState,useEffect } from "react";
import {ethers} from "ethers"; 
import {contractABI,contractAddress} from "../utils/constants";
import BN from "bn.js";
import { blockTimestampToViewFormatter } from "../utils/timeFormat";
export const TransactionContext=React.createContext();

const {ethereum}=window;

const getEthereumContract=()=>{
    const provider=new ethers.BrowserProvider(ethereum);
    const signer=provider.getSigner();
    const transactionContract=new ethers.Contract(contractAddress,contractABI,signer);

    return transactionContract;

    
}

export const TransactionProvider=({children})=>{

    const [currentAccount,setCurrentAccount]=useState("")
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading,setIsLoading]=useState(false)
    const [transactions, setTransactions] = useState([]);
    const[transactionCount,setTransactionCount]=useState(localStorage.getItem('transactionCount'))
    const handleChange=(e,name)=>{
        setFormData((prevState)=>({...prevState,[name]:e.target.value}))
    }

    const fetchAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract =  getEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
    
            const structuredTransactions = availableTransactions.map((transaction) => ({
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: blockTimestampToViewFormatter(transaction.timestamp),
              message: transaction.message,
              keyword: transaction.keyword,
              amount: ethers.formatEther(transaction.amount),
            }));
    
            console.log(structuredTransactions);
    
            setTransactions(structuredTransactions);
          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
        }
      };


    const checkIfWalletIsConnected=async ()=>{
        if(!ethereum) return alert("Please install Metamask");

        const accounts=await ethereum.request({ method: 'eth_accounts'});

        if(accounts.length){
            setCurrentAccount(accounts[0]);
            fetchAllTransactions();
        }
        

    }

    const checkIfTransactionsExists = async () => {
        try {
          if (ethereum) {
            const transactionsContract =  getEthereumContract();
            const currentTransactionCount = await transactionsContract.getTransactionCount();
    
            window.localStorage.setItem("transactionCount", currentTransactionCount);
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      }


    const connectWallet=async()=>{
        try {
            if(!ethereum) return alert("Please install Metamask");
            const accounts=await ethereum.request({ method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object")
            
        }
    }

    const sendTransaction=async()=>{
        try {
            if(!ethereum) return alert("Please install Metamask");

            const {addressTo,amount,keyword,message}=formData;
            const transactionContract= getEthereumContract();
            const parsedAmount = ethers.parseEther(amount)
            const parsedAmountBN = new BN(parsedAmount, 10)

            await ethereum.request({
                method: 'eth_sendTransaction',
                params:[{
                    from:currentAccount,
                    to: addressTo,
                    gas:'0x5208',
                    value: parsedAmountBN.toString(16),
                },]
            });
            const transactionHash=await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);  


            setIsLoading(true)
            console.log(`loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false)
            console.log(`success - ${transactionHash.hash}`);

            const transactionCount=await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber())

        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object")
        }
    }


    useEffect(()=>{
        checkIfWalletIsConnected()
        checkIfTransactionsExists()
        
    },[])

    return(
        <TransactionContext.Provider value={{connectWallet , currentAccount, formData,setFormData,handleChange, sendTransaction, transactions,transactionCount}}>
            {children}
        </TransactionContext.Provider>
    )
}