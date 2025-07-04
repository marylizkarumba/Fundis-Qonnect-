
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMpesa } from '@/hooks/useMpesa';
import { Loader2, Smartphone } from 'lucide-react';

interface MpesaPaymentProps {
  amount: number;
  onPaymentSuccess?: (data: any) => void;
  onPaymentError?: (error: any) => void;
  accountReference?: string;
  transactionDesc?: string;
}

const MpesaPayment = ({ 
  amount, 
  onPaymentSuccess, 
  onPaymentError,
  accountReference = 'Service Payment',
  transactionDesc = 'Payment for service'
}: MpesaPaymentProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { initiatePayment, isLoading } = useMpesa();

  const handlePayment = async () => {
    if (!phoneNumber) {
      return;
    }

    // Format phone number (ensure it starts with 254)
    let formattedPhone = phoneNumber.replace(/\s+/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith('+254')) {
      formattedPhone = formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    const result = await initiatePayment({
      phone: formattedPhone,
      amount,
      accountReference,
      transactionDesc,
    });

    if (result.success) {
      onPaymentSuccess?.(result.data);
    } else {
      onPaymentError?.(result.error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-green-600">
        <Smartphone size={20} />
        <span className="font-medium">Pay with M-Pesa</span>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="0712345678 or 254712345678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Amount to pay:</span>
          <span className="font-bold text-green-600">KES {amount.toLocaleString()}</span>
        </div>
      </div>

      <Button
        onClick={handlePayment}
        disabled={!phoneNumber || isLoading}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          `Pay KES ${amount.toLocaleString()} via M-Pesa`
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        You will receive a prompt on your phone to complete the payment
      </p>
    </div>
  );
};

export default MpesaPayment;
