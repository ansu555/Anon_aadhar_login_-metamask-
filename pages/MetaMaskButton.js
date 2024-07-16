import Head from "next/head";
import { useState, useEffect } from "react";
import Web3 from "web3";

function MetaMaskPage() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY; // Ensure it's prefixed with NEXT_PUBLIC

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          const userAddress = accounts[0];
          setAccount(userAddress);

          window.ethereum.on("accountsChanged", async (accounts) => {
            const userAddress = accounts[0];
            setAccount(userAddress);
          });

          window.ethereum.on("disconnect", () => {
            setAccount(null);
          });
        } else {
          console.error("MetaMask is not installed");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    };

    fetchAccount().catch(console.error);
  }, []);

  const getContract = async () => {
    if (!web3) return;

    const contract = new web3.eth.Contract(
      JSON.parse(process.env.NEXT_PUBLIC_ABI),
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    );

    const data = await contract.methods.getData().call();
    console.log(data);
  };

  const setContract = async () => {
    if (!web3) return;

    const contract = new web3.eth.Contract(
      JSON.parse(process.env.NEXT_PUBLIC_ABI),
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
    );

    const value = 1;
    const gas = await contract.methods.setData(value).estimateGas();

    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(account);

    const tx = {
      from: account,
      to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      gasPrice: gasPrice,
      gas: gas,
      nonce: nonce,
      data: contract.methods.setData(value).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    if (receipt.status) {
      console.log("Transaction successful:", receipt);
    } else {
      console.error("Transaction failed:", receipt);
    }
  };

  return (
    <>
      <Head>
        <title>MetaMask and Web3.js Integration with Next.js</title>
        <meta name="description" content="MetaMask and Web3.js Integration with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-4">
        {!account ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            onClick={async () => {
              try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
              } catch (error) {
                console.error("Error connecting to MetaMask:", error);
              }
            }}
          >
            Connect to MetaMask
          </button>
        ) : null}
        {account ? (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              onClick={getContract}
            >
              Get Smart Contract
            </button>
            <button
              className="ml-5 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              onClick={setContract}
            >
              Set Smart Contract
            </button>
            <p className="text-gray-700">Your account address: {account}</p>
          </>
        ) : null}
      </div>
    </>
  );
}

export default MetaMaskPage;
