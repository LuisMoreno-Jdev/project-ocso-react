'use server';

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";

export default async function registerManager (managerId: string, formData: FormData){
    let data: any = {}
    data.userEmail = formData.get('userEmail')
    data.password = formData.get('password')
    data.userRoles = 'Manager'

  const resolvedHeaders = await authHeaders();
  const response = await fetch(`${API_URL}/auth/register/${managerId}?role=manager`, {
    method: "POST",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}