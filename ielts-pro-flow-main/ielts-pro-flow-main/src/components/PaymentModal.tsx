import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { PaystackButton } from "react-paystack";
import { toast } from "sonner";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal = ({ open, onClose, onSuccess }: PaymentModalProps) => {
  // Paystack configuration
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: "user@example.com", // Replace with actual user email
    amount: 5000000, // Amount in cents (50,000 KES)
    currency: "KES",
    publicKey: "pk_test_98b27490f31f1c13266f31d092dc579c211bdd25",
  };

  const handlePaymentSuccess = (reference: any) => {
    console.log("Payment successful:", reference);
    toast.success("Payment successful! You can now start your test.");
    onSuccess();
  };

  const handlePaymentClose = () => {
    console.log("Payment closed");
    toast.error("Payment was not completed. Please try again.");
  };

  const componentProps = {
    email: paystackConfig.email,
    amount: paystackConfig.amount,
    currency: paystackConfig.currency,
    publicKey: paystackConfig.publicKey,
    text: "Pay KES 50,000",
    onSuccess: handlePaymentSuccess,
    onClose: handlePaymentClose,
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '8px',
        }
      }}
    >
      <DialogTitle sx={{ fontSize: '1.8rem', fontWeight: 700, color: 'hsl(217, 91%, 35%)' }}>
        Payment Required
      </DialogTitle>
      <DialogContent>
        <div className="py-4 space-y-6">
          <p className="text-muted-foreground text-lg">
            To take another IELTS test, please complete the payment of <span className="font-bold text-foreground">KES 50,000</span>.
          </p>

          <div className="bg-muted p-6 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Test Fee:</span>
              <span className="text-2xl font-bold text-primary">KES 50,000</span>
            </div>
            
            <PaystackButton 
              {...componentProps} 
              className="w-full bg-gradient-to-r from-primary to-primary-glow text-white py-4 px-6 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
            />
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Payment is processed securely through Paystack
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
