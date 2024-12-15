import { options } from "@/app/api/auth/[...nextauth]/options";

import { getServerSession } from "next-auth";
import React from "react";
import Settings from "./settings";

export default async function SettingsPage() {
  const session = await getServerSession(options);

  return (
    <>
      <Settings email={session!.user.email} id={session?.user.id} />
    </>
  );
}
