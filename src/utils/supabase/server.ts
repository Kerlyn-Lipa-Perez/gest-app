import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL o Key no están definidas");
  }
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: async () => {
        const store = await cookieStore;
        return store.getAll();
      },
      setAll: async (cookiesToSet) => {
        const store = await cookieStore;
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            store.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};
