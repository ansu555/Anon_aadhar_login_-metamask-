import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const MetaMaskButton = () => {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        } else {
            setError('MetaMask is not installed. Please install it to use this app.');
        }
    }, []);

    const connectMetaMask = async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                const provider = new ethers.BrowserProvider(window.ethereum); // Updated for ethers v6.x
                const signer = provider.getSigner();
                const account = await signer.getAddress(); // Correct usage

                setAccount(account);
            } else {
                setError('MetaMask is not installed. Please install it to use this app.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            {account ? (
                <p>Connected Account: {account}</p>
            ) : (
                <button onClick={connectMetaMask}>Connect MetaMask</button>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default MetaMaskButton;
