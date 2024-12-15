"use client";
import React, { createElement } from "react";
import { IconType } from "react-icons/lib";

interface ItemInterface {
  name: string;
  icon: IconType;
}

function Items({ name, icon }: ItemInterface) {
  return (
    <div className="flex flex-col justify-center text-center">
      <div className="flex justify-center">{createElement(icon, { size: 32 })}</div>
      <p>{name}</p>
    </div>
  );
}

export default Items;
