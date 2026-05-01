"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function deleteManager(managerId: string, formData: FormData) {
    const resolvedHeaders = await authHeaders();
    const response = await fetch(`${API_URL}/managers/${managerId}`, {
      method: "POST",
      headers: {
        ...(resolvedHeaders as Record<string, string>),
        "Content-Type": "application/json",
      },
    });
    console.log(response.status);
    revalidateTag("dashboard:managers", "");
}