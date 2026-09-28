/**
 * Sarauer Farms as a plat book: every field outlined and tinted by farm, the way Acrefile's
 * farm map shows it. Shapes only: the outlines were projected from Acrefile's boundaries
 * (Garrett, 2026-09-28: use Justin's real outlines) into this drawing's own units, so no
 * latitude or longitude is stored here. Farm colours are Acrefile's defaults
 * (src/lib/farm-colors.ts there: farms in name order take sky, harvest orange, plum).
 */
export type PlatField = { field: string; farm: string; acres: number; color: string; d: string; lx: number; ly: number; anchor?: "start" | "middle" };

export const PLAT_BOOK = { width: 1000, height: 936, metersPerUnit: 1.7295 };
export const PLAT_FIELDS: PlatField[] = [
 {
  "field": "H-2",
  "farm": "Home farm",
  "acres": 38.94,
  "color": "#4f9bd9",
  "d": "M556.7 413.7 L487.2 420.1 L476.1 423.5 L437.7 445.4 L385.2 465.7 L382.1 468.5 L379.8 472.7 L378.8 480.0 L379.8 492.5 L379.1 494.8 L377.0 496.6 L374.2 497.6 L362.8 498.6 L348.8 502.0 L329.8 503.6 L328.3 504.4 L327.7 506.9 L326.6 530.4 L325.3 532.7 L269.7 533.4 L268.9 530.4 L268.2 287.7 L269.2 285.4 L270.4 284.8 L312.8 285.0 L364.4 283.8 L435.6 284.0 L486.7 282.1 L552.2 280.7 L555.4 281.3 L556.5 282.8 L556.7 379.4 L558.1 412.5 L556.7 413.7Z",
  "lx": 393.7,
  "ly": 380.1
 },
 {
  "field": "H-3",
  "farm": "Home farm",
  "acres": 65.3,
  "color": "#4f9bd9",
  "d": "M692.7 278.7 L694.3 209.7 L696.6 191.2 L697.9 163.2 L710.8 117.1 L712.1 104.3 L708.5 65.5 L708.2 45.5 L957.9 40.0 L960.0 245.5 L958.7 246.6 L958.1 263.0 L955.0 263.1 L954.6 265.6 L931.5 267.7 L881.7 268.8 L854.2 271.0 L838.3 277.1 L826.4 287.9 L819.7 298.2 L814.3 309.3 L760.4 302.9 L724.4 293.2 L692.7 278.7ZM541.1 178.1 L546.3 159.7 L566.7 142.8 L569.8 132.2 L566.9 117.1 L568.2 80.3 L580.1 50.0 L643.4 48.0 L687.6 48.4 L688.5 46.6 L702.4 46.1 L703.4 107.7 L692.1 146.4 L688.2 177.0 L687.6 239.7 L662.7 244.5 L616.9 244.8 L585.3 236.8 L581.4 234.0 L578.2 234.0 L562.4 227.7 L544.7 215.8 L542.4 212.3 L541.1 178.1Z",
  "lx": 826.6,
  "ly": 166.0
 },
 {
  "field": "J-1",
  "farm": "Justin",
  "acres": 38.95,
  "color": "#e08a2e",
  "d": "M500.1 634.6 L500.9 895.8 L513.6 895.6 L602.4 736.7 L603.5 724.8 L596.4 713.7 L507.2 634.2 L500.1 634.6ZM531.7 644.2 L599.0 709.0 L642.7 657.9 L597.9 592.8 L552.8 516.3 L534.9 524.0 L535.7 575.6 L530.4 595.0 L545.5 605.9 L549.6 613.2 L548.7 622.0 L534.5 639.1 L531.7 644.2ZM557.5 514.6 L648.0 655.8 L657.8 662.8 L686.1 662.6 L718.4 656.8 L731.3 650.8 L733.5 621.2 L732.0 425.7 L557.5 514.6Z",
  "lx": 667.9,
  "ly": 550.9
 },
 {
  "field": "S-6",
  "farm": "Stanley's",
  "acres": 7.32,
  "color": "#9a5bb5",
  "d": "M43.6 746.3 L41.5 743.9 L40.7 740.3 L40.1 702.5 L40.5 691.9 L44.2 691.8 L47.5 700.0 L54.2 724.4 L57.5 737.6 L58.7 745.0 L57.5 745.6 L43.6 746.3ZM107.8 745.4 L69.7 745.9 L64.9 745.0 L61.1 734.9 L50.0 697.4 L45.9 686.8 L45.0 675.6 L46.3 663.8 L51.7 654.1 L55.2 649.4 L65.8 639.0 L86.6 623.2 L106.4 604.7 L109.1 602.7 L111.9 602.7 L113.8 741.6 L112.7 744.6 L107.8 745.4ZM41.5 655.1 L40.0 654.0 L40.1 613.5 L40.5 607.0 L43.0 601.9 L45.5 599.8 L51.8 597.4 L107.2 598.5 L103.7 602.9 L74.8 626.9 L62.0 638.1 L58.4 642.2 L53.6 645.8 L47.3 653.9 L45.2 655.1 L41.5 655.1Z",
  "lx": 116,
  "ly": 664,
  "anchor": "start"
 }
];
