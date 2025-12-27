/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { becomeHostZodSchema } from "@/zod/host.validation";

export async function becomeHost(_prevState: any, formData: FormData) {
  // Build validation payload
  const validationPayload = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    contactNumber: formData.get("contactNumber") as string,
    gender: formData.get("gender") as string,
    dateOfBirth: formData.get("dateOfBirth") as string,
    organization: formData.get("organization") as string,
    experienceLevel: formData.get("experienceLevel") as string,
    bio: formData.get("bio") as string,
    address: formData.get("address") as string,
    profilePhoto: formData.get("file") as File,
  };

  const validatedPayload = zodValidator(validationPayload, becomeHostZodSchema);

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: validatedPayload.success,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  if (!validatedPayload.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }
  const backendPayload = {
      name: validatedPayload.data.name,
      username: validatedPayload.data.username,
      email: validatedPayload.data.email,
      contactNumber: validatedPayload.data.contactNumber,
      gender: validatedPayload.data.gender,
      dateOfBirth: validatedPayload.data.dateOfBirth,
      organization: validatedPayload.data.organization,
      experienceLevel: validatedPayload.data.experienceLevel,
      bio: validatedPayload.data.bio,
      address: validatedPayload.data.address,
  };

  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(backendPayload));
  newFormData.append("file", formData.get("file") as Blob);
  try {
    const response = await serverFetch.post("/user/become-host", {
      body: newFormData,
    });

    const result = await response.json();
    console.log("become host result", result)
    return result;
  } catch (error: any) {
    console.error("Create admin error:", error);  
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create admin",
      formData: validationPayload,
    };
  }
}
