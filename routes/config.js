import { Router } from "express";

const router = Router();
const amount = (key) => {
  const value = Number(process.env[key] || 0);
  return Number.isFinite(value) && value >= 0 ? value : 0;
};
const deliveryFees = {
  pickup: 0,
  lagos: amount("DELIVERY_FEE_LAGOS"),
  outside: amount("DELIVERY_FEE_NATIONWIDE"),
};

router.get("/", (_req, res) => {
  res.json({
    currency: "NGN",
    deliveryFees,
    whatsapp: process.env.SHOP_WHATSAPP_NUMBER || "",
    payments: {
      paystack: Boolean(process.env.PAYSTACK_SECRET_KEY),
      bankTransfer: process.env.BANK_TRANSFER_ENABLED !== "false" && Boolean(process.env.BANK_TRANSFER_BANK_NAME && process.env.BANK_TRANSFER_ACCOUNT_NAME && process.env.BANK_TRANSFER_ACCOUNT_NUMBER),
      bankTransferDetails: process.env.BANK_TRANSFER_BANK_NAME && process.env.BANK_TRANSFER_ACCOUNT_NAME && process.env.BANK_TRANSFER_ACCOUNT_NUMBER ? {
        bankName: process.env.BANK_TRANSFER_BANK_NAME,
        accountName: process.env.BANK_TRANSFER_ACCOUNT_NAME,
        accountNumber: process.env.BANK_TRANSFER_ACCOUNT_NUMBER,
      } : null,
      payOnDelivery: process.env.PAY_ON_DELIVERY_ENABLED === "true",
    },
  });
});

export default router;
