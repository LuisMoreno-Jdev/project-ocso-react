'use server';

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";

export default async function updateUser (userId: string, employeeId: string, formData: FormData){
    let data: any = {}
    data.userEmail = formData.get('userEmail') ? formData.get('userEmail') : undefined
    data.password = formData.get('password') ? formData.get('password') : undefined

  const resolvedHeaders = await authHeaders();
  const response = await fetch(`${API_URL}/auth/${userId}`, {
    method: "PATCH",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

}