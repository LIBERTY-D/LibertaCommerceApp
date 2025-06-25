export type Review={
    id:number,
    username:string,
    reviewDesc:string,
    reviewImageUrl:string

}


export const reviews: Review[] = [
  {
    id: 1,
    username: "Michael Brown",
    reviewDesc: "Great value for money! I would definitely recommend it to my friends and family.",
    reviewImageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    username: "Sophia Turner",
    reviewDesc: "Absolutely love the product. The quality exceeded my expectations!",
    reviewImageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    username: "James Lee",
    reviewDesc: "Fast delivery and excellent customer service. Highly satisfied!",
    reviewImageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    username: "Olivia Martin",
    reviewDesc: "The item is exactly as described. Will definitely shop again.",
    reviewImageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 5,
    username: "William Clark",
    reviewDesc: "I had some issues with the packaging, but the support team resolved it quickly.",
    reviewImageUrl: "https://via.placeholder.com/150"
  }
];
