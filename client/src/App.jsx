import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useEffect, useState } from "react";
import { generateWallet } from "./utils";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  
  useEffect(() => {
    const wallet = JSON.parse(localStorage.getItem("::wallet::"));
    if (wallet) {
      setAddress(wallet.address);
      setPrivateKey(wallet.privateKey);
      setPublicKey(wallet.publicKey);
    } else {
    const { address, privateKey, publicKey } = generateWallet();
    setAddress(address);
    setPrivateKey(privateKey);
      setPublicKey(publicKey);
      localStorage.setItem(
        "::wallet::",
        JSON.stringify({ address, privateKey, publicKey })
      );
    }
   }, [])

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey} publicKey={publicKey} />
    </div>
  );
}

export default App;
