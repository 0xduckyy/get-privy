import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../lib/redis'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { clusterApiUrl, Connection, Keypair, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction, TransactionInstruction, } from "@solana/web3.js"
import base58 from 'bs58'
import { Elusiv, TokenType } from "elusiv-sdk";
import { sign } from "@noble/ed25519";
import {  findReference } from "@solana/pay";

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
  // Define a function to execute the code that needs to be run periodically
async function executePrivateTransfer() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const connection = new Connection(endpoint);
  const signatureInfo = await findReference(connection, reference, { finality: 'confirmed' });

  if (signatureInfo) {
    console.log('Signature info found. Sending from private balance...')
    const receiver = await redis.get("receiverPrivy");
    const buyerPublicKey = new PublicKey(receiver as string)

    const fetchedAmount = await redis.get("amountprivy");
    if (fetchedAmount === undefined || isNaN(parseInt(fetchedAmount as string))) {
      throw new Error("Invalid or missing amount to pay.");
    }
    const amountToPay = parseInt(fetchedAmount as string, 10);
    console.log(amountToPay)

    const operatorPrivateKey = process.env.OP_PRIVATE_KEY as string
    const operatorKeypair = Keypair.fromSecretKey(base58.decode(operatorPrivateKey))
    const operatorPublicKey = operatorKeypair.publicKey
    const password = await redis.get("keyprivy");
    if (password === undefined) {
      throw new Error("Invalid or missing password.");
    }
    const userKey = password as string

    const network = WalletAdapterNetwork.Devnet
    const endpoint = clusterApiUrl(network)
    const connection = new Connection(endpoint)
    
    const seed = await sign(Elusiv.hashPw(userKey), operatorKeypair.secretKey.slice(0, 32));
    const memo = 'Solana Pay Merch 👕';

    // Create the elusiv instance
    const elusiv = await Elusiv.getElusivInstance(seed, operatorKeypair.publicKey, connection);
    const sendTx = await elusiv.buildSendTx(amountToPay * (10 ** 6), buyerPublicKey, 'USDC', reference);
    const sendRes = await elusiv.sendElusivTx(sendTx);
    console.log(`Send complete with sig ${sendRes.signature}`);
    if (sendRes.signature) {
      console.log('Signature info of private balance found. Generating alert...')
      const connectionMainnet = new Connection('https://api.mainnet-beta.solana.com')
    
      const { blockhash, lastValidBlockHeight } = await connectionMainnet.getLatestBlockhash();
    
      const transaction = new Transaction({
        feePayer: operatorPublicKey,
        blockhash,
        lastValidBlockHeight,
      });
    
      const decoyAddress = new PublicKey('C23sZtGq5YJc2gdNvrXZVPTzv1ZGZnp49WUpfUFAGPFG')
    
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: operatorPublicKey,
        lamports: 888,
        toPubkey: decoyAddress,
      })
    
      transaction.add(transferInstruction)
      await sendAndConfirmTransaction(connectionMainnet, transaction, [operatorKeypair]);

    }
    // Stop the timeout once the code is executed
    clearTimeout(timeoutId);
  }
}

// Execute the function once, after 10 seconds
const timeoutId = setTimeout(executePrivateTransfer, 10000);

  
  // Found the name.
  res.json({ data: `` })
}