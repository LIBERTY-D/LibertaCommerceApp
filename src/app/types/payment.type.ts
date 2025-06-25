//  Payment model
export type Payment = {
  id: number;
  amount: number;
  paymentDate: string; // ISO format
  paymentMethod: 'CARD' | 'CASH' | 'BANK_TRANSFER';
  paymentStatus: 'COMPLETED' | 'PENDING' | 'FAILED' | string;
};