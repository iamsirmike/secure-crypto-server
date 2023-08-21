import { useEffect } from 'react';
import server from './server';

function Wallet({ address, setAddress, balance, setBalance }) {
  useEffect(() => {
    async function getBalance() {
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      }
    }
    getBalance();
  }, [address]);
  
  function onChange(evt) {
    setAddress(evt.target.value);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;