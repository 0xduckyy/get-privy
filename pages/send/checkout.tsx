import { createQR, encodeURL, findReference, FindReferenceError, TransactionRequestURLFields } from "@solana/pay";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import PageHeading from "../../components/PageHeading";

export default function Checkout() {
  const router = useRouter()

  // ref to a div where we'll show the QR code
  const qrRef = useRef<HTMLDivElement>(null)


  // Get a connection to Solana devnet
  const network = WalletAdapterNetwork.Devnet
  const endpoint = clusterApiUrl(network)
  const connection = new Connection(endpoint)
  
  const [solanaUrl, setSolanaUrl] = useState('');
  // Show the QR code
  useEffect(() => {
    // window.location is only available in the browser, so create the URL in here
    const { location } = window
    const apiUrl = `${location.protocol}//${location.host}/api/send`
    const urlParams: TransactionRequestURLFields = {
      link: new URL(apiUrl),
    }
    const solanaUrl = encodeURL(urlParams)
    setSolanaUrl(solanaUrl.toString());
    const qr = createQR(solanaUrl, 350, 'transparent')
    if (qrRef.current) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
    }
    
  })

  return (
    <div className="flex flex-col items-center gap-8">
      <Toaster />
      <div className="mt-8">
        <PageHeading>Transfer Initiated...</PageHeading>
      </div>
      <div className="flex flex-row gap-4">
      <button
  onClick={() => {
    navigator.clipboard.writeText(solanaUrl);
    toast("Smart Message Copied to Clipboard", {
      icon: <img src="/dialectlogo.png" className="h-10 w-10" />,
      style: {
        background: "#000",
        color: "#fff",
  },
    });
  }}
  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  style={{ flexBasis: "100%" }}
>
  Copy to clipboard
  <img className="h-14"src="/dialectlogo.png"></img>
</button>
<a
  href={solanaUrl}
  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  style={{ flexBasis: "100%" }}
>
  Send to any Mobile Wallet!
</a>
      </div>
      {/* div added to display the QR code */}
      <div className="bg-red-200 rounded-3xl mb-4" ref={qrRef} />
    </div>
  )  
}