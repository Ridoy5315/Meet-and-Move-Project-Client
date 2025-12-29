/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { dateToISO } from "@/lib/dateToIso";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateUserZodSchema } from "@/zod/updateUser.validation";
import { revalidateTag } from "next/cache";

export async function updateUserProfile(
  id: string,
  _prevState: any,
  formData: FormData
) {
  // 1️⃣ Build validation payload
  const interestsRaw = formData.get("interests") as string;

  let interests: string[] = [];
  try {
    interests = interestsRaw ? JSON.parse(interestsRaw as string) : [];
  } catch {
    interests = [];
  }

  const file = formData.get("file");

  const validationPayload = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    contactNumber: formData.get("contactNumber") as string,
    gender: formData.get("gender") as string,
    dateOfBirth: dateToISO(formData.get("dateOfBirth")),
    bio: formData.get("bio") as string,
    address: formData.get("address") as string,
    interests,
    profilePhoto: file instanceof File && file.size > 0 ? file : undefined,
  };

  console.log("validationPayload", validationPayload);

  // 2️⃣ Zod validation
  const validatedPayload = zodValidator(validationPayload, updateUserZodSchema);

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
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

  // 3️⃣ Backend JSON payload (NO host/admin fields)
  const backendPayload = {
    name: validatedPayload.data.name,
    username: validatedPayload.data.username,
    contactNumber: validatedPayload.data.contactNumber,
    gender: validatedPayload.data.gender,
    dateOfBirth: validatedPayload.data.dateOfBirth,
    bio: validatedPayload.data.bio,
    address: validatedPayload.data.address,
    interests: validatedPayload.data.interests,
  };

  console.log("backendPayload", backendPayload);

  // 4️⃣ Multipart form-data
  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(backendPayload));

  if (validatedPayload.data.profilePhoto) {
    newFormData.append("file", validatedPayload.data.profilePhoto as File);
  }

  // 5️⃣ API call
  try {
    const response = await serverFetch.patch(`/user/update-user/${id}`, {
      body: newFormData,
    });

    const result = await response.json();
    if (result?.success) {
      revalidateTag("user-info", "default");
    }
    console.log("update user profile result:", result);

    return result;
  } catch (error: any) {
    console.error("Update user profile error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update user profile",
      formData: validationPayload,
    };
  }
}
