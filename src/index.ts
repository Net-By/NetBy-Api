import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function handler(event) {
  // Grab user's email
  const userEmail = event.queryStringParameters.email;

  // Insert in DB
  const { error } = await supabase.from("emails").insert({ email: userEmail });
  console.log(error);

  // Return success response
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
  };
}
