import type { NextApiRequest, NextApiResponse } from 'next'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js"
import base58 from 'bs58'
import { Elusiv, TokenType } from "elusiv-sdk";
import { sign } from "@noble/ed25519";
import { findReference } from "@solana/pay";

type ResponseData = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  
  const body = req.body
  const reference = new PublicKey(body.referenceTo)
  console.log(reference)
  const amount = body.amount
  console.log(amount)
  // Define a function to execute the code that needs to be run periodically
async function executePrivateTransfer() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const connection = new Connection(endpoint);
  const signatureInfo = await findReference(connection, reference, { finality: 'confirmed' });

  if (signatureInfo) {
    console.log('Signature info found. Beginning top-up transaction...')
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
    const topupTx = await elusiv.buildTopUpTx(amount * (10 ** 6), 'USDC');
    topupTx.tx.partialSign(operatorKeypair);
    const storeRes = await elusiv.sendElusivTx(topupTx);
    console.log(`Topup complete with sig ${storeRes.signature}`);
    // Stop the timeout once the code is executed
    clearTimeout(timeoutId);
  }
}

// Execute the function once, after 10 seconds
const timeoutId = setTimeout(executePrivateTransfer, 20000);

  
  // Found the name.
  res.json({ data: `` })
}