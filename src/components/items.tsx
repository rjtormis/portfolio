import React from "react";

interface ItemInterface {
  name: string;
  design: any;
}

function Items({ name, design }: ItemInterface) {
  return (
    <div className="flex flex-col justify-center text-center">
      <div className="flex justify-center">{design}</div>
      <p>{name}</p>
    </div>
  );
}

export default Items;
