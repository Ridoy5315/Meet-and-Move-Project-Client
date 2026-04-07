/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { BaseProfile } from "@/types/user.interface";


export const getUserInfo = async (): Promise<BaseProfile | any> => {
  let userInfo: BaseProfile | any;
  try {
    const response = await serverFetch.get("/auth/me", {
      next: { tags: ["user-info"] },
    });

    const result = await response.json();

    if (!result.success) {
      return result;
    }

    if (result.success) {
      const accessToken = await getCookie("accessToken");

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as JwtPayload;

      userInfo = {
        email: verifiedToken.email,
        role: verifiedToken.role,
      };
    }

    userInfo = {
      name:
        result.data.profile?.name,
      ...result.data,
    };

    return userInfo;
  } catch (error: any) {
    console.log(error);
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "User",
    };
  }
};
