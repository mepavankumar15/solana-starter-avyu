import wallet from "./wallet/turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet.wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

         const image = "https://gateway.irys.xyz/J8mH2uKnAYJy5UVRG3NsgZVRcNAhQMUhMCFnqtJx9vxz"
        const metadata = {
            name: "avyukth's Generug",
           symbol: "AGRG",
           description: "random 20 color rug generated from berg's code",
           image: image,
            attributes: [
                 {trait_type: 'color', value: 'red'},
                 {trait_type: 'color', value: 'blue'},
                 {trait_type: 'color', value: 'green'},
                 {trait_type: 'color', value: 'yellow'},
                 {trait_type: 'color', value: 'purple'},
                 {trait_type: 'color', value: 'orange'},
                 {trait_type: 'color', value: 'pink'},
                 {trait_type: 'color', value: 'brown'},
                 {trait_type: 'color', value: 'black'},
                 {trait_type: 'color', value: 'white'},
                 {trait_type: 'color', value: '#FF0000'},
                 {trait_type: 'color', value: '#00FF00'},
                 {trait_type: 'color', value: '#0000FF'},
                 {trait_type: 'color', value: '#FFFF00'},
                 {trait_type: 'color', value: '#FF00FF'},
                 {trait_type: 'color', value: '#FFA500'},
                 {trait_type: 'color', value: '#FFC0CB'},
                 {trait_type:' color' ,value:'#8B4513' },
                ],
             properties:{
                 files: [
                     {
                         type: "image/png",
                         uri: "?"
                     }
                 ],
             },
            creators: []
         };
         const myUri = await umi.uploader.uploadJson(metadata);
         console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
