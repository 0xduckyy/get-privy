import type { NextApiRequest, NextApiResponse } from 'next'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js"
import base58 from 'bs58'
import { sign } from "@noble/ed25519";
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { airdropToken, Elusiv, getMintAccount, TokenType } from "elusiv-sdk";

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
  const usdcMint = getMintAccount('USDC');
  console.log("get or create");
  const ataAcc = await getOrCreateAssociatedTokenAccount(connection, operatorKeypair, usdcMint, operatorKeypair.publicKey);
  console.log("Ata is " + ataAcc.address)
  // Important to remember, USDC is actually measured in 1_000_000, so that means we're airdropping 1 billion USDC here, 
  // but that's only $1000.
  const airdropSig = await airdropToken('USDC', LAMPORTS_PER_SOL, ataAcc.address);
  console.log("Successfully airdropped USDC with sig " + airdropSig.signature);

  // Fetch our current private balance
  

  // Found the name.
  res.json({ data: `` })
}