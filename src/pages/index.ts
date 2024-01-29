import { Argon2id } from "oslo/password";

export async function GET() {
  const hash = await new Argon2id().hash("password");
  return new Response(hash);
}
