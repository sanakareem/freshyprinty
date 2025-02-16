interface ApparelItem {
    code: string;
    size: string;
    quality: number;
    price: number;
  }
  
  interface ApparelUpdate {
    quality?: number;
    price?: number;
  }
  
  interface CustomerOrder {
    items: {
      code: string;
      size: string;
      quantity: number;
    }[];
  }
  
  export { ApparelItem, ApparelUpdate, CustomerOrder };