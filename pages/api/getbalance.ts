import type { NextApiRequest, NextApiResponse } from 'next'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js"
import base58 from 'bs58'
import { sign } from "@noble/ed25519";
import { Elusiv, getMintAccount, PrivateTxWrapper, TokenType } from "elusiv-sdk";

type ResponseData = {
  data: string;
  lastTenPrivTxs: PrivateTxWrapper[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  
  const body = req.body

  const operatorPrivateKey = process.env.OP_PRIVATE_KEY as string
  const operatorKeypair = Keypair.fromSecretKey(base58.decode(operatorPrivateKey))
  const userKey = 'grizzlython'
  
  const network = WalletAdapterNetwork.Devnet
  const endpoint = clusterApiUrl(network)
  const connection = new Connection(endpoint)

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  const seed = await sign(Elusiv.hashPw(userKey), operatorKeypair.secretKey.slice(0, 32));

  // Create the elusiv instance
  const elusiv = await Elusiv.getElusivInstance(seed, operatorKeypair.publicKey, connection);
  const usdcMint = getMintAccount('USDC');
  // Fetch our current private balance
  let privateBalance = await elusiv.getLatestPrivateBalance('USDC')
  let formattedBalance = (Number(privateBalance) / 1000000).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  
  // Fetch our last 10 private transactions
  const lastTenPrivTxs = await elusiv.getPrivateTransactions(10, 'USDC');
  console.log(lastTenPrivTxs)


  // Found the name.
  res.status(500).json({ 
    data: formattedBalance,
    lastTenPrivTxs: lastTenPrivTxs 
  })
}