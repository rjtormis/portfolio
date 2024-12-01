"use client";
import React from "react";

interface ItemInterface {
  name: string;
  icon: React.ReactNode;
}

function Items({ name, icon }: ItemInterface) {
  return (
    <div className="flex flex-col justify-center text-center">
      <div className="flex justify-center">{icon}</div>
      <p>{name}</p>
    </div>
  );
}

export default Items;
