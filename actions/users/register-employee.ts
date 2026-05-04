'use server';

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";

export default async function registerEmployee (employeeId: string, formData: FormData){
    let data: any = {}
    data.userEmail = formData.get('userEmail')
    data.password = formData.get('password')
    data.userRoles = 'Employee'

  const resolvedHeaders = await authHeaders();
  const response = await fetch(`${API_URL}/auth/register/${employeeId}?role=employee`, {
    method: "POST",
    headers: {
      ...(resolvedHeaders as Record<string, string>),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}