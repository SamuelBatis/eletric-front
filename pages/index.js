import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login")
  }, []);

  return null; // or any other content you want to display temporarily
}
