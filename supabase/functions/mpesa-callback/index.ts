
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const callbackData = await req.json();
    
    console.log('M-Pesa Callback received:', JSON.stringify(callbackData, null, 2));

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Extract payment details
    const stkCallback = callbackData.Body?.stkCallback;
    if (!stkCallback) {
      throw new Error('Invalid callback data');
    }

    const { ResultCode, ResultDesc, CheckoutRequestID } = stkCallback;
    const callbackMetadata = stkCallback.CallbackMetadata;

    let paymentData: any = {
      checkout_request_id: CheckoutRequestID,
      result_code: ResultCode,
      result_desc: ResultDesc,
      created_at: new Date().toISOString(),
    };

    // If payment was successful, extract additional details
    if (ResultCode === 0 && callbackMetadata) {
      const items = callbackMetadata.Item || [];
      
      for (const item of items) {
        switch (item.Name) {
          case 'Amount':
            paymentData.amount = item.Value;
            break;
          case 'MpesaReceiptNumber':
            paymentData.mpesa_receipt_number = item.Value;
            break;
          case 'TransactionDate':
            paymentData.transaction_date = item.Value;
            break;
          case 'PhoneNumber':
            paymentData.phone_number = item.Value;
            break;
        }
      }
    }

    // Store payment record in database
    const { data, error } = await supabase
      .from('mpesa_payments')
      .insert(paymentData);

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Payment record saved:', data);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Callback processing error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
