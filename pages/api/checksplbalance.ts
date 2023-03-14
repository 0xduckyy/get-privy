import type { NextApiRequest, NextApiResponse } from 'next'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConfirmedSignatureInfo, clusterApiUrl, Connection, Keypair, PublicKey, Transaction, LAMPORTS_PER_SOL, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js"
import base58 from 'bs58'
import { sign } from "@noble/ed25519";
import { Elusiv } from "elusiv-sdk";

type ResponseData = {
  data: string
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
  let privateBalance = await elusiv.getLatestPrivateBalance('USDC')
  console.log("priv balance is " + privateBalance);
  

  // Found the name.
  res.json({ data: `` })
}