import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js"
import wallet from "./turbin3-wallet.json"

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet.wallet));

//Create a Solana devnet connection to claim 2 devnet SOL tokens
const connection = new Connection("https://api.devnet.solana.com");
console.log(`Airdropping 10 SOL to ${keypair.publicKey.toBase58()}`);

(async () => {
    try {
        const txhash = await connection.requestAirdrop(keypair.publicKey, 10 * LAMPORTS_PER_SOL);
    console.log(`Success! Check out your TX here: 
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

//HH6yTMBHnDsJTCYXxtmGpyEFauCCsVRTBHwgfmhwJtWS