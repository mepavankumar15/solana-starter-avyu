import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "./wallet/turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet.wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("BJc8p2AQ8EUJW2EhofEeB3feqcm2J8CkXSnvr54Z3xmM");

// Recipient address
const to = new PublicKey("Fh8e6w3pY7Y4u5y3U6Yz7Z1xX9f8vG5t2J9K3L4M5N6P");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair ,
            mint,
            keypair.publicKey
        );
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to,
            true
        );

        // Transfer the new token to the "toTokenAccount" we just created

        const transferTx = await transfer(
            connection,
            keypair,
            ata.address,
            toTokenAccount.address,
            keypair.publicKey,
            50e6 // amount to transfer (in smallest unit)
        );

        console.log(`Your transfer txid: ${transferTx}`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();