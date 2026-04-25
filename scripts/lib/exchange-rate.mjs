// HKD/USD exchange rate helper. Uses frankfurter.app (no API key, free) with
// an in-process cache and a fallback constant. Pure read-only.

const FALLBACK_HKD_PER_USD = 7.78;
let cached = null;

export async function getHkdPerUsd() {
  if (cached) return cached;
  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=HKD");
    if (!res.ok) throw new Error(`frankfurter ${res.status}`);
    const json = await res.json();
    const rate = json?.rates?.HKD;
    if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) {
      throw new Error("invalid rate payload");
    }
    cached = { rate, source: "frankfurter", fetchedAt: new Date().toISOString() };
    return cached;
  } catch (err) {
    cached = {
      rate: FALLBACK_HKD_PER_USD,
      source: "fallback",
      fetchedAt: new Date().toISOString(),
      error: String(err?.message || err),
    };
    return cached;
  }
}

export function hkdToUsd(amountHkd, rate) {
  if (!rate || rate <= 0) return amountHkd / FALLBACK_HKD_PER_USD;
  return amountHkd / rate;
}
