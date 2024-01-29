import { hash } from "@node-rs/argon2";

export async function GET() {
  return new Response(await hash("password"));
}
