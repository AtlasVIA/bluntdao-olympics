"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to participants management by default
    router.push("/admin/participants");
  }, [router]);

  return null;
}
