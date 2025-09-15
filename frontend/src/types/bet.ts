export interface Bet {
  id: string;
  userId: string;
  amount: number;
  type: string;
  legs?: any[];
  // Add more fields as needed
}
