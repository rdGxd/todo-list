import instance from "@/services/axios/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data } = await instance.post("/auth/login", body);

  const res = NextResponse.json(data);
  res.cookies.set("accessToken", data.accessToken);
  res.cookies.set("refreshToken", data.refreshToken);

  return res;
}
