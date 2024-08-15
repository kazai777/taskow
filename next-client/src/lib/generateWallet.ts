import { Wallet, Signer } from "@gnolang/tm2-js-client";

export async function generateGnoWallet() {
  try {
    const wallet = await Wallet.createRandom();

    const signer: Signer = wallet.getSigner();

    const privateKey = await signer.getPrivateKey();

    const address = await signer.getAddress();

    console.log("Public Address:", address);
    console.log("Private Key:", Buffer.from(privateKey).toString("hex"));

    return { address, privateKey: Buffer.from(privateKey).toString("hex") };
  } catch (error) {
    console.error("Erreur wallet not created:", error);
  }
}
