"use client";

import CheckoutButton from "../components/CheckoutButton";

interface Item {
  name: string;
  price: number;
  quantity: number;
}

export default function HomePage() {
  const items: Item[] = [
    { name: "Product 1", price: 2000, quantity: 1 },
    { name: "Product 2", price: 3000, quantity: 2 },
  ];

  return (
    <div>
      <h1>Welcome to Our Shop</h1>
      <CheckoutButton items={items} />
    </div>
  );
}
