import "server-only";

export type Day = {
  date: string;
  hi: number | null;
  lo: number | null;
  rainIn: number | null;
  rainChance: number | null;
  windMph: number | null;
  sky: string;
  /** corn heat units for the day, 50/86 method */
  gdu: number | null;
};

export type Forecast = { days: Day[]; rainTotal: number; gduTotal: number; fetchedAt: string } | null;

/** Open-Meteo's weather codes in the words a farmer would use. */
const SKY: [number[], string][] = [
  [[0], "clear"], [[1], "mostly sunny"], [[2], "partly cloudy"], [[3], "overcast"],
  [[45, 48], "fog"], [[51, 53, 55, 56, 57], "drizzle"], [[61, 63, 65, 66, 67], "rain"],
  [[71, 73, 75, 77], "snow"], [[80, 81, 82], "showers"], [[85, 86], "snow showers"],
  [[95], "thunderstorms"], [[96, 99], "storms with hail"],
];
const sky = (code: number | null) => (code == null ? "" : SKY.find(([codes]) => codes.includes(code))?.[1] ?? "");

/** Ten days over one point, free, no key. Returns null on any failure so the page still renders. */
export async function getForecast(lat: number, lon: number): Promise<Forecast> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  Object.entries({
    latitude: String(lat), longitude: String(lon), timezone: "America/Chicago", forecast_days: "10",
    daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,weather_code",
    temperature_unit: "fahrenheit", precipitation_unit: "inch", wind_speed_unit: "mph",
  }).forEach(([k, v]) => url.searchParams.set(k, v));
  try {
    const res = await fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(6000) });
    if (!res.ok) return null;
    const j = (await res.json()) as { daily: { time: string[]; temperature_2m_max: (number | null)[]; temperature_2m_min: (number | null)[]; precipitation_sum: (number | null)[]; precipitation_probability_max: (number | null)[]; wind_speed_10m_max: (number | null)[]; weather_code: (number | null)[] } };
    const d = j.daily;
    const days: Day[] = d.time.map((date, i) => {
      const hi = d.temperature_2m_max[i], lo = d.temperature_2m_min[i];
      const gdu = hi != null && lo != null ? Math.max(0, (Math.min(86, hi) + Math.max(50, lo)) / 2 - 50) : null;
      return { date, hi, lo, rainIn: d.precipitation_sum[i], rainChance: d.precipitation_probability_max[i], windMph: d.wind_speed_10m_max[i], sky: sky(d.weather_code[i]), gdu };
    });
    return {
      days,
      rainTotal: days.reduce((t, x) => t + (x.rainIn ?? 0), 0),
      gduTotal: days.reduce((t, x) => t + (x.gdu ?? 0), 0),
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
