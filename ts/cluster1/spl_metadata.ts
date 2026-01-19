import wallet from "./wallet/turbin3-wallet.json";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args,
    findMetadataPda
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address 
const mint = publicKey("BJc8p2AQ8EUJW2EhofEeB3feqcm2J8CkXSnvr54Z3xmM"); 

// Create a UMI connection 
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet.wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {

        const metadata = findMetadataPda(umi, { mint });

        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            metadata: metadata, // Replace with actual metadata account public key
            mint: mint,
            mintAuthority : signer
        }

        // Start here
        // let accounts: CreateMetadataAccountV3InstructionAccounts = {
        //     ???
        // }

        let data: DataV2Args = { 
            name: "samplebinary NFT",
            symbol: "☠️",
            uri: "https://example.com/nft-metadata.json",
            sellerFeeBasisPoints: 500, // 5% seller fee 10,000s
            creators: null,
            collection: null,
            uses: null
        }

        // let data: DataV2Args = { 
        //     ???
        // }

         let args: CreateMetadataAccountV3InstructionArgs ={
            data,
            isMutable: true,
            collectionDetails: null

         }
        // let args: CreateMetadataAccountV3InstructionArgs = {
        //     ???
        // }

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        )

        // let tx = createMetadataAccountV3(
        //     umi,
        //     {
        //         ...accounts,
        //         ...args
        //     }
        // )
        let result = await tx.sendAndConfirm(umi);
        console.log("signature",bs58.encode(result.signature))
        // let result = await tx.sendAndConfirm(umi);
        // console.log(bs58.encode(result.signature));
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();
