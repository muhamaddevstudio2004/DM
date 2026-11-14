// supabase/functions/health/index.ts
// Deploy: supabase functions deploy health --no-verify-jwt
// Secret: supabase secrets set HEALTH_SECRET=<long random string>
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST" || req.headers.get("Authorization") !== `Bearer ${Deno.env.get("HEALTH_SECRET")}`)
    return new Response("Forbidden", { status: 403 });

  // SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set by Supabase on the server only.
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const now = new Date().toISOString();
  try {
    // Small read-only query: one row, one column.
    const { error } = await sb.from("lockers").select("id").limit(1);
    if (error) throw new Error(error.message);
    // One small update of a single status row (the only write).
    await sb.from("health_status").update({ last_success_at: now, last_check_at: now, last_result: "ok", last_error: null }).eq("id", 1);
    return Response.json({ ok: true, checked_at: now });
  } catch (e) {
    const msg = String((e as Error).message ?? e).slice(0, 300);
    console.error("Health check failed:", msg);
    // Best effort: if the database is down this write may fail too. GitHub Actions logs still show the error.
    try { await sb.from("health_status").update({ last_check_at: now, last_result: "error", last_error: msg }).eq("id", 1); } catch (_) { /* ignore */ }
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
});
