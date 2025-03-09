import { createThirdwebClient } from "thirdweb";

import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";


const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
const secretId = process.env.SECRET_KEY;
if (!clientId) {
  throw new Error("No client ID provided");
} 

export const client = createThirdwebClient({
  clientId: clientId,
  secretKey: secretId
});


export const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "email",
        "x",
        "passkey",
        "phone",
        "github",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];
