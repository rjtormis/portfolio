import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="sticky top-0 p-4 bg-background z-50 shadow-md">
      <div>
        <p className="text-xs lg:text-sm text-center">
          Simplicity is about subtracting the obvious and adding the meaningful - John Maeda
        </p>
      </div>
      <div className="absolute bottom-0 right-0 text-xs text-muted-foreground flex flex-col text-right">
        <p>Ver {process.env.version}</p>
        <p>{currentYear} © All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
