
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MpesaPaymentData {
  phone: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}

export const useMpesa = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const initiatePayment = async (paymentData: MpesaPaymentData) => {
    setIsLoading(true);
    
    try {
      console.log('Initiating M-Pesa payment:', paymentData);
      
      const { data, error } = await supabase.functions.invoke('mpesa-payment', {
        body: paymentData,
      });

      if (error) {
        throw error;
      }

      console.log('M-Pesa response:', data);

      if (data.ResponseCode === '0') {
        toast({
          title: "Payment Request Sent",
          description: "Please check your phone and enter your M-Pesa PIN to complete the payment.",
        });
        return { success: true, data };
      } else {
        throw new Error(data.ResponseDescription || 'Payment failed');
      }
    } catch (error) {
      console.error('M-Pesa payment error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Failed to initiate M-Pesa payment. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initiatePayment,
    isLoading,
  };
};
