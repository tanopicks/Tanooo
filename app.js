// Mapeo oficial de IDs y nombres de equipos de la LMB en la API de MLB Stats
const TEAM_MAP = {
  532: { name: "Diablos Rojos del México", short: "Diablos Rojos" },
  562: { name: "Sultanes de Monterrey", short: "Sultanes" },
  496: { name: "Leones de Yucatán", short: "Leones" },
  560: { name: "Acereros del Norte", short: "Acereros" },
  524: { name: "Algodoneros de Unión Laguna", short: "Algodoneros" },
  554: { name: "Saraperos de Saltillo", short: "Saraperos" },
  5010: { name: "Toros de Tijuana", short: "Toros" },
  520: { name: "Pericos de Puebla", short: "Pericos" },
  442: { name: "Olmecas de Tabasco", short: "Olmecas" },
  579: { name: "Guerreros de Oaxaca", short: "Guerreros" },
  434: { name: "Bravos de León", short: "Bravos" },
  528: { name: "Rieleros de Aguascalientes", short: "Rieleros" },
  522: { name: "Tecolotes de los Dos Laredos", short: "Tecos" },
  526: { name: "Piratas de Campeche", short: "Piratas" },
  494: { name: "Tigres de Quintana Roo", short: "Tigres" },
  550: { name: "El Águila de Veracruz", short: "El Águila" },
  6304: { name: "Charros de Jalisco", short: "Charros" },
  4444: { name: "Caliente de Durango", short: "Caliente" },
  6303: { name: "Conspiradores de Querétaro", short: "Conspiradores" },
  6302: { name: "Dorados de Chihuahua", short: "Dorados" }
};

// Base de datos de respaldo en caso de que falle la API (LMB)
const FALLBACK_DATABASE = {
  532: {
    nombre: "Diablos Rojos del México",
    short: "Diablos Rojos",
    bateo: { avg: 0.312, obp: 0.385, slg: 0.518, ops: 0.903, r: 604, hr: 116, g: 78, ab: 2740, h: 855 },
    pitcheo: { era: 3.85, whip: 1.28, hr: 72, bb: 245, so: 620, avg: 0.242 },
    abridor: { nombre: "Trevor Bauer", era: 2.10, whip: 0.98, hr: 2, bb: 14, so: 76, ip: 58.0, fip: 2.05, wl: "8-1" }
  },
  562: {
    nombre: "Sultanes de Monterrey",
    short: "Sultanes",
    bateo: { avg: 0.285, obp: 0.355, slg: 0.440, ops: 0.795, r: 415, hr: 82, g: 77, ab: 2600, h: 741 },
    pitcheo: { era: 4.15, whip: 1.34, hr: 85, bb: 268, so: 565, avg: 0.258 },
    abridor: { nombre: "Daniel Mengden", era: 2.35, whip: 1.08, hr: 6, bb: 19, so: 79, ip: 92.0, fip: 2.50, wl: "7-2" }
  },
  496: {
    nombre: "Leones de Yucatán",
    short: "Leones",
    bateo: { avg: 0.272, obp: 0.348, slg: 0.420, ops: 0.768, r: 398, hr: 65, g: 76, ab: 2521, h: 683 },
    pitcheo: { era: 3.65, whip: 1.25, hr: 59, bb: 235, so: 599, avg: 0.238 },
    abridor: { nombre: "César Valdez", era: 2.85, whip: 1.12, hr: 3, bb: 8, so: 32, ip: 52.0, fip: 3.10, wl: "5-3" }
  },
  5010: {
    nombre: "Toros de Tijuana",
    short: "Toros",
    bateo: { avg: 0.282, obp: 0.352, slg: 0.455, ops: 0.807, r: 367, hr: 85, g: 75, ab: 2500, h: 705 },
    pitcheo: { era: 3.36, whip: 1.18, hr: 52, bb: 183, so: 698, avg: 0.242 },
    abridor: { nombre: "Daniel Martinez", era: 2.11, whip: 1.07, hr: 3, bb: 31, so: 59, ip: 76.2, fip: 2.80, wl: "6-1" }
  },
  520: {
    nombre: "Pericos de Puebla",
    short: "Pericos",
    bateo: { avg: 0.304, obp: 0.374, slg: 0.479, ops: 0.853, r: 435, hr: 85, g: 76, ab: 2570, h: 782 },
    pitcheo: { era: 4.82, whip: 1.45, hr: 88, bb: 272, so: 545, avg: 0.266 },
    abridor: { nombre: "Gabriel Ynoa", era: 3.98, whip: 1.30, hr: 5, bb: 10, so: 41, ip: 42.0, fip: 3.80, wl: "4-3" }
  }
};

// Base de datos de respaldo en caso de que falle la API (MLB)
const FALLBACK_DATABASE_MLB = {
  147: {
    nombre: "New York Yankees",
    short: "Yankees",
    bateo: { avg: 0.254, obp: 0.333, slg: 0.440, ops: 0.773, r: 815, hr: 237, g: 162, ab: 5480, h: 1392 },
    pitcheo: { era: 3.74, whip: 1.24, hr: 178, bb: 480, so: 1450, avg: 0.231 },
    abridor: { nombre: "Gerrit Cole", era: 3.26, whip: 1.05, hr: 18, bb: 40, so: 220, ip: 200.0, fip: 3.15, wl: "15-4" }
  },
  119: {
    nombre: "Los Angeles Dodgers",
    short: "Dodgers",
    bateo: { avg: 0.272, obp: 0.345, slg: 0.455, ops: 0.800, r: 890, hr: 249, g: 162, ab: 5520, h: 1501 },
    pitcheo: { era: 3.52, whip: 1.20, hr: 165, bb: 450, so: 1500, avg: 0.225 },
    abridor: { nombre: "Yoshinobu Yamamoto", era: 3.00, whip: 1.11, hr: 12, bb: 35, so: 180, ip: 170.0, fip: 2.95, wl: "12-5" }
  },
  117: {
    nombre: "Houston Astros",
    short: "Astros",
    bateo: { avg: 0.262, obp: 0.329, slg: 0.428, ops: 0.757, r: 809, hr: 222, g: 162, ab: 5500, h: 1441 },
    pitcheo: { era: 3.94, whip: 1.28, hr: 182, bb: 510, so: 1410, avg: 0.239 },
    abridor: { nombre: "Framber Valdez", era: 3.45, whip: 1.21, hr: 19, bb: 55, so: 188, ip: 198.0, fip: 3.50, wl: "14-8" }
  },
  111: {
    nombre: "Boston Red Sox",
    short: "Red Sox",
    bateo: { avg: 0.258, obp: 0.324, slg: 0.424, ops: 0.748, r: 772, hr: 188, g: 162, ab: 5550, h: 1432 },
    pitcheo: { era: 4.04, whip: 1.30, hr: 195, bb: 490, so: 1380, avg: 0.245 },
    abridor: { nombre: "Brayan Bello", era: 4.10, whip: 1.28, hr: 22, bb: 58, so: 150, ip: 175.0, fip: 4.05, wl: "10-10" }
  }
};

// Base de datos de lanzadores abridores para la KBO (Rotaciones principales)
const FALLBACK_PITCHERS_KBO = {
  // KIA
  "p_kia_naile": { teamId: "KIA", nombre: "James Naile", era: 2.53, whip: 1.15, hr: 10, bb: 35, so: 130, ip: 150.0, fip: 2.90, wl: "12-5" },
  "p_kia_yang": { teamId: "KIA", nombre: "Yang Hyeon-jong", era: 3.65, whip: 1.25, hr: 12, bb: 40, so: 120, ip: 160.0, fip: 3.50, wl: "11-8" },
  "p_kia_lauer": { teamId: "KIA", nombre: "Eric Lauer", era: 4.10, whip: 1.30, hr: 6, bb: 20, so: 50, ip: 60.0, fip: 3.80, wl: "5-3" },
  "p_kia_hwang": { teamId: "KIA", nombre: "Hwang Dong-ha", era: 4.37, whip: 1.38, hr: 12, bb: 27, so: 50, ip: 68.0, fip: 4.55, wl: "6-3" },
  "p_kia_kim": { teamId: "KIA", nombre: "Kim Do-hyeon", era: 4.50, whip: 1.40, hr: 8, bb: 25, so: 45, ip: 60.0, fip: 4.20, wl: "4-3" },
  "p_kia_youn": { teamId: "KIA", nombre: "Youn Young-cheol", era: 4.15, whip: 1.32, hr: 10, bb: 30, so: 70, ip: 80.0, fip: 4.10, wl: "7-4" },
  // SAM
  "p_sam_won": { teamId: "SAM", nombre: "Won Tae-in", era: 3.66, whip: 1.25, hr: 15, bb: 45, so: 120, ip: 160.0, fip: 3.85, wl: "15-6" },
  "p_sam_connor": { teamId: "SAM", nombre: "Connor Seabold", era: 3.43, whip: 1.20, hr: 14, bb: 38, so: 135, ip: 150.0, fip: 3.50, wl: "11-6" },
  "p_sam_reyes": { teamId: "SAM", nombre: "Denyi Reyes", era: 3.81, whip: 1.25, hr: 12, bb: 40, so: 110, ip: 140.0, fip: 3.70, wl: "11-4" },
  "p_sam_baek": { teamId: "SAM", nombre: "Baek Jung-hyun", era: 4.80, whip: 1.40, hr: 12, bb: 25, so: 60, ip: 75.0, fip: 4.30, wl: "3-5" },
  "p_sam_lee": { teamId: "SAM", nombre: "Lee Seung-min", era: 5.20, whip: 1.50, hr: 10, bb: 30, so: 50, ip: 60.0, fip: 4.70, wl: "2-4" },
  // LGT
  "p_lgt_enns": { teamId: "LGT", nombre: "Dietrich Enns", era: 4.10, whip: 1.35, hr: 14, bb: 48, so: 140, ip: 155.0, fip: 3.90, wl: "13-6" },
  "p_lgt_im": { teamId: "LGT", nombre: "Im Chan-kyu", era: 3.82, whip: 1.30, hr: 11, bb: 42, so: 125, ip: 145.0, fip: 3.60, wl: "10-6" },
  "p_lgt_hernandez": { teamId: "LGT", nombre: "Elieser Hernandez", era: 3.20, whip: 1.15, hr: 4, bb: 15, so: 45, ip: 50.0, fip: 3.10, wl: "4-2" },
  "p_lgt_son": { teamId: "LGT", nombre: "Son Ju-young", era: 3.75, whip: 1.30, hr: 8, bb: 45, so: 110, ip: 120.0, fip: 3.50, wl: "8-5" },
  "p_lgt_choi": { teamId: "LGT", nombre: "Choi Won-tae", era: 4.20, whip: 1.35, hr: 12, bb: 38, so: 95, ip: 105.0, fip: 3.90, wl: "7-6" },
  // DOO
  "p_doo_kwak": { teamId: "DOO", nombre: "Kwak Been", era: 4.24, whip: 1.38, hr: 13, bb: 55, so: 130, ip: 165.0, fip: 4.15, wl: "15-9" },
  "p_doo_jordan": { teamId: "DOO", nombre: "Jordan Balazovic", era: 3.80, whip: 1.25, hr: 6, bb: 22, so: 65, ip: 70.0, fip: 3.50, wl: "4-4" },
  "p_doo_choi": { teamId: "DOO", nombre: "Choi Won-jun", era: 4.50, whip: 1.40, hr: 10, bb: 35, so: 80, ip: 100.0, fip: 4.30, wl: "8-7" },
  "p_doo_shirakawa": { teamId: "DOO", nombre: "Keisho Shirakawa", era: 5.05, whip: 1.45, hr: 6, bb: 25, so: 55, ip: 58.0, fip: 4.20, wl: "4-5" },
  // KTW
  "p_ktw_cuevas": { teamId: "KTW", nombre: "William Cuevas", era: 4.12, whip: 1.30, hr: 16, bb: 50, so: 150, ip: 170.0, fip: 3.95, wl: "8-12" },
  "p_ktw_benjamin": { teamId: "KTW", nombre: "Wes Benjamin", era: 4.63, whip: 1.38, hr: 18, bb: 45, so: 130, ip: 150.0, fip: 4.20, wl: "11-8" },
  "p_ktw_ko": { teamId: "KTW", nombre: "Ko Young-pyo", era: 4.80, whip: 1.40, hr: 12, bb: 25, so: 90, ip: 110.0, fip: 4.10, wl: "6-8" },
  "p_ktw_eom": { teamId: "KTW", nombre: "Eom Sang-back", era: 4.88, whip: 1.35, hr: 17, bb: 48, so: 140, ip: 150.0, fip: 4.20, wl: "13-10" },
  // SSG
  "p_ssg_anderson": { teamId: "SSG", nombre: "Drew Anderson", era: 3.90, whip: 1.28, hr: 11, bb: 40, so: 120, ip: 120.0, fip: 3.65, wl: "11-3" },
  "p_ssg_elias": { teamId: "SSG", nombre: "Roenis Elias", era: 4.88, whip: 1.42, hr: 15, bb: 42, so: 100, ip: 130.0, fip: 4.35, wl: "7-7" },
  "p_ssg_kim": { teamId: "SSG", nombre: "Kim Kwang-hyun", era: 4.90, whip: 1.45, hr: 18, bb: 48, so: 115, ip: 150.0, fip: 4.40, wl: "9-10" },
  "p_ssg_oh": { teamId: "SSG", nombre: "Oh Won-seok", era: 4.90, whip: 1.45, hr: 15, bb: 50, so: 100, ip: 115.0, fip: 4.50, wl: "6-8" },
  "p_ssg_song": { teamId: "SSG", nombre: "Song Young-jin", era: 5.10, whip: 1.48, hr: 12, bb: 45, so: 75, ip: 90.0, fip: 4.60, wl: "4-7" },
  // LOT
  "p_lot_wilkerson": { teamId: "LOT", nombre: "Aaron Wilkerson", era: 3.75, whip: 1.20, hr: 18, bb: 35, so: 160, ip: 180.0, fip: 3.35, wl: "12-8" },
  "p_lot_barnes": { teamId: "LOT", nombre: "Charlie Barnes", era: 3.07, whip: 1.15, hr: 10, bb: 32, so: 150, ip: 145.0, fip: 2.85, wl: "9-6" },
  "p_lot_park": { teamId: "LOT", nombre: "Park Se-woong", era: 4.90, whip: 1.42, hr: 16, bb: 45, so: 110, ip: 155.0, fip: 4.25, wl: "6-11" },
  "p_lot_kim": { teamId: "LOT", nombre: "Kim Jin-wook", era: 4.55, whip: 1.42, hr: 10, bb: 35, so: 70, ip: 80.0, fip: 4.30, wl: "4-4" },
  "p_lot_han": { teamId: "LOT", nombre: "Han Hyeon-hui", era: 4.85, whip: 1.45, hr: 12, bb: 40, so: 85, ip: 95.0, fip: 4.45, wl: "5-8" },
  // HAN
  "p_han_ryu": { teamId: "HAN", nombre: "Ryu Hyun-jin", era: 3.80, whip: 1.28, hr: 12, bb: 38, so: 115, ip: 150.0, fip: 3.55, wl: "10-8" },
  "p_han_weiss": { teamId: "HAN", nombre: "Ryan Weiss", era: 3.65, whip: 1.20, hr: 8, bb: 25, so: 80, ip: 90.0, fip: 3.30, wl: "6-4" },
  "p_han_barria": { teamId: "HAN", nombre: "Jaime Barria", era: 5.15, whip: 1.45, hr: 11, bb: 28, so: 75, ip: 95.0, fip: 4.55, wl: "6-7" },
  "p_han_moon": { teamId: "HAN", nombre: "Moon Dong-ju", era: 4.25, whip: 1.35, hr: 14, bb: 40, so: 110, ip: 125.0, fip: 3.95, wl: "8-8" },
  "p_han_hwang": { teamId: "HAN", nombre: "Hwang Jun-seo", era: 4.95, whip: 1.45, hr: 10, bb: 35, so: 70, ip: 80.0, fip: 4.45, wl: "3-8" },
  // NCD
  "p_ncd_hart": { teamId: "NCD", nombre: "Kyle Hart", era: 2.44, whip: 1.03, hr: 9, bb: 30, so: 160, ip: 160.0, fip: 2.65, wl: "13-3" },
  "p_ncd_jokisch": { teamId: "NCD", nombre: "Eric Jokisch", era: 5.20, whip: 1.42, hr: 8, bb: 15, so: 35, ip: 45.0, fip: 4.60, wl: "3-4" },
  "p_ncd_shin": { teamId: "NCD", nombre: "Shin Min-hyeok", era: 4.80, whip: 1.38, hr: 15, bb: 35, so: 95, ip: 120.0, fip: 4.25, wl: "8-9" },
  "p_ncd_lee": { teamId: "NCD", nombre: "Lee Jae-hak", era: 4.90, whip: 1.42, hr: 12, bb: 35, so: 85, ip: 95.0, fip: 4.35, wl: "4-7" },
  "p_ncd_kim": { teamId: "NCD", nombre: "Kim Si-hun", era: 4.75, whip: 1.40, hr: 10, bb: 48, so: 80, ip: 100.0, fip: 4.40, wl: "5-6" },
  // KIW
  "p_kiw_jurado": { teamId: "KIW", nombre: "Ariel Jurado", era: 3.90, whip: 1.25, hr: 15, bb: 35, so: 130, ip: 175.0, fip: 3.65, wl: "10-8" },
  "p_kiw_heo": { teamId: "KIW", nombre: "Emmanuel De Jesus", era: 3.60, whip: 1.25, hr: 13, bb: 52, so: 140, ip: 160.0, fip: 3.45, wl: "13-11" },
  "p_kiw_ha": { teamId: "KIW", nombre: "Ha Young-min", era: 4.30, whip: 1.35, hr: 12, bb: 38, so: 85, ip: 110.0, fip: 4.10, wl: "8-7" },
  "p_kiw_lee": { teamId: "KIW", nombre: "Lee Jong-min", era: 5.40, whip: 1.55, hr: 14, bb: 45, so: 60, ip: 85.0, fip: 4.80, wl: "3-9" }
};

// Traducciones de nombres de pitchers coreanos a inglés (Mapeado con mykbostats.com)
const KBO_NAME_TRANSLATIONS = {
  // KIA
  "네일": "James Naile", "제임스 네일": "James Naile",
  "양현종": "Yang Hyeon-jong",
  "라우어": "Eric Lauer", "에릭 라우어": "Eric Lauer",
  "황동하": "Hwang Dong-ha",
  "김도현": "Kim Do-hyeon",
  "윤영철": "Youn Young-cheol",
  // Samsung
  "원태인": "Won Tae-in",
  "코너": "Connor Seabold", "코너 시볼드": "Connor Seabold",
  "레예스": "Denyi Reyes", "대니 레예스": "Denyi Reyes",
  "백정현": "Baek Jung-hyun",
  "이승민": "Lee Seung-min",
  // LG
  "엔스": "Dietrich Enns", "디트릭 엔스": "Dietrich Enns",
  "임찬규": "Im Chan-kyu",
  "에르난데스": "Elieser Hernandez", "엘리에저 에르난데스": "Elieser Hernandez",
  "손주영": "Son Ju-young",
  "최원태": "Choi Won-tae",
  // Doosan
  "곽빈": "Kwak Been",
  "발라조빅": "Jordan Balazovic", "조던 발라조빅": "Jordan Balazovic",
  "최원준": "Choi Won-jun",
  "시라카와": "Keisho Shirakawa", "케이쇼 시라카와": "Keisho Shirakawa",
  // KT
  "쿠에바스": "William Cuevas", "윌리엄 쿠에바스": "William Cuevas",
  "벤자민": "Wes Benjamin", "웨스 벤자민": "Wes Benjamin",
  "고영표": "Ko Young-pyo",
  "엄상백": "Eom Sang-back",
  // SSG
  "앤더슨": "Drew Anderson", "드류 앤더슨": "Drew Anderson",
  "엘리아스": "Roenis Elias", "로에니스 엘리아스": "Roenis Elias",
  "김광현": "Kim Kwang-hyun",
  "오원석": "Oh Won-seok",
  "송영진": "Song Young-jin",
  // Lotte
  "윌커슨": "Aaron Wilkerson", "애런 윌커슨": "Aaron Wilkerson",
  "반즈": "Charlie Barnes", "찰리 반즈": "Charlie Barnes",
  "박세웅": "Park Se-woong",
  "김진욱": "Kim Jin-wook",
  "한현희": "Han Hyeon-hui",
  // Hanwha
  "류현진": "Ryu Hyun-jin",
  "와이스": "Ryan Weiss", "라이언 와이스": "Ryan Weiss",
  "바리아": "Jaime Barria", "하이메 바리아": "Jaime Barria",
  "문동주": "Moon Dong-ju",
  "황준서": "Hwang Jun-seo",
  // NC
  "하트": "Kyle Hart", "카일 하트": "Kyle Hart",
  "요키시": "Eric Jokisch", "에릭 요키시": "Eric Jokisch",
  "신민혁": "Shin Min-hyeok",
  "이재학": "Lee Jae-hak",
  "김시훈": "Kim Si-hun",
  // Kiwoom
  "후라도": "Ariel Jurado", "아리엘 후라도": "Ariel Jurado",
  "헤이수스": "Emmanuel De Jesus", "엔마누엘 헤이수스": "Emmanuel De Jesus",
  "하영민": "Ha Young-min"
};

// Base de datos de respaldo para la Liga Coreana (KBO)
const FALLBACK_DATABASE_KBO = {
  "KIA": {
    nombre: "KIA Tigers",
    short: "Tigers",
    bateo: { avg: 0.301, obp: 0.370, slg: 0.460, ops: 0.830, r: 850, hr: 160, g: 144, ab: 5050, h: 1520 },
    pitcheo: { era: 4.10, whip: 1.40, hr: 130, bb: 450, so: 1100, avg: 0.265 },
    abridor: { nombre: "James Naile", era: 2.53, whip: 1.15, hr: 10, bb: 35, so: 130, ip: 150.0, fip: 2.90, wl: "12-5" }
  },
  "SAM": {
    nombre: "Samsung Lions",
    short: "Lions",
    bateo: { avg: 0.269, obp: 0.340, slg: 0.420, ops: 0.760, r: 770, hr: 180, g: 144, ab: 4950, h: 1330 },
    pitcheo: { era: 4.30, whip: 1.45, hr: 140, bb: 480, so: 1050, avg: 0.270 },
    abridor: { nombre: "Won Tae-in", era: 3.66, whip: 1.25, hr: 15, bb: 45, so: 120, ip: 160.0, fip: 3.85, wl: "15-6" }
  },
  "LGT": {
    nombre: "LG Twins",
    short: "Twins",
    bateo: { avg: 0.283, obp: 0.360, slg: 0.410, ops: 0.770, r: 800, hr: 115, g: 144, ab: 5020, h: 1420 },
    pitcheo: { era: 4.60, whip: 1.50, hr: 120, bb: 500, so: 1000, avg: 0.275 },
    abridor: { nombre: "Dietrich Enns", era: 4.10, whip: 1.35, hr: 14, bb: 48, so: 140, ip: 155.0, fip: 3.90, wl: "13-6" }
  },
  "DOO": {
    nombre: "Doosan Bears",
    short: "Bears",
    bateo: { avg: 0.276, obp: 0.350, slg: 0.425, ops: 0.775, r: 780, hr: 145, g: 144, ab: 5000, h: 1380 },
    pitcheo: { era: 4.80, whip: 1.52, hr: 135, bb: 490, so: 1080, avg: 0.280 },
    abridor: { nombre: "Kwak Been", era: 4.24, whip: 1.38, hr: 13, bb: 55, so: 130, ip: 165.0, fip: 4.15, wl: "15-9" }
  },
  "KTW": {
    nombre: "KT Wiz",
    short: "Wiz",
    bateo: { avg: 0.275, obp: 0.348, slg: 0.415, ops: 0.763, r: 760, hr: 130, g: 144, ab: 4980, h: 1370 },
    pitcheo: { era: 5.10, whip: 1.55, hr: 140, bb: 470, so: 980, avg: 0.285 },
    abridor: { nombre: "William Cuevas", era: 4.12, whip: 1.30, hr: 16, bb: 50, so: 150, ip: 170.0, fip: 3.95, wl: "8-12" }
  },
  "SSG": {
    nombre: "SSG Landers",
    short: "Landers",
    bateo: { avg: 0.272, obp: 0.343, slg: 0.422, ops: 0.765, r: 755, hr: 140, g: 144, ab: 4960, h: 1350 },
    pitcheo: { era: 5.20, whip: 1.56, hr: 145, bb: 510, so: 1020, avg: 0.288 },
    abridor: { nombre: "Drew Anderson", era: 3.90, whip: 1.28, hr: 11, bb: 40, so: 120, ip: 120.0, fip: 3.65, wl: "11-3" }
  },
  "LOT": {
    nombre: "Lotte Giants",
    short: "Giants",
    bateo: { avg: 0.280, obp: 0.350, slg: 0.420, ops: 0.770, r: 740, hr: 120, g: 144, ab: 5010, h: 1400 },
    pitcheo: { era: 5.05, whip: 1.54, hr: 130, bb: 490, so: 1000, avg: 0.282 },
    abridor: { nombre: "Aaron Wilkerson", era: 3.75, whip: 1.20, hr: 18, bb: 35, so: 160, ip: 180.0, fip: 3.35, wl: "12-8" }
  },
  "HAN": {
    nombre: "Hanwha Eagles",
    short: "Eagles",
    bateo: { avg: 0.271, obp: 0.349, slg: 0.405, ops: 0.754, r: 730, hr: 110, g: 144, ab: 4970, h: 1345 },
    pitcheo: { era: 4.95, whip: 1.51, hr: 125, bb: 480, so: 1040, avg: 0.279 },
    abridor: { nombre: "Ryu Hyun-jin", era: 3.80, whip: 1.28, hr: 12, bb: 38, so: 115, ip: 150.0, fip: 3.55, wl: "10-8" }
  },
  "NCD": {
    nombre: "NC Dinos",
    short: "Dinos",
    bateo: { avg: 0.270, obp: 0.345, slg: 0.420, ops: 0.765, r: 745, hr: 140, g: 144, ab: 4990, h: 1348 },
    pitcheo: { era: 4.85, whip: 1.49, hr: 130, bb: 460, so: 1030, avg: 0.275 },
    abridor: { nombre: "Kyle Hart", era: 2.44, whip: 1.03, hr: 9, bb: 30, so: 160, ip: 160.0, fip: 2.65, wl: "13-3" }
  },
  "KIW": {
    nombre: "Kiwoom Heroes",
    short: "Heroes",
    bateo: { avg: 0.265, obp: 0.338, slg: 0.390, ops: 0.728, r: 690, hr: 95, g: 144, ab: 4920, h: 1300 },
    pitcheo: { era: 5.35, whip: 1.60, hr: 130, bb: 480, so: 920, avg: 0.290 },
    abridor: { nombre: "Ariel Jurado", era: 3.90, whip: 1.25, hr: 15, bb: 35, so: 130, ip: 175.0, fip: 3.65, wl: "10-8" }
  }
};

// Configuración de Ligas Soportadas
const LEAGUE_CONFIGS = {
  LMB: {
    sportId: 23,
    leagueId: "125",
    cacheKey: "lmb_data_v3",
    label: "Liga Mexicana de Béisbol",
    badgeClass: "badge-lmb",
    fallback: FALLBACK_DATABASE,
    defaultTeamA: "532", // Diablos Rojos
    defaultTeamB: "562"  // Sultanes
  },
  MLB: {
    sportId: 1,
    leagueId: "103,104",
    cacheKey: "mlb_data_v3",
    label: "Grandes Ligas (MLB)",
    badgeClass: "badge-mlb",
    fallback: FALLBACK_DATABASE_MLB,
    defaultTeamA: "147", // Yankees
    defaultTeamB: "119"  // Dodgers
  },
  KBO: {
    sportId: 32,
    leagueId: "32",
    cacheKey: "kbo_data_v3",
    label: "Liga de Corea (KBO)",
    badgeClass: "badge-kbo",
    fallback: FALLBACK_DATABASE_KBO,
    defaultTeamA: "KIA", // KIA Tigers
    defaultTeamB: "SAM"  // Samsung Lions
  }
};

// Variables de estado global
let activeLeague = "LMB";
let loadedTeams = {};
let leagueData = {
  teams: {},
  pitchers: {},
  games: []
};

let activeBullpenFatigue = {
  homeScore: 0,
  awayScore: 0,
  homeStatus: "Fresco",
  awayStatus: "Fresco",
  homeYesterday: "-",
  awayYesterday: "-"
};
let boxscoreCache = {};

let teamAKey = "532";
let teamBKey = "562";
const CURRENT_SEASON = new Date().getFullYear();

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", async () => {
  // Restaurar tema guardado
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    toggleTheme();
  }

  // Ajustar fecha
  document.getElementById("lmb-date").textContent = CURRENT_SEASON;
  
  // Establecer fecha de hoy en el selector
  const todayStr = getTodayDateString();
  const dateInput = document.getElementById("game-date-input");
  if (dateInput) {
    dateInput.value = todayStr;
    dateInput.addEventListener("change", async (e) => {
      if (e.target.value) {
        showLoading(true, "Cargando partidos de la fecha...");
        await loadDailyGames(e.target.value);
        showLoading(false);
      }
    });
  }

  // Ocultar selector de fecha por defecto si la liga inicial no es KBO
  const dateContainer = document.querySelector(".sync-right");
  if (dateContainer) {
    dateContainer.style.display = activeLeague === "KBO" ? "flex" : "none";
  }

  // Cargar datos principales de la liga activa (LMB por defecto)
  const config = LEAGUE_CONFIGS[activeLeague];
  teamAKey = config.defaultTeamA;
  teamBKey = config.defaultTeamB;

  showLoading(true, `Cargando datos en tiempo real de ${config.label}...`);
  const success = await initLeagueData(activeLeague);
  
  if (success) {
    loadedTeams = { ...leagueData.teams };
  } else {
    loadedTeams = { ...config.fallback };
    document.getElementById("sync-status-msg").textContent = `Trabajando con base de respaldo de ${config.label} (Sin conexión API)`;
    document.getElementById("sync-status-msg").className = "status-msg text-warning";
  }

  populateTeamSelectors();

  // Poner valores por defecto en el DOM y disparar sincronización inicial de equipos
  const selectA = document.getElementById("select-team-a");
  const selectB = document.getElementById("select-team-b");
  if (selectA && selectB) {
    selectA.value = teamAKey;
    selectB.value = teamBKey;
  }
  changeActiveTeams();

  await loadDailyGames(todayStr);

  if (leagueData.games && leagueData.games.length > 0) {
    selectGame(0);
  }

  showLoading(false);
  recalculateAnalysis();
  startAutoRefreshTimer();
});

/**
 * Retorna la fecha de hoy en formato YYYY-MM-DD
 */
function getTodayDateString() {
  try {
    // Retorna la fecha actual en la zona horaria de Tijuana en formato YYYY-MM-DD
    const options = { timeZone: 'America/Tijuana', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatter = new Intl.DateTimeFormat('fr-CA', options);
    return formatter.format(new Date());
  } catch (e) {
    console.error("Error al obtener fecha de Tijuana, usando local...", e);
    const d = new Date();
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }
}

/**
 * Controla el spinner de carga
 */
function showLoading(show, message = "Procesando...") {
  const spinner = document.getElementById("global-spinner");
  const spMsg = document.getElementById("spinner-message");
  if (spinner) {
    if (show) {
      if (spMsg) spMsg.textContent = message;
      spinner.style.display = "flex";
    } else {
      spinner.style.display = "none";
    }
  }
}

/**
 * Cambia la liga activa (LMB / MLB), descarga los datos correspondientes y actualiza la UI
 */
async function changeLeague(leagueKey) {
  if (activeLeague === leagueKey) return;
  
  activeLeague = leagueKey;

  // Actualizar botones de la cabecera con validación de existencia
  const btnLmb = document.getElementById("btn-lmb");
  const btnMlb = document.getElementById("btn-mlb");
  const btnKbo = document.getElementById("btn-kbo");
  if (btnLmb) btnLmb.classList.toggle("active", leagueKey === "LMB");
  if (btnMlb) btnMlb.classList.toggle("active", leagueKey === "MLB");
  if (btnKbo) btnKbo.classList.toggle("active", leagueKey === "KBO");

  // Mostrar/Ocultar el selector de fecha (La fecha solo se puede mover en la KBO)
  const dateContainer = document.querySelector(".sync-right");
  const dateInput = document.getElementById("game-date-input");
  if (dateContainer) {
    if (leagueKey === "KBO") {
      dateContainer.style.display = "flex";
    } else {
      dateContainer.style.display = "none";
      if (dateInput) {
        dateInput.value = getTodayDateString(); // Restablecer a hoy para LMB/MLB
      }
    }
  }

  // Actualizar badge de liga
  const badge = document.getElementById("league-badge");
  if (badge) {
    const config = LEAGUE_CONFIGS[leagueKey];
    badge.textContent = config.label;
    badge.className = `badge ${config.badgeClass}`;
  }

  // Cambiar llaves y equipos por defecto de la liga
  const config = LEAGUE_CONFIGS[leagueKey];
  teamAKey = config.defaultTeamA;
  teamBKey = config.defaultTeamB;

  showLoading(true, `Cargando datos de ${config.label}...`);
  const success = await initLeagueData(leagueKey);

  if (leagueKey === "KBO") {
    // Para KBO, inicializamos el selector y cargamos los partidos del día en vivo
    loadedTeams = { ...leagueData.teams };
    populateTeamSelectors();
    
    // Configurar selectores de equipos por defecto en el DOM
    const selectA = document.getElementById("select-team-a");
    const selectB = document.getElementById("select-team-b");
    if (selectA && selectB) {
      selectA.value = teamAKey;
      selectB.value = teamBKey;
    }
    
    changeActiveTeams();
    
    const dateInput = document.getElementById("game-date-input");
    const dateStr = dateInput ? dateInput.value : getTodayDateString();
    await loadDailyGames(dateStr);
    showLoading(false);
    startAutoRefreshTimer();
    return;
  }

  if (success) {
    loadedTeams = { ...leagueData.teams };
    populateTeamSelectors();
    
    // Obtener la fecha del input y cargar los partidos
    const dateInput = document.getElementById("game-date-input");
    const dateStr = dateInput ? dateInput.value : getTodayDateString();
    await loadDailyGames(dateStr);

    if (leagueData.games && leagueData.games.length > 0) {
      selectGame(0);
    }
  } else {
    // Usar base de datos fallback
    loadedTeams = { ...config.fallback };
    populateTeamSelectors();
    document.getElementById("sync-status-msg").textContent = `Trabajando con datos de respaldo de ${config.label}`;
    document.getElementById("sync-status-msg").className = "status-msg text-warning";
  }

  showLoading(false);
  recalculateAnalysis();
  startAutoRefreshTimer();
}

/**
 * Inicializa y descarga standings y estadísticas de la liga seleccionada
 */
async function initLeagueData(leagueKey, force = false) {
  const config = LEAGUE_CONFIGS[leagueKey];
  
  if (leagueKey === "KBO") {
    leagueData.teams = JSON.parse(JSON.stringify(config.fallback));
    leagueData.pitchers = {};
    
    // Cargar todas las rotaciones de abridores coreanos pre-cargados
    Object.keys(FALLBACK_PITCHERS_KBO).forEach(pitcherId => {
      const p = FALLBACK_PITCHERS_KBO[pitcherId];
      leagueData.pitchers[pitcherId] = {
        id: pitcherId,
        teamId: p.teamId,
        nombre: p.nombre,
        era: p.era,
        whip: p.whip,
        hr: p.hr,
        bb: p.bb,
        so: p.so,
        ip: p.ip,
        fip: p.fip,
        wl: p.wl
      };
    });

    loadedTeams = { ...leagueData.teams };
    
    // El calendario de la KBO se buscará dinámicamente mediante scraping en loadDailyGames
    leagueData.games = [];
    return true;
  }
  
  const cacheKey = `${config.cacheKey}_${CURRENT_SEASON}`;
  const cached = localStorage.getItem(cacheKey);
  const cacheTime = localStorage.getItem(`${cacheKey}_time`);
  
  // Cache de 3 horas para estadísticas de temporada regular (se omite si force es true)
  if (!force && cached && cacheTime && (Date.now() - parseInt(cacheTime) < 3 * 60 * 60 * 1000)) {
    try {
      leagueData = JSON.parse(cached);
      console.log(`Cargados datos de ${leagueKey} desde el caché local`);
      updateSyncBadge();
      return true;
    } catch (e) {
      console.warn("Fallo al leer el caché", e);
    }
  }

  try {
    const season = CURRENT_SEASON;
    
    // 1. Obtener Standings (Victorias, Derrotas y Récord General)
    const standingsRes = await fetch(`https://statsapi.mlb.com/api/v1/standings?leagueId=${config.leagueId}&season=${season}`);
    if (!standingsRes.ok) throw new Error("Fallo al obtener standings");
    const standingsData = await standingsRes.json();
    
    const standingsMap = {};
    if (standingsData.records) {
      standingsData.records.forEach(record => {
        if (record.teamRecords) {
          record.teamRecords.forEach(tr => {
            standingsMap[tr.team.id] = {
              wins: tr.wins || 0,
              losses: tr.losses || 0,
              pct: parseFloat(tr.winningPercentage) || 0.0,
              runsScored: tr.runsScored || 0,
              runsAllowed: tr.runsAllowed || 0,
              diff: tr.runDifferential || 0
            };
          });
        }
      });
    }

    // 2. Obtener Bateo Colectivo
    const hittingRes = await fetch(`https://statsapi.mlb.com/api/v1/teams/stats?season=${season}&stats=season&group=hitting&sportIds=${config.sportId}`);
    if (!hittingRes.ok) throw new Error("Fallo al obtener bateo colectivo");
    const hittingData = await hittingRes.json();

    // 3. Obtener Pitcheo Colectivo
    const pitchingRes = await fetch(`https://statsapi.mlb.com/api/v1/teams/stats?season=${season}&stats=season&group=pitching&sportIds=${config.sportId}`);
    if (!pitchingRes.ok) throw new Error("Fallo al obtener pitcheo colectivo");
    const pitchingData = await pitchingRes.json();

    // 4. Obtener Todos los Lanzadores para Estadísticas de Abridores (Usando playerPool=all para incluir no-calificados)
    const playersRes = await fetch(`https://statsapi.mlb.com/api/v1/stats?stats=season&group=pitching&sportId=${config.sportId}&season=${season}&limit=1200&playerPool=all`);
    if (!playersRes.ok) throw new Error("Fallo al obtener lanzadores individuales");
    const playersData = await playersRes.json();

    const pitchersMap = {};
    if (playersData.stats && playersData.stats[0] && playersData.stats[0].splits) {
      playersData.stats[0].splits.forEach(split => {
        if (split.player) {
          const p = split.player;
          const s = split.stat || {};
          const ip = parseFloat(s.inningsPitched) || 0;
          const fip = window.predictor.calculateFIP(s.homeRuns || 0, s.baseOnBalls || 0, s.strikeOuts || 0, ip);
          
          pitchersMap[p.id] = {
            id: p.id,
            nombre: p.fullName,
            teamId: split.team ? split.team.id : null,
            era: parseFloat(s.era) || 0.0,
            whip: parseFloat(s.whip) || 0.0,
            hr: parseInt(s.homeRuns) || 0,
            bb: parseInt(s.baseOnBalls) || 0,
            so: parseInt(s.strikeOuts) || 0,
            ip: ip,
            fip: fip,
            wl: `${s.wins || 0}-${s.losses || 0}`
          };
        }
      });
    }

    // Procesar Equipos y vincular Bateo y Pitcheo
    const teamsMap = {};
    if (hittingData.stats && hittingData.stats[0] && hittingData.stats[0].splits) {
      hittingData.stats[0].splits.forEach(split => {
        const t = split.team;
        const s = split.stat || {};
        const shortName = TEAM_MAP[t.id] ? TEAM_MAP[t.id].short : t.name;

        teamsMap[t.id] = {
          id: t.id,
          nombre: t.name,
          short: shortName,
          records: standingsMap[t.id] || { wins: 0, losses: 0, pct: 0.0, runsScored: 0, runsAllowed: 0, diff: 0 },
          bateo: {
            avg: parseFloat(s.avg) || 0.0,
            obp: parseFloat(s.obp) || 0.0,
            slg: parseFloat(s.slg) || 0.0,
            ops: parseFloat(s.ops) || 0.0,
            r: parseInt(s.runs) || 0,
            hr: parseInt(s.homeRuns) || 0,
            g: parseInt(s.gamesPlayed) || 0,
            ab: parseInt(s.atBats) || 0,
            h: parseInt(s.hits) || 0,
            d: parseInt(s.doubles) || 0,
            t: parseInt(s.triples) || 0,
            rbi: parseInt(s.rbi) || 0,
            bb: parseInt(s.baseOnBalls) || 0,
            so: parseInt(s.strikeOuts) || 0,
            sb: parseInt(s.stolenBases) || 0,
            cs: parseInt(s.caughtStealing) || 0
          },
          pitcheo: {
            era: 4.50, whip: 1.40, hr: 0, bb: 0, so: 0, avg: 0.270, w: 0, l: 0, sv: 0, ip: 0, h: 0, r: 0, er: 0
          },
          abridor: {
            nombre: "Por anunciar", era: 4.50, whip: 1.35, hr: 0, bb: 0, so: 0, ip: 0.0, fip: 4.50, wl: "0-0"
          }
        };
      });
    }

    if (pitchingData.stats && pitchingData.stats[0] && pitchingData.stats[0].splits) {
      pitchingData.stats[0].splits.forEach(split => {
        const t = split.team;
        const s = split.stat || {};
        if (teamsMap[t.id]) {
          teamsMap[t.id].pitcheo = {
            era: parseFloat(s.era) || 0.0,
            whip: parseFloat(s.whip) || 0.0,
            hr: parseInt(s.homeRuns) || 0,
            bb: parseInt(s.baseOnBalls) || 0,
            so: parseInt(s.strikeOuts) || 0,
            avg: parseFloat(s.avg) || 0.0, // BAA (Bateo en contra)
            w: parseInt(s.wins) || 0,
            l: parseInt(s.losses) || 0,
            sv: parseInt(s.saves) || 0,
            ip: parseFloat(s.inningsPitched) || 0,
            h: parseInt(s.hits) || 0,
            r: parseInt(s.runs) || 0,
            er: parseInt(s.earnedRuns) || 0
          };
        }
      });
    }

    // Comprobación de seguridad
    if (Object.keys(teamsMap).length === 0) {
      console.warn(`API de ${leagueKey} retornó 0 equipos. Usando base local.`);
      return false;
    }

    leagueData.teams = teamsMap;
    leagueData.pitchers = pitchersMap;

    // Guardar en caché local
    localStorage.setItem(cacheKey, JSON.stringify(leagueData));
    localStorage.setItem(`${cacheKey}_time`, Date.now().toString());

    updateSyncBadge();
    return true;
  } catch (error) {
    console.error(`Error al descargar datos de ${leagueKey} de la API:`, error);
    return false;
  }
}

/**
 * Actualiza el indicador visual de última sincronización
 */
function updateSyncBadge() {
  const syncBadge = document.getElementById("sync-status-msg");
  if (syncBadge) {
    const config = LEAGUE_CONFIGS[activeLeague];
    syncBadge.textContent = `Datos oficiales de ${config.label} sincronizados en vivo`;
    syncBadge.className = "status-msg text-success";
  }
}

/**
 * Realiza una consulta HTTP intentando múltiples proxies CORS públicos en caso de falla o caída
 */
async function fetchWithProxy(targetUrl, format = "json", timeoutMs = 4000) {
  const proxies = [
    // 1. CorsProxy.io (Excelente soporte para consultas de navegador)
    {
      name: "CorsProxy",
      url: (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
      parse: (res) => res.text()
    },
    // 2. AllOrigins
    {
      name: "AllOrigins",
      url: (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
      parse: async (res) => {
        const json = await res.json();
        return json.contents;
      }
    },
    // 3. CodeTabs
    {
      name: "CodeTabs",
      url: (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
      parse: (res) => res.text()
    }
  ];

  let lastError = null;
  for (const proxy of proxies) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const proxyUrl = proxy.url(targetUrl);
      console.log(`Intentando proxy CORS: ${proxy.name} para ${targetUrl}`);
      const res = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(id);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const rawData = await proxy.parse(res);
      if (!rawData) throw new Error("Respuesta vacía");
      
      if (format === "json") {
        return JSON.parse(rawData);
      } else {
        return rawData;
      }
    } catch (err) {
      clearTimeout(id);
      console.warn(`Proxy CORS ${proxy.name} falló:`, err);
      lastError = err;
    }
  }
  throw lastError || new Error("Todos los proxies CORS fallaron");
}

/**
 * Retorna la lista de partidos programados de la KBO según el día de la semana para la temporada
 */
function getKBOLocalSchedule(dateStr) {
  const dateParts = dateStr.split("-");
  if (dateParts.length !== 3) return [];
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  const dateFormatted = `${year}${month}${day}`;
  
  // Analizar fecha local para determinar día de la semana (0 = Domingo, 1 = Lunes, etc.)
  const d = new Date(dateStr + "T00:00:00");
  const dayOfWeek = d.getDay();
  
  if (dayOfWeek === 1) {
    // Lunes es día de descanso en la KBO
    return [];
  }
  
  // Series de 3 juegos de Martes a Jueves (ej. Julio 21-23)
  if (dayOfWeek === 2 || dayOfWeek === 3 || dayOfWeek === 4) {
    return [
      { gameId: `${dateFormatted}HHHT02026`, categoryId: "kbo", homeTeamCode: "HT", homeTeamName: "KIA", awayTeamCode: "HH", awayTeamName: "Hanwha", statusInfo: "18:30" },
      { gameId: `${dateFormatted}NCLG02026`, categoryId: "kbo", homeTeamCode: "LG", homeTeamName: "LG", awayTeamCode: "NC", awayTeamName: "NC", statusInfo: "18:30" },
      { gameId: `${dateFormatted}OBKT02026`, categoryId: "kbo", homeTeamCode: "KT", homeTeamName: "KT", awayTeamCode: "OB", awayTeamName: "Doosan", statusInfo: "18:30" },
      { gameId: `${dateFormatted}SKLT02026`, categoryId: "kbo", homeTeamCode: "LT", homeTeamName: "Lotte", awayTeamCode: "SK", awayTeamName: "SSG", statusInfo: "18:30" },
      { gameId: `${dateFormatted}SSWO02026`, categoryId: "kbo", homeTeamCode: "WO", homeTeamName: "Kiwoom", awayTeamCode: "SS", awayTeamName: "Samsung", statusInfo: "18:30" }
    ];
  }
  
  // Series de 3 juegos de Viernes a Domingo (ej. Julio 24-26)
  if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
    const time = dayOfWeek === 5 ? "18:30" : "18:00"; // Los domingos y sábados se juegan más temprano
    return [
      { gameId: `${dateFormatted}KTLT02026`, categoryId: "kbo", homeTeamCode: "LT", homeTeamName: "Lotte", awayTeamCode: "KT", awayTeamName: "KT", statusInfo: time },
      { gameId: `${dateFormatted}LGHH02026`, categoryId: "kbo", homeTeamCode: "HH", homeTeamName: "Hanwha", awayTeamCode: "LG", awayTeamName: "LG", statusInfo: time },
      { gameId: `${dateFormatted}NCSK02026`, categoryId: "kbo", homeTeamCode: "SK", homeTeamName: "SSG", awayTeamCode: "NC", awayTeamName: "NC", statusInfo: time },
      { gameId: `${dateFormatted}SSOB02026`, categoryId: "kbo", homeTeamCode: "OB", homeTeamName: "Doosan", awayTeamCode: "SS", awayTeamName: "Samsung", statusInfo: time },
      { gameId: `${dateFormatted}WOHT02026`, categoryId: "kbo", homeTeamCode: "HT", homeTeamName: "KIA", awayTeamCode: "WO", awayTeamName: "Kiwoom", statusInfo: time }
    ];
  }
  
  return [];
}

/**
 * Descarga y renderiza los partidos programados para una fecha específica
 */
async function loadDailyGames(dateStr) {
  const gamesGrid = document.getElementById("games-carousel");
  if (!gamesGrid) return;
  
  if (activeLeague === "KBO") {
    gamesGrid.innerHTML = `<div class="status-msg text-muted">Buscando partidos de la KBO...</div>`;
    try {
      let rawGames = [];
      const todayStr = getTodayDateString();
      
      // Si la fecha seleccionada es hoy, intentar conectarse con el API en tiempo real
      if (dateStr === todayStr) {
        try {
          const url = `https://api-gw.sports.naver.com/schedule/games?upperCategoryId=kbaseball&date=${dateStr}`;
          const rawData = await fetchWithProxy(url, "json");
          if (rawData && rawData.result && rawData.result.games) {
            rawGames = rawData.result.games.filter(g => g.categoryId === "kbo");
          }
        } catch (e) {
          console.warn("No se pudo obtener el calendario de la KBO en vivo, usando respaldo local:", e);
        }
      }
      
      // Si el API falló, no devolvió juegos, o la fecha es diferente a hoy, usar el calendario semanal pre-cargado
      if (rawGames.length === 0) {
        rawGames = getKBOLocalSchedule(dateStr);
      }
      
      const gamesList = [];
      const teamCodeMap = {
        "HT": "KIA",
        "SS": "SAM",
        "LG": "LGT",
        "OB": "DOO",
        "KT": "KTW",
        "SK": "SSG",
        "LT": "LOT",
        "HH": "HAN",
        "NC": "NCD",
        "WO": "KIW"
      };
      
      rawGames.forEach(g => {
        if (g.categoryId !== "kbo") return;
        
        const homeKey = teamCodeMap[g.homeTeamCode];
        const awayKey = teamCodeMap[g.awayTeamCode];
        if (!homeKey || !awayKey) return;
        
        let status = "18:30 (KST)";
        if (g.statusInfo) {
          status = g.statusInfo;
        }
        if (g.cancel) {
          status = "Postp.";
        }
        
        const gameTimeStr = g.gameDateTime ? `${g.gameDateTime}+09:00` : `${dateStr}T18:30:00+09:00`;
        
        gamesList.push({
          gamePk: g.gameId,
          gameDate: gameTimeStr,
          status: status,
          statusCode: g.cancel ? "P" : (g.statusCode === "RESULT" ? "F" : (g.statusCode === "STARTED" ? "I" : "S")),
          awayId: awayKey,
          homeId: homeKey,
          awayName: leagueData.teams[awayKey] ? leagueData.teams[awayKey].nombre : g.awayTeamName,
          homeName: leagueData.teams[homeKey] ? leagueData.teams[homeKey].nombre : g.homeTeamName,
          awayScore: (g.statusCode && g.statusCode !== "BEFORE") ? g.awayTeamScore : "",
          homeScore: (g.statusCode && g.statusCode !== "BEFORE") ? g.homeTeamScore : "",
          homeStarterId: "",
          awayStarterId: "",
          homeStarterName: "Por anunciar",
          awayStarterName: "Por anunciar"
        });
      });
      
      leagueData.games = gamesList;
      renderGamesCarousel();
      
      if (gamesList.length === 0) {
        gamesGrid.innerHTML = `<div class="status-msg text-muted" style="width: 100%; text-align: center; padding: 1rem 0;">No hay partidos programados para la KBO hoy (${dateStr}).</div>`;
      } else {
        selectGame(0);
      }
      return;
      
    } catch (e) {
      console.error("Error crítico al procesar juegos de la KBO:", e);
      gamesGrid.innerHTML = `<div class="status-msg text-danger" style="width: 100%; text-align: center; padding: 1rem 0;">Error de sincronización con la KBO.</div>`;
      return;
    }
  }
  
  gamesGrid.innerHTML = `<div class="status-msg text-muted">Buscando partidos...</div>`;

  try {
    const config = LEAGUE_CONFIGS[activeLeague];
    const scheduleRes = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=${config.sportId}&date=${dateStr}&hydrate=probablePitcher`);
    if (!scheduleRes.ok) throw new Error();
    const scheduleData = await scheduleRes.json();
    
    const gamesList = [];
    if (scheduleData.dates && scheduleData.dates[0] && scheduleData.dates[0].games) {
      scheduleData.dates[0].games.forEach(g => {
        const awayTeam = g.teams.away;
        const homeTeam = g.teams.home;
        const status = g.status || {};
        const awayProbable = awayTeam.probablePitcher || {};
        const homeProbable = homeTeam.probablePitcher || {};
        
        // Obtener nombres cortos si existen en el mapa global, sino usar el del equipo
        const homeShort = TEAM_MAP[homeTeam.team.id] ? TEAM_MAP[homeTeam.team.id].short : homeTeam.team.name;
        const awayShort = TEAM_MAP[awayTeam.team.id] ? TEAM_MAP[awayTeam.team.id].short : awayTeam.team.name;

        gamesList.push({
          gamePk: g.gamePk,
          gameDate: g.gameDate,
          status: status.detailedState || "Programado",
          statusCode: status.statusCode,
          awayId: awayTeam.team.id,
          awayName: awayShort,
          awayScore: awayTeam.score !== undefined ? awayTeam.score : "-",
          awayRecord: awayTeam.leagueRecord ? `${awayTeam.leagueRecord.wins}-${awayTeam.leagueRecord.losses}` : "",
          awayStarterName: awayProbable.fullName || "Por anunciar",
          awayStarterId: awayProbable.id || null,
          
          homeId: homeTeam.team.id,
          homeName: homeShort,
          homeScore: homeTeam.score !== undefined ? homeTeam.score : "-",
          homeRecord: homeTeam.leagueRecord ? `${homeTeam.leagueRecord.wins}-${homeTeam.leagueRecord.losses}` : "",
          homeStarterName: homeProbable.fullName || "Por anunciar",
          homeStarterId: homeProbable.id || null
        });
      });
    }

    leagueData.games = gamesList;
    renderGamesCarousel();
  } catch (error) {
    console.error("Fallo al cargar el calendario diario:", error);
    gamesGrid.innerHTML = `<div class="status-msg text-error">No se pudieron cargar partidos para esta fecha.</div>`;
  }
}

/**
 * Renderiza el carrusel superior de juegos
 */
function renderGamesCarousel() {
  const container = document.getElementById("games-carousel");
  if (!container) return;

  const config = LEAGUE_CONFIGS[activeLeague];
  if (leagueData.games.length === 0) {
    container.innerHTML = `<div class="status-msg text-muted">No hay partidos programados para esta fecha en ${config.label}.</div>`;
    return;
  }

  container.innerHTML = "";
  leagueData.games.forEach((game, idx) => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.setAttribute("onclick", `selectGame(${idx})`);
    
    // Badge de estado
    let badgeClass = "game-status-badge";
    if (game.statusCode === "F" || game.statusCode === "O") badgeClass += " status-final";
    else if (game.statusCode === "I") badgeClass += " status-live";
    else badgeClass += " status-scheduled";

    // Formatear hora de Tijuana
    let timeStr = "";
    if (game.gameDate) {
      try {
        const dateObj = new Date(game.gameDate);
        timeStr = dateObj.toLocaleTimeString('es-MX', {
          timeZone: 'America/Tijuana',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      } catch (e) {
        console.error("Error al formatear fecha de Tijuana", e);
      }
    }

    card.innerHTML = `
      <div class="game-card-header" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <span class="${badgeClass}">${game.status}</span>
        ${timeStr ? `<span class="game-time-lbl" style="font-size: 0.65rem; color: var(--text-muted); font-family: var(--font-mono); font-weight: 700;">${timeStr} (TIJ)</span>` : ""}
      </div>
      <div class="game-card-teams">
        <div class="game-card-team">
          <span class="team-name-lbl">${game.awayName}</span>
          <span class="team-score-lbl">${game.awayScore}</span>
        </div>
        <div class="game-card-team">
          <span class="team-name-lbl">${game.homeName}</span>
          <span class="team-score-lbl">${game.homeScore}</span>
        </div>
      </div>
      <div class="game-card-pitchers">
        <div class="pitcher-lbl"><span>VIS:</span> ${game.awayStarterName}</div>
        <div class="pitcher-lbl"><span>LOC:</span> ${game.homeStarterName}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

/**
 * Limpia la etiqueta temporal "(Buscando abridor en vivo...)" de los abridores activos
 */
function cleanupSeekingLabel(homeId, awayId) {
  const currentA = document.getElementById("select-team-a").value;
  const currentB = document.getElementById("select-team-b").value;
  if (currentA === homeId && currentB === awayId) {
    const teamHome = loadedTeams[homeId];
    const teamAway = loadedTeams[awayId];
    let changed = false;
    if (teamHome && teamHome.abridor && teamHome.abridor.nombre.includes(" (Buscando")) {
      teamHome.abridor.nombre = teamHome.abridor.nombre.split(" (Buscando")[0];
      changed = true;
    }
    if (teamAway && teamAway.abridor && teamAway.abridor.nombre.includes(" (Buscando")) {
      teamAway.abridor.nombre = teamAway.abridor.nombre.split(" (Buscando")[0];
      changed = true;
    }
    if (changed) {
      populatePitcherSelectors(homeId, awayId);
      recalculateAnalysis();
    }
  }
}

/**
 * Descarga en segundo plano los abridores de la KBO para no bloquear la interfaz de usuario
 */
async function loadKBOPitchersLive(game, homeId, awayId) {
  try {
    const previewUrl = `https://api-gw.sports.naver.com/schedule/games/${game.gamePk}/preview`;
    // Usar el timeout por defecto (4000ms por proxy) para garantizar la descarga exitosa
    const rawContent = await fetchWithProxy(previewUrl, "json");
    
    if (rawContent && rawContent.result && rawContent.result.previewData) {
      const data = rawContent.result.previewData;
      
      const translateName = (koName) => {
        if (!koName) return "Por anunciar";
        for (let [ko, en] of Object.entries(KBO_NAME_TRANSLATIONS)) {
          if (koName.includes(ko)) return en;
        }
        return koName;
      };
      
      let updated = false;
      if (data.homeStarter) {
        const hs = data.homeStarter;
        const hsName = translateName(hs.playerInfo ? hs.playerInfo.name : "");
        const hsStats = hs.currentSeasonStats || {};
        game.homeStarterName = hsName;
        game.homeStarterEra = parseFloat(hsStats.era) || 4.50;
        game.homeStarterWhip = parseFloat(hsStats.whip) || 1.35;
        game.homeStarterHr = parseInt(hsStats.hr) || 0;
        game.homeStarterBb = parseInt(hsStats.bb) || 0;
        game.homeStarterSo = parseInt(hsStats.kk) || 0;
        game.homeStarterIp = hsStats.inn || "0.0";
        game.homeStarterWl = `${hsStats.w || 0}-${hsStats.l || 0}`;
        updated = true;
      }
      
      if (data.awayStarter) {
        const as = data.awayStarter;
        const asName = translateName(as.playerInfo ? as.playerInfo.name : "");
        const asStats = as.currentSeasonStats || {};
        game.awayStarterName = asName;
        game.awayStarterEra = parseFloat(asStats.era) || 4.50;
        game.awayStarterWhip = parseFloat(asStats.whip) || 1.35;
        game.awayStarterHr = parseInt(asStats.hr) || 0;
        game.awayStarterBb = parseInt(asStats.bb) || 0;
        game.awayStarterSo = parseInt(asStats.kk) || 0;
        game.awayStarterIp = asStats.inn || "0.0";
        game.awayStarterWl = `${asStats.w || 0}-${asStats.l || 0}`;
        updated = true;
      }

      // Cargar también estadísticas colectivas de los equipos en tiempo real
      if (data.homeStandings) {
        game.homeTeamEra = parseFloat(data.homeStandings.era) || 4.50;
        game.homeTeamAvg = parseFloat(data.homeStandings.hra) || 0.270;
        game.homeTeamHr = parseInt(data.homeStandings.hr) || 100;
        game.homeTeamWins = parseInt(data.homeStandings.w) || 40;
        game.homeTeamLosses = parseInt(data.homeStandings.l) || 40;
        updated = true;
      }
      if (data.awayStandings) {
        game.awayTeamEra = parseFloat(data.awayStandings.era) || 4.50;
        game.awayTeamAvg = parseFloat(data.awayStandings.hra) || 0.270;
        game.awayTeamHr = parseInt(data.awayStandings.hr) || 100;
        game.awayTeamWins = parseInt(data.awayStandings.w) || 40;
        game.awayTeamLosses = parseInt(data.awayStandings.l) || 40;
        updated = true;
      }
      
      if (updated) {
        game.pitchersLoaded = true;
        
        // Verificar si este juego sigue seleccionado activamente en el DOM
        const currentA = document.getElementById("select-team-a").value;
        const currentB = document.getElementById("select-team-b").value;
        
        if (currentA === homeId && currentB === awayId) {
          console.log(`[KBO] Abridores y estadísticas de equipo cargados asíncronamente para ${homeId} vs ${awayId}`);
          
          const teamHome = loadedTeams[homeId];
          const teamAway = loadedTeams[awayId];
          
          if (teamHome) {
            // Actualizar estadísticas colectivas en tiempo real
            if (game.homeTeamEra) {
              teamHome.pitcheo.era = game.homeTeamEra;
              teamHome.bateo.avg = game.homeTeamAvg;
              teamHome.bateo.hr = game.homeTeamHr;
              const baseAvg = 0.275;
              const ratio = game.homeTeamAvg / baseAvg;
              teamHome.bateo.ops = Math.min(0.999, Math.max(0.500, (teamHome.bateo.ops || 0.770) * ratio));
            }

            const existingPitcher = Object.values(leagueData.pitchers).find(p => 
              p.teamId && p.teamId.toString() === homeId.toString() &&
              p.nombre.toLowerCase().includes(game.homeStarterName.toLowerCase())
            );
            if (existingPitcher) {
              teamHome.abridor = { ...existingPitcher };
            } else {
              const pId = `p_kbo_dyn_home_${homeId}`;
              teamHome.abridor = {
                id: pId,
                nombre: game.homeStarterName,
                era: game.homeStarterEra,
                whip: game.homeStarterWhip,
                hr: game.homeStarterHr,
                bb: game.homeStarterBb,
                so: game.homeStarterSo,
                ip: game.homeStarterIp,
                fip: window.predictor.calculateFIP(game.homeStarterHr, game.homeStarterBb, game.homeStarterSo, game.homeStarterIp),
                wl: game.homeStarterWl
              };
              leagueData.pitchers[pId] = { ...teamHome.abridor, teamId: homeId };
            }
          }
          
          if (teamAway) {
            // Actualizar estadísticas colectivas en tiempo real
            if (game.awayTeamEra) {
              teamAway.pitcheo.era = game.awayTeamEra;
              teamAway.bateo.avg = game.awayTeamAvg;
              teamAway.bateo.hr = game.awayTeamHr;
              const baseAvg = 0.275;
              const ratio = game.awayTeamAvg / baseAvg;
              teamAway.bateo.ops = Math.min(0.999, Math.max(0.500, (teamAway.bateo.ops || 0.770) * ratio));
            }

            const existingPitcher = Object.values(leagueData.pitchers).find(p => 
              p.teamId && p.teamId.toString() === awayId.toString() &&
              p.nombre.toLowerCase().includes(game.awayStarterName.toLowerCase())
            );
            if (existingPitcher) {
              teamAway.abridor = { ...existingPitcher };
            } else {
              const pId = `p_kbo_dyn_away_${awayId}`;
              teamAway.abridor = {
                id: pId,
                nombre: game.awayStarterName,
                era: game.awayStarterEra,
                whip: game.awayStarterWhip,
                hr: game.awayStarterHr,
                bb: game.awayStarterBb,
                so: game.awayStarterSo,
                ip: game.awayStarterIp,
                fip: window.predictor.calculateFIP(game.awayStarterHr, game.awayStarterBb, game.awayStarterSo, game.awayStarterIp),
                wl: game.awayStarterWl
              };
              leagueData.pitchers[pId] = { ...teamAway.abridor, teamId: awayId };
            }
          }
          
          populatePitcherSelectors(homeId, awayId);
          recalculateAnalysis();
        }
      } else {
        cleanupSeekingLabel(homeId, awayId);
      }
    } else {
      cleanupSeekingLabel(homeId, awayId);
    }
  } catch (e) {
    console.warn("No se pudieron resolver los abridores KBO en vivo:", e);
    cleanupSeekingLabel(homeId, awayId);
  }
}

/**
 * Selecciona un juego del carrusel y lo carga automáticamente en los paneles de análisis
 */
async function selectGame(index) {
  const game = leagueData.games[index];
  if (!game) return;

  // Actualizar dropdowns
  const selectA = document.getElementById("select-team-a");
  const selectB = document.getElementById("select-team-b");
  
  if (selectA && selectB) {
    selectA.value = game.homeId;
    selectB.value = game.awayId;
  }

  teamAKey = game.homeId.toString();
  teamBKey = game.awayId.toString();

  // Clonar la estructura base de datos de los equipos seleccionados
  const teamHome = JSON.parse(JSON.stringify(leagueData.teams[game.homeId]));
  const teamAway = JSON.parse(JSON.stringify(leagueData.teams[game.awayId]));

  // Ligar datos reales de abridores si existen en el mapa global o fueron descargados en el juego
  if (game.homeStarterId && leagueData.pitchers[game.homeStarterId]) {
    teamHome.abridor = { ...leagueData.pitchers[game.homeStarterId] };
  } else if (game.pitchersLoaded && game.homeStarterName) {
    // Si ya fueron descargados, actualizar también las estadísticas colectivas del equipo
    if (game.homeTeamEra) {
      teamHome.pitcheo.era = game.homeTeamEra;
      teamHome.bateo.avg = game.homeTeamAvg;
      teamHome.bateo.hr = game.homeTeamHr;
      const baseAvg = 0.275;
      const ratio = game.homeTeamAvg / baseAvg;
      teamHome.bateo.ops = Math.min(0.999, Math.max(0.500, (teamHome.bateo.ops || 0.770) * ratio));
    }

    const existingPitcher = Object.values(leagueData.pitchers).find(p => 
      p.teamId && p.teamId.toString() === game.homeId.toString() &&
      p.nombre.toLowerCase().includes(game.homeStarterName.toLowerCase())
    );
    if (existingPitcher) {
      teamHome.abridor = { ...existingPitcher };
    } else {
      const pId = `p_kbo_dyn_home_${game.homeId}`;
      teamHome.abridor = {
        id: pId,
        nombre: game.homeStarterName,
        era: game.homeStarterEra,
        whip: game.homeStarterWhip,
        hr: game.homeStarterHr,
        bb: game.homeStarterBb,
        so: game.homeStarterSo,
        ip: game.homeStarterIp,
        fip: window.predictor.calculateFIP(game.homeStarterHr, game.homeStarterBb, game.homeStarterSo, game.homeStarterIp),
        wl: game.homeStarterWl
      };
      leagueData.pitchers[pId] = { ...teamHome.abridor, teamId: game.homeId };
    }
  } else {
    // Si es KBO y no hay abridor en vivo, buscar el abridor número 1 de nuestra base de datos de rotación
    const pitchersA = Object.values(leagueData.pitchers).filter(p => p.teamId && p.teamId.toString() === game.homeId.toString());
    if (activeLeague === "KBO" && pitchersA.length > 0) {
      pitchersA.sort((x, y) => y.ip - x.ip);
      teamHome.abridor = { ...pitchersA[0] };
      if (game.gamePk && !game.pitchersLoaded) {
        teamHome.abridor.nombre = `${pitchersA[0].nombre} (Buscando abridor en vivo...)`;
      }
    } else {
      teamHome.abridor = {
        nombre: game.homeStarterName || "Por anunciar",
        era: 4.50, whip: 1.35, hr: 0, bb: 0, so: 0, ip: 0.0, fip: 4.50, wl: "0-0"
      };
    }
  }

  if (game.awayStarterId && leagueData.pitchers[game.awayStarterId]) {
    teamAway.abridor = { ...leagueData.pitchers[game.awayStarterId] };
  } else if (game.pitchersLoaded && game.awayStarterName) {
    // Si ya fueron descargados, actualizar también las estadísticas colectivas del equipo
    if (game.awayTeamEra) {
      teamAway.pitcheo.era = game.awayTeamEra;
      teamAway.bateo.avg = game.awayTeamAvg;
      teamAway.bateo.hr = game.awayTeamHr;
      const baseAvg = 0.275;
      const ratio = game.awayTeamAvg / baseAvg;
      teamAway.bateo.ops = Math.min(0.999, Math.max(0.500, (teamAway.bateo.ops || 0.770) * ratio));
    }

    const existingPitcher = Object.values(leagueData.pitchers).find(p => 
      p.teamId && p.teamId.toString() === game.awayId.toString() &&
      p.nombre.toLowerCase().includes(game.awayStarterName.toLowerCase())
    );
    if (existingPitcher) {
      teamAway.abridor = { ...existingPitcher };
    } else {
      const pId = `p_kbo_dyn_away_${game.awayId}`;
      teamAway.abridor = {
        id: pId,
        nombre: game.awayStarterName,
        era: game.awayStarterEra,
        whip: game.awayStarterWhip,
        hr: game.awayStarterHr,
        bb: game.awayStarterBb,
        so: game.awayStarterSo,
        ip: game.awayStarterIp,
        fip: window.predictor.calculateFIP(game.awayStarterHr, game.awayStarterBb, game.awayStarterSo, game.awayStarterIp),
        wl: game.awayStarterWl
      };
      leagueData.pitchers[pId] = { ...teamAway.abridor, teamId: game.awayId };
    }
  } else {
    // Si es KBO y no hay abridor en vivo, buscar el abridor número 1 de nuestra base de datos de rotación
    const pitchersB = Object.values(leagueData.pitchers).filter(p => p.teamId && p.teamId.toString() === game.awayId.toString());
    if (activeLeague === "KBO" && pitchersB.length > 0) {
      pitchersB.sort((x, y) => y.ip - x.ip);
      teamAway.abridor = { ...pitchersB[0] };
      if (game.gamePk && !game.pitchersLoaded) {
        teamAway.abridor.nombre = `${pitchersB[0].nombre} (Buscando abridor en vivo...)`;
      }
    } else {
      teamAway.abridor = {
        nombre: game.awayStarterName || "Por anunciar",
        era: 4.50, whip: 1.35, hr: 0, bb: 0, so: 0, ip: 0.0, fip: 4.50, wl: "0-0"
      };
    }
  }

  // Sobrescribir en la base de datos de memoria
  loadedTeams[teamAKey] = teamHome;
  loadedTeams[teamBKey] = teamAway;

  // Actualizar estilos activos de las tarjetas
  const cards = document.querySelectorAll(".game-card");
  cards.forEach((card, idx) => {
    if (idx === index) card.classList.add("active");
    else card.classList.remove("active");
  });

  // Llenar selectores de lanzadores y abridores
  populatePitcherSelectors(teamAKey, teamBKey);

  // Iniciar estado de carga para fatiga del bullpen
  activeBullpenFatigue = {
    homeScore: "...",
    awayScore: "...",
    homeStatus: "Calculando...",
    awayStatus: "Calculando...",
    homeYesterday: "Calculando...",
    awayYesterday: "Calculando..."
  };

  // Ejecutar el motor predictivo inicial (Instantáneo!)
  recalculateAnalysis();

  // Disparar el análisis en segundo plano
  analyzeBullpenFatigue(teamAKey, teamBKey);

  // Si es la KBO, intentar descargar los abridores probables en tiempo real EN SEGUNDO PLANO (sin congelar la app!)
  if (activeLeague === "KBO" && game.gamePk && !game.pitchersLoaded) {
    loadKBOPitchersLive(game, teamAKey, teamBKey); // Llamada sin await
  }
}

/**
 * Rellena los selectores de equipos
 */
function populateTeamSelectors() {
  const selectA = document.getElementById("select-team-a");
  const selectB = document.getElementById("select-team-b");
  
  if (!selectA || !selectB) return;

  selectA.innerHTML = "";
  selectB.innerHTML = "";

  Object.keys(loadedTeams).forEach(key => {
    const optA = document.createElement("option");
    optA.value = key;
    optA.textContent = loadedTeams[key].nombre;
    selectA.appendChild(optA);

    const optB = document.createElement("option");
    optB.value = key;
    optB.textContent = loadedTeams[key].nombre;
    selectB.appendChild(optB);
  });

  // Intentar seleccionar valores por defecto
  if (loadedTeams[teamAKey]) selectA.value = teamAKey;
  else {
    selectA.value = Object.keys(loadedTeams)[0];
    teamAKey = selectA.value;
  }

  if (loadedTeams[teamBKey]) selectB.value = teamBKey;
  else {
    selectB.value = Object.keys(loadedTeams)[1] || Object.keys(loadedTeams)[0];
    teamBKey = selectB.value;
  }

  // Cargar lanzadores del equipo por defecto
  populatePitcherSelectors(selectA.value, selectB.value);
}

/**
 * Rellena los selectores de lanzadores abridores según el equipo seleccionado
 */
function populatePitcherSelectors(teamAId, teamBId) {
  const selectPitcherA = document.getElementById("select-pitcher-a");
  const selectPitcherB = document.getElementById("select-pitcher-b");

  if (!selectPitcherA || !selectPitcherB) return;

  selectPitcherA.innerHTML = "";
  selectPitcherB.innerHTML = "";

  // Filtrar pitchers del Equipo Local
  const pitchersA = Object.values(leagueData.pitchers).filter(p => p.teamId && p.teamId.toString() === teamAId.toString());
  if (pitchersA.length === 0) {
    const opt = document.createElement("option");
    opt.value = "default";
    opt.textContent = (loadedTeams[teamAId] && loadedTeams[teamAId].abridor) ? loadedTeams[teamAId].abridor.nombre : "Por anunciar";
    selectPitcherA.appendChild(opt);
  } else {
    // Ordenar por entradas lanzadas para que los abridores principales salgan al inicio
    pitchersA.sort((x, y) => y.ip - x.ip);
    pitchersA.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = `${p.nombre} (ERA ${p.era.toFixed(2)})`;
      selectPitcherA.appendChild(opt);
    });
  }

  // Filtrar pitchers del Equipo Visitante
  const pitchersB = Object.values(leagueData.pitchers).filter(p => p.teamId && p.teamId.toString() === teamBId.toString());
  if (pitchersB.length === 0) {
    const opt = document.createElement("option");
    opt.value = "default";
    opt.textContent = (loadedTeams[teamBId] && loadedTeams[teamBId].abridor) ? loadedTeams[teamBId].abridor.nombre : "Por anunciar";
    selectPitcherB.appendChild(opt);
  } else {
    pitchersB.sort((x, y) => y.ip - x.ip);
    pitchersB.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = `${p.nombre} (ERA ${p.era.toFixed(2)})`;
      selectPitcherB.appendChild(opt);
    });
  }

  // Sincronizar selección con el abridor actualmente activo en loadedTeams
  if (loadedTeams[teamAId] && loadedTeams[teamAId].abridor) {
    const currentA = loadedTeams[teamAId].abridor.id;
    if (currentA && selectPitcherA.querySelector(`option[value="${currentA}"]`)) {
      selectPitcherA.value = currentA;
    } else {
      selectPitcherA.value = selectPitcherA.options[0].value;
    }
  }

  if (loadedTeams[teamBId] && loadedTeams[teamBId].abridor) {
    const currentB = loadedTeams[teamBId].abridor.id;
    if (currentB && selectPitcherB.querySelector(`option[value="${currentB}"]`)) {
      selectPitcherB.value = currentB;
    } else {
      selectPitcherB.value = selectPitcherB.options[0].value;
    }
  }
}

/**
 * Se ejecuta al seleccionar un lanzador diferente en los dropdowns
 */
function changeActivePitchers() {
  const valA = document.getElementById("select-pitcher-a").value;
  const valB = document.getElementById("select-pitcher-b").value;

  if (valA !== "default" && leagueData.pitchers[valA]) {
    loadedTeams[teamAKey].abridor = { ...leagueData.pitchers[valA] };
  }
  
  if (valB !== "default" && leagueData.pitchers[valB]) {
    loadedTeams[teamBKey].abridor = { ...leagueData.pitchers[valB] };
  }

  recalculateAnalysis();
}

/**
 * Callback de dropdowns
 */
function changeActiveTeams() {
  teamAKey = document.getElementById("select-team-a").value;
  teamBKey = document.getElementById("select-team-b").value;

  if (teamAKey === teamBKey) {
    alert("Por favor selecciona dos equipos diferentes.");
    return;
  }

  // Iniciar estado de carga para fatiga del bullpen
  activeBullpenFatigue = {
    homeScore: "...",
    awayScore: "...",
    homeStatus: "Calculando...",
    awayStatus: "Calculando...",
    homeYesterday: "Calculando...",
    awayYesterday: "Calculando..."
  };

  // Quitar el estilo activo de los juegos del carrusel ya que cambiamos manualmente
  document.querySelectorAll(".game-card").forEach(card => card.classList.remove("active"));

  // Sincronizar cargado del equipo limpio (sin abridor previo pegado a otra tarjeta)
  if (leagueData.teams[teamAKey]) {
    loadedTeams[teamAKey] = JSON.parse(JSON.stringify(leagueData.teams[teamAKey]));
  }
  if (leagueData.teams[teamBKey]) {
    loadedTeams[teamBKey] = JSON.parse(JSON.stringify(leagueData.teams[teamBKey]));
  }

  // Llenar selectores de lanzadores
  populatePitcherSelectors(teamAKey, teamBKey);

  // Forzar actualización del abridor activo
  changeActivePitchers();

  // Disparar el análisis en segundo plano
  analyzeBullpenFatigue(teamAKey, teamBKey);
}

let activeBvpTab = 'vis'; // 'vis' (visitante vs abridor local) o 'loc' (local vs abridor visitante)

/**
 * Cambia las pestañas de Bateo vs Abridor Proyectado
 */
function switchBvpTab(tabName) {
  activeBvpTab = tabName;
  
  const btnVis = document.getElementById("btn-bvp-vis");
  const btnLoc = document.getElementById("btn-bvp-loc");
  if (btnVis) btnVis.classList.toggle("active", tabName === 'vis');
  if (btnLoc) btnLoc.classList.toggle("active", tabName === 'loc');
  
  renderBvpSection();
}

/**
 * Renderiza dinámicamente el análisis proyectado de Ofensiva vs Abridor
 */
function renderBvpSection() {
  const teamA = loadedTeams[teamAKey]; // Local
  const teamB = loadedTeams[teamBKey]; // Visitante

  if (!teamA || !teamB) return;

  const contentArea = document.getElementById("bvp-content-area");
  if (!contentArea) return;

  // Determinar ofensiva y abridor según pestaña activa
  let offensiveTeam, pitchingTeam, abridor;
  if (activeBvpTab === 'vis') {
    offensiveTeam = teamB; // Visitante (ofensiva)
    pitchingTeam = teamA;  // Local (pitcheo)
    abridor = teamA.abridor;
  } else {
    offensiveTeam = teamA; // Local (ofensiva)
    pitchingTeam = teamB;  // Visitante (pitcheo)
    abridor = teamB.abridor;
  }

  if (!abridor) {
    contentArea.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.85rem;">No hay abridor anunciado para este equipo.</div>`;
    return;
  }

  // FIP del abridor
  const fip = abridor.fip || window.predictor.calculateFIP(abridor.hr, abridor.bb, abridor.so, abridor.ip);

  // Constantes de liga para normalización
  const LEAGUE_AVG = 0.275;
  const LEAGUE_OBP = 0.345;
  const LEAGUE_SLG = 0.420;
  const LEAGUE_OPS = 0.765;
  const LEAGUE_ERA_ABR = 4.30;
  const LEAGUE_WHIP_ABR = 1.32;
  const LEAGUE_HR_ABR = 7;
  const LEAGUE_IP_ABR = 60.0;

  // 1. Oponente BAA (Batting Average Against) estimado para el abridor
  const whipFactor = (abridor.whip || LEAGUE_WHIP_ABR) / LEAGUE_WHIP_ABR;
  const eraFactor = (abridor.era || LEAGUE_ERA_ABR) / LEAGUE_ERA_ABR;
  
  // BAA del pitcher estimada a partir de su WHIP y ERA
  let pitcherBaa = LEAGUE_AVG * (whipFactor * 0.8 + eraFactor * 0.2);
  pitcherBaa = Math.min(0.330, Math.max(0.180, pitcherBaa));

  // expectedAVG = AVG ofensiva * (pitcherBaa / AVG liga)
  let expectedAvg = (offensiveTeam.bateo.avg || LEAGUE_AVG) * (pitcherBaa / LEAGUE_AVG);
  expectedAvg = Math.min(0.360, Math.max(0.160, expectedAvg));

  // 2. OBP del pitcher estimada
  let pitcherObp = LEAGUE_OBP * whipFactor;
  pitcherObp = Math.min(0.410, Math.max(0.240, pitcherObp));
  let expectedObp = (offensiveTeam.bateo.obp || LEAGUE_OBP) * (pitcherObp / LEAGUE_OBP);
  expectedObp = Math.min(0.420, Math.max(0.220, expectedObp));

  // 3. SLG del pitcher estimada a partir de su FIP y HR permitidos
  const hrRate = (abridor.hr || 0) / (parseFloat(abridor.ip) || 10);
  const leagueHrRate = LEAGUE_HR_ABR / LEAGUE_IP_ABR;
  const hrFactor = leagueHrRate > 0 ? (hrRate / leagueHrRate) : 1.0;
  
  let pitcherSlg = LEAGUE_SLG * (eraFactor * 0.6 + hrFactor * 0.4);
  pitcherSlg = Math.min(0.530, Math.max(0.280, pitcherSlg));
  let expectedSlg = (offensiveTeam.bateo.slg || LEAGUE_SLG) * (pitcherSlg / LEAGUE_SLG);
  expectedSlg = Math.min(0.580, Math.max(0.240, expectedSlg));

  // 4. Expected OPS
  const expectedOps = expectedObp + expectedSlg;

  // 5. Strikeout Rate (K%)
  const soRateFactor = (abridor.so || 40) / ((parseFloat(abridor.ip) || 40) * 0.8 || 1);
  const leagueSoRate = 50 / 60.0;
  let expectedKRate = 18.5 * (soRateFactor / leagueSoRate);
  expectedKRate = Math.min(38.0, Math.max(8.0, expectedKRate));

  // Semáforo de ventaja
  let advantageLabel = "";
  let advantageClass = "";
  
  if (expectedOps >= 0.815) {
    advantageLabel = "Gran Ventaja del Bateo";
    advantageClass = "badge-error"; // Color rojo neón (peligro para pitcher)
  } else if (expectedOps >= 0.770) {
    advantageLabel = "Ventaja Ligera del Bateo";
    advantageClass = "badge-warning";
  } else if (expectedOps >= 0.730) {
    advantageLabel = "Encuentro Equilibrado";
    advantageClass = "badge-lmb";
  } else if (expectedOps >= 0.680) {
    advantageLabel = "Ventaja Ligera del Abridor";
    advantageClass = "badge-info";
  } else {
    advantageLabel = "Dominio del Abridor";
    advantageClass = "badge-live"; // Color verde neón (excelente para pitcher)
  }

  // Renderizar la interfaz con diseño premium y barras de progreso
  contentArea.innerHTML = `
    <!-- Cabecera de Enfrentamiento -->
    <div class="bvp-header mb-3" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 0.8rem; border-radius: 8px;">
      <div style="font-size: 0.65rem; text-transform: uppercase; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.2rem; font-family: var(--font-mono);">Duelo Proyectado</div>
      <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); line-height: 1.2;">
        <span style="color: var(--info-neon);">${offensiveTeam.nombre}</span> vs 
        <span style="color: var(--primary-neon);">${abridor.nombre}</span>
      </div>
      <div style="margin-top: 0.6rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
        <span class="badge ${advantageClass}" style="font-size: 0.65rem; padding: 2px 6px;">${advantageLabel}</span>
        <span style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--text-secondary);">FIP: ${fip.toFixed(2)} | WHIP: ${abridor.whip.toFixed(2)}</span>
      </div>
    </div>

    <!-- Indicador de OPS y Probabilidades -->
    <div class="bvp-metrics-list" style="display: flex; flex-direction: column; gap: 0.8rem;">
      
      <!-- OPS -->
      <div class="metric-row">
        <div class="metric-info" style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
          <span style="font-weight: 600; color: var(--text-secondary);">OPS Proyectado</span>
          <span style="font-weight: 700; font-family: var(--font-mono); color: ${expectedOps >= 0.770 ? 'var(--error-neon)' : 'var(--primary-neon)'}">.${Math.round(expectedOps * 1000)}</span>
        </div>
        <div class="progress-bar-bg" style="background: rgba(255,255,255,0.05); height: 8px; border-radius: 4px; overflow: hidden; position: relative;">
          <div class="progress-bar-fill" style="width: ${Math.min(100, (expectedOps / 1.1) * 100)}%; height: 100%; border-radius: 4px; background: ${expectedOps >= 0.770 ? 'var(--error-neon)' : 'var(--primary-neon)'}; transition: width 0.3s ease;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.6rem; color: var(--text-muted); margin-top: 0.15rem; font-family: var(--font-mono);">
          <span>Malo (.650)</span>
          <span>Promedio (.765)</span>
          <span>Excelente (.850+)</span>
        </div>
      </div>

      <!-- AVG -->
      <div class="metric-row">
        <div class="metric-info" style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
          <span style="font-weight: 600; color: var(--text-secondary);">AVG Proyectado</span>
          <span style="font-weight: 700; font-family: var(--font-mono); color: var(--text-primary);">.${Math.round(expectedAvg * 1000)}</span>
        </div>
        <div class="progress-bar-bg" style="background: rgba(255,255,255,0.05); height: 6px; border-radius: 4px; overflow: hidden;">
          <div class="progress-bar-fill" style="width: ${Math.min(100, (expectedAvg / 0.4) * 100)}%; height: 100%; border-radius: 4px; background: var(--info-neon); transition: width 0.3s ease;"></div>
        </div>
      </div>

      <!-- OBP -->
      <div class="metric-row">
        <div class="metric-info" style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
          <span style="font-weight: 600; color: var(--text-secondary);">OBP Proyectado</span>
          <span style="font-weight: 700; font-family: var(--font-mono); color: var(--text-primary);">.${Math.round(expectedObp * 1000)}</span>
        </div>
        <div class="progress-bar-bg" style="background: rgba(255,255,255,0.05); height: 6px; border-radius: 4px; overflow: hidden;">
          <div class="progress-bar-fill" style="width: ${Math.min(100, (expectedObp / 0.5) * 100)}%; height: 100%; border-radius: 4px; background: var(--info-neon); transition: width 0.3s ease;"></div>
        </div>
      </div>

      <!-- SLG -->
      <div class="metric-row">
        <div class="metric-info" style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
          <span style="font-weight: 600; color: var(--text-secondary);">SLG Proyectado</span>
          <span style="font-weight: 700; font-family: var(--font-mono); color: var(--text-primary);">.${Math.round(expectedSlg * 1000)}</span>
        </div>
        <div class="progress-bar-bg" style="background: rgba(255,255,255,0.05); height: 6px; border-radius: 4px; overflow: hidden;">
          <div class="progress-bar-fill" style="width: ${Math.min(100, (expectedSlg / 0.6) * 100)}%; height: 100%; border-radius: 4px; background: var(--info-neon); transition: width 0.3s ease;"></div>
        </div>
      </div>

      <!-- Strikeout Rate -->
      <div class="metric-row">
        <div class="metric-info" style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
          <span style="font-weight: 600; color: var(--text-secondary);">Tasa de Ponche (K%)</span>
          <span style="font-weight: 700; font-family: var(--font-mono); color: var(--text-primary);">${expectedKRate.toFixed(1)}%</span>
        </div>
        <div class="progress-bar-bg" style="background: rgba(255,255,255,0.05); height: 6px; border-radius: 4px; overflow: hidden;">
          <div class="progress-bar-fill" style="width: ${expectedKRate}%; height: 100%; border-radius: 4px; background: var(--warning-neon); transition: width 0.3s ease;"></div>
        </div>
      </div>

    </div>

    <!-- Comentario de Análisis -->
    <div class="bvp-analysis-card mt-3" style="background: rgba(0, 255, 136, 0.02); border: 1px solid rgba(0, 255, 136, 0.05); padding: 0.75rem; border-radius: 6px; font-size: 0.75rem; line-height: 1.4; color: var(--text-secondary);">
      <div style="font-weight: 700; color: var(--primary-neon); margin-bottom: 0.25rem; text-transform: uppercase; font-size: 0.65rem; font-family: var(--font-mono);">Resumen Sabermétrico</div>
      <span>La ofensiva de <strong>${offensiveTeam.nombre}</strong> (OPS .${Math.round((offensiveTeam.bateo.ops||0.765)*1000)}) se enfrenta a <strong>${abridor.nombre}</strong> (ERA ${abridor.era.toFixed(2)}). 
      Se proyecta un OPS resultante de <strong>.${Math.round(expectedOps*1000)}</strong>, marcando un escenario de <strong>${advantageLabel.toLowerCase()}</strong>.</span>
    </div>
  `;
}

/**
 * Obtiene los pesos ajustados de la UI
 */
function getWeights() {
  return {
    abridor: parseInt(document.getElementById("w-abridor").value) || 0,
    bateo: parseInt(document.getElementById("w-bateo").value) || 0,
    pitcheo: parseInt(document.getElementById("w-pitcheo").value) || 0,
    localia: parseInt(document.getElementById("w-localia").value) || 0
  };
}

/**
 * Actualiza porcentajes y calcula
 */
function updateWeights() {
  document.getElementById("val-w-abridor").textContent = document.getElementById("w-abridor").value + "%";
  document.getElementById("val-w-bateo").textContent = document.getElementById("w-bateo").value + "%";
  document.getElementById("val-w-pitcheo").textContent = document.getElementById("w-pitcheo").value + "%";
  document.getElementById("val-w-localia").textContent = document.getElementById("w-localia").value + "%";

  recalculateAnalysis();
}

/**
 * Ejecuta el predictor y actualiza la UI
 */
function recalculateAnalysis() {
  const teamA = loadedTeams[teamAKey];
  const teamB = loadedTeams[teamBKey];

  if (!teamA || !teamB) return;

  // Auto-calibrar antes de obtener los pesos
  autoCalibrateWeights(teamA, teamB);

  const weights = getWeights();
  const result = window.predictor.analyzeMatchup(teamA, teamB, weights);

  // Títulos
  document.getElementById("h-team-a").textContent = teamA.nombre;
  document.getElementById("h-team-b").textContent = teamB.nombre;

  // Renderizar tabla
  renderComparisonTable(teamA, teamB, result);

  // Probabilidad del Favorito en el indicador circular principal
  const isTeamAFavored = result.probA >= result.probB;
  const favoredProb = isTeamAFavored ? result.probA : result.probB;
  const favoredName = isTeamAFavored ? (teamA.short || teamA.nombre) : (teamB.short || teamB.nombre);

  document.getElementById("prob-percentage-a").textContent = favoredProb.toFixed(1) + "%";
  document.getElementById("prob-label-a").textContent = favoredName;

  const offset = 314.16 - (314.16 * favoredProb / 100);
  const gaugeFill = document.getElementById("gauge-fill-a");
  if (gaugeFill) {
    gaugeFill.style.strokeDashoffset = offset;
    // Cambiar color: Verde neón si es local (favorito), Azul neón si es visitante (favorito)
    gaugeFill.style.stroke = isTeamAFavored ? "var(--primary-neon)" : "var(--info-neon)";
  }

  document.getElementById("lbl-prob-bar-a").textContent = `${teamA.short || teamA.nombre}: ${result.probA}%`;
  document.getElementById("bar-fill-a").style.width = result.probA + "%";

  document.getElementById("lbl-prob-bar-b").textContent = `${teamB.short || teamB.nombre}: ${result.probB}%`;
  document.getElementById("bar-fill-b").style.width = result.probB + "%";

  // Slip
  document.getElementById("bet-pick-ml").textContent = result.moneyline.recomendacion;
  document.getElementById("bet-odds-ml").textContent = `Probabilidad: ${result.moneyline.probabilidad}%`;

  const confBadge = document.getElementById("bet-confidence");
  confBadge.textContent = `${result.moneyline.confianza} CONFIANZA`;
  confBadge.className = "conf-badge";
  if (result.moneyline.confianza === 'Alta') confBadge.classList.add("text-success");
  else if (result.moneyline.confianza === 'Baja') confBadge.classList.add("text-error");

  document.getElementById("bet-pick-rl").textContent = result.runLine.recomendacion;

  const ouLine = parseFloat(document.getElementById("ou-odds-line").value) || 9.5;
  let ouPick = "";
  if (result.carrerasTotales > ouLine) {
    ouPick = `ALTAS (Over) ${ouLine}`;
  } else if (result.carrerasTotales < ouLine) {
    ouPick = `BAJAS (Under) ${ouLine}`;
  } else {
    ouPick = `ALTAS/BAJAS ${ouLine}`;
  }
  document.getElementById("bet-pick-ou").textContent = ouPick;
  document.getElementById("bet-odds-ou").textContent = `Predicción: ${result.carrerasTotales} carreras`;

  document.getElementById("justification-text").innerHTML = result.justificacion;

  // Renderizar la proyección sabermétrica BvP
  renderBvpSection();
}

/**
 * Calibra automáticamente las ponderaciones de la simulación
 */
function autoCalibrateWeights(teamA, teamB) {
  const isAuto = document.getElementById("auto-calibrate")?.checked;
  if (!isAuto) return;

  // 1. Establecer base según liga
  let abridor = activeLeague === "LMB" ? 35 : 45;
  let bateo = activeLeague === "LMB" ? 35 : 25;
  let pitcheo = 20;
  let localia = 10;

  // 2. Evaluar abridores
  const ipA = parseFloat(teamA.abridor.ip) || 0.0;
  const ipB = parseFloat(teamB.abridor.ip) || 0.0;
  const eraA = parseFloat(teamA.abridor.era) || 4.50;
  const eraB = parseFloat(teamB.abridor.era) || 4.50;
  const nameA = teamA.abridor.nombre || "";
  const nameB = teamB.abridor.nombre || "";

  // Detectar si son abridores estables / abridores reales
  const isStarterA = ipA >= 15.0 && nameA !== "Por anunciar";
  const isStarterB = ipB >= 15.0 && nameB !== "Por anunciar";

  // Detectar si son "Ases" (ERA excelente y más de 15 IP)
  const isAceA = isStarterA && eraA <= 3.00;
  const isAceB = isStarterB && eraB <= 3.00;

  // Detectar si es juego de bullpen (Opener / Sin datos de entradas)
  const isBullpenA = !isStarterA || ipA < 5.0 || nameA === "Por anunciar";
  const isBullpenB = !isStarterB || ipB < 5.0 || nameB === "Por anunciar";

  let statusMsg = "";

  if (isBullpenA && isBullpenB) {
    abridor = 10;
    pitcheo = 55;
    statusMsg = "Doble Juego de Bullpen: Relevo priorizado.";
  } else if (isBullpenA || isBullpenB) {
    abridor = activeLeague === "LMB" ? 15 : 20;
    pitcheo = activeLeague === "LMB" ? 40 : 45;
    statusMsg = `Bullpen Day para ${isBullpenA ? teamA.short || teamA.nombre : teamB.short || teamB.nombre}.`;
  } else if (isAceA && isAceB) {
    abridor = activeLeague === "LMB" ? 50 : 60;
    bateo = activeLeague === "LMB" ? 25 : 15;
    statusMsg = "Duelo de Ases en la loma.";
  } else if (isAceA || isAceB) {
    abridor = activeLeague === "LMB" ? 45 : 55;
    bateo = activeLeague === "LMB" ? 30 : 20;
    statusMsg = `As en la loma: ${isAceA ? nameA : nameB}.`;
  } else {
    statusMsg = `Ajuste Estándar (${activeLeague}).`;
  }

  // Actualizar sliders en el DOM
  document.getElementById("w-abridor").value = abridor;
  document.getElementById("w-bateo").value = bateo;
  document.getElementById("w-pitcheo").value = pitcheo;
  document.getElementById("w-localia").value = localia;

  // Actualizar textos de porcentaje
  document.getElementById("val-w-abridor").textContent = abridor + "%";
  document.getElementById("val-w-bateo").textContent = bateo + "%";
  document.getElementById("val-w-pitcheo").textContent = pitcheo + "%";
  document.getElementById("val-w-localia").textContent = localia + "%";

  const weightsDesc = document.getElementById("weights-desc");
  if (weightsDesc) {
    weightsDesc.textContent = `Auto-Calibración: ${statusMsg}`;
    weightsDesc.style.color = "var(--primary-neon)";
  }
}

/**
 * Se ejecuta al cambiar el checkbox de Auto-Calibración
 */
function toggleAutoCalibrate() {
  const isAuto = document.getElementById("auto-calibrate").checked;
  
  // Habilitar o deshabilitar sliders
  document.getElementById("w-abridor").disabled = isAuto;
  document.getElementById("w-bateo").disabled = isAuto;
  document.getElementById("w-pitcheo").disabled = isAuto;
  document.getElementById("w-localia").disabled = isAuto;

  const weightsDesc = document.getElementById("weights-desc");
  if (!isAuto) {
    if (weightsDesc) {
      weightsDesc.textContent = "Ajusta la importancia relativa de cada elemento en la predicción.";
      weightsDesc.style.color = "var(--text-secondary)";
    }
  }

  recalculateAnalysis();
}

/**
 * Renderiza la tabla comparativa con las estadísticas exactas requeridas por el usuario
 */
function renderComparisonTable(teamA, teamB, result) {
  const tbody = document.getElementById("comparison-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";
 
  const sections = [
    {
      title: "Lanzador Abridor",
      metrics: [
        { label: "Nombre", path: "abridor.nombre", format: 'str', isBetter: 'none' },
        { label: "Récord (G-P)", path: "abridor.wl", format: 'str', isBetter: 'none' },
        { label: "ERA (Efectividad)", path: "abridor.era", format: 'num2', isBetter: 'low' },
        { label: "WHIP", path: "abridor.whip", format: 'num2', isBetter: 'low' },
        { label: "IP (Entradas)", path: "abridor.ip", format: 'num1', isBetter: 'high' },
        { label: "SO (Ponches)", path: "abridor.so", format: 'int', isBetter: 'high' },
        { label: "BB (Bases Bola)", path: "abridor.bb", format: 'int', isBetter: 'low' },
        { label: "HR (Jonrones)", path: "abridor.hr", format: 'int', isBetter: 'low' },
        { label: "FIP (Sabermetría)", path: "abridor.fip", format: 'num2', isBetter: 'low' }
      ]
    },
    {
      title: "Pitcheo Colectivo (Equipo)",
      metrics: [
        { label: "ERA Colectiva", path: "pitcheo.era", format: 'num2', isBetter: 'low' },
        { label: "WHIP Colectivo", path: "pitcheo.whip", format: 'num2', isBetter: 'low' },
        { label: "AVG Contra (BAA)", path: "pitcheo.avg", format: 'num3', isBetter: 'low' },
        { label: "SO (Ponches)", path: "pitcheo.so", format: 'int', isBetter: 'high' },
        { label: "BB (Bases Bola)", path: "pitcheo.bb", format: 'int', isBetter: 'low' },
        { label: "HR (Jonrones Permitidos)", path: "pitcheo.hr", format: 'int', isBetter: 'low' }
      ]
    },
    {
      title: "Bateo Colectivo (Equipo)",
      metrics: [
        { label: "AVG (Promedio)", path: "bateo.avg", format: 'num3', isBetter: 'high' },
        { label: "OBP (Embasado)", path: "bateo.obp", format: 'num3', isBetter: 'high' },
        { label: "SLG (Poder)", path: "bateo.slg", format: 'num3', isBetter: 'high' },
        { label: "OPS (Ofensiva Gral)", path: "bateo.ops", format: 'num3', isBetter: 'high' },
        { label: "R (Carreras Anotadas)", path: "bateo.r", format: 'int', isBetter: 'high' },
        { label: "HR (Jonrones Conectados)", path: "bateo.hr", format: 'int', isBetter: 'high' }
      ]
    },
    {
      title: "Desgaste del Bullpen (Últimos 3 días)",
      customRows: [
        { label: "Índice de Fatiga", valA: activeBullpenFatigue.homeScore, valB: activeBullpenFatigue.awayScore, isBetter: 'low' },
        { label: "Estado de Cansancio", valA: activeBullpenFatigue.homeStatus, valB: activeBullpenFatigue.awayStatus, isBetter: 'none' },
        { label: "Lanzaron Ayer", valA: activeBullpenFatigue.homeYesterday, valB: activeBullpenFatigue.awayYesterday, isBetter: 'none' }
      ]
    }
  ];
 
  sections.forEach(sec => {
    // Cabecera de sección
    const headRow = document.createElement("tr");
    headRow.className = "metric-row-header";
    headRow.innerHTML = `<td colspan="3">${sec.title}</td>`;
    tbody.appendChild(headRow);
 
    if (sec.metrics) {
      sec.metrics.forEach(met => {
        const valA = getNestedValue(teamA, met.path);
        const valB = getNestedValue(teamB, met.path);
 
        const formattedA = formatStatValue(valA, met.format);
        const formattedB = formatStatValue(valB, met.format);
 
        let classA = "val-col";
        let classB = "val-col";
 
        if (met.isBetter === 'high') {
          if (Number(valA) > Number(valB)) classA += " val-advantage";
          else if (Number(valB) > Number(valA)) classB += " val-advantage";
        } else if (met.isBetter === 'low') {
          if (Number(valA) < Number(valB)) classA += " val-advantage";
          else if (Number(valB) < Number(valA)) classB += " val-advantage";
        }
 
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="${classA}">${formattedA}</td>
          <td class="lbl-col">${met.label}</td>
          <td class="${classB}">${formattedB}</td>
        `;
        tbody.appendChild(tr);
      });
    } else if (sec.customRows) {
      sec.customRows.forEach(row => {
        const valA = row.valA;
        const valB = row.valB;
 
        let classA = "val-col";
        let classB = "val-col";
 
        if (row.isBetter === 'high') {
          if (Number(valA) > Number(valB)) classA += " val-advantage";
          else if (Number(valB) > Number(valA)) classB += " val-advantage";
        } else if (row.isBetter === 'low') {
          if (Number(valA) < Number(valB)) classA += " val-advantage";
          else if (Number(valB) < Number(valA)) classB += " val-advantage";
        }
 
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="${classA}">${valA}</td>
          <td class="lbl-col">${row.label}</td>
          <td class="${classB}">${valB}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function formatStatValue(val, format) {
  if (val === undefined || val === null || (isNaN(val) && typeof val !== 'string')) return '-';
  if (format === 'str') return val;
  if (format === 'int') return parseInt(val);
  if (format === 'num1') return Number(val).toFixed(1);
  if (format === 'num2') return Number(val).toFixed(2);
  if (format === 'num3') {
    let str = Number(val).toFixed(3);
    if (str.startsWith('0.')) return str.substring(1); // .295 en vez de 0.295
    return str;
  }
  return val;
}

/**
 * Carga manual de datos desde los inputs del formulario
 */
function loadManualData() {
  const manualAKey = "ManualA";
  const manualBKey = "ManualB";

  const mTeamA = {
    nombre: document.getElementById("m-name-a").value || "Manual Equipo A",
    short: "Manual A",
    bateo: {
      avg: parseFloat(document.getElementById("m-bat-avg-a").value) || 0.270,
      obp: parseFloat(document.getElementById("m-bat-obp-a").value) || 0.340,
      slg: parseFloat(document.getElementById("m-bat-slg-a").value) || 0.420,
      ops: parseFloat(document.getElementById("m-bat-ops-a").value) || 0.760,
      r: parseInt(document.getElementById("m-bat-r-a").value) || 380,
      hr: parseInt(document.getElementById("m-bat-hr-a").value) || 60,
      g: 75
    },
    pitcheo: {
      era: parseFloat(document.getElementById("m-pit-era-a").value) || 4.50,
      whip: parseFloat(document.getElementById("m-pit-whip-a").value) || 1.40,
      avg: parseFloat(document.getElementById("m-pit-avg-a").value) || 0.260,
      so: parseInt(document.getElementById("m-pit-so-a").value) || 500,
      bb: parseInt(document.getElementById("m-pit-bb-a").value) || 250,
      hr: parseInt(document.getElementById("m-pit-hr-a").value) || 70
    },
    abridor: {
      nombre: document.getElementById("m-abr-name-a").value || "Abridor A",
      era: parseFloat(document.getElementById("m-abr-era-a").value) || 4.00,
      whip: parseFloat(document.getElementById("m-abr-whip-a").value) || 1.30,
      fip: parseFloat(document.getElementById("m-abr-fip-a").value) || 4.00,
      ip: parseFloat(document.getElementById("m-abr-ip-a").value) || 60.0,
      so: parseInt(document.getElementById("m-abr-so-a").value) || 50,
      bb: parseInt(document.getElementById("m-abr-bb-a").value) || 20,
      hr: parseInt(document.getElementById("m-abr-hr-a").value) || 6,
      wl: "0-0"
    }
  };

  const mTeamB = {
    nombre: document.getElementById("m-name-b").value || "Manual Equipo B",
    short: "Manual B",
    bateo: {
      avg: parseFloat(document.getElementById("m-bat-avg-b").value) || 0.270,
      obp: parseFloat(document.getElementById("m-bat-obp-b").value) || 0.340,
      slg: parseFloat(document.getElementById("m-bat-slg-b").value) || 0.420,
      ops: parseFloat(document.getElementById("m-bat-ops-b").value) || 0.760,
      r: parseInt(document.getElementById("m-bat-r-b").value) || 380,
      hr: parseInt(document.getElementById("m-bat-hr-b").value) || 60,
      g: 75
    },
    pitcheo: {
      era: parseFloat(document.getElementById("m-pit-era-b").value) || 4.50,
      whip: parseFloat(document.getElementById("m-pit-whip-b").value) || 1.40,
      avg: parseFloat(document.getElementById("m-pit-avg-b").value) || 0.260,
      so: parseInt(document.getElementById("m-pit-so-b").value) || 500,
      bb: parseInt(document.getElementById("m-pit-bb-b").value) || 250,
      hr: parseInt(document.getElementById("m-pit-hr-b").value) || 70
    },
    abridor: {
      nombre: document.getElementById("m-abr-name-b").value || "Abridor B",
      era: parseFloat(document.getElementById("m-abr-era-b").value) || 4.00,
      whip: parseFloat(document.getElementById("m-abr-whip-b").value) || 1.30,
      fip: parseFloat(document.getElementById("m-abr-fip-b").value) || 4.00,
      ip: parseFloat(document.getElementById("m-abr-ip-b").value) || 60.0,
      so: parseInt(document.getElementById("m-abr-so-b").value) || 50,
      bb: parseInt(document.getElementById("m-abr-bb-b").value) || 20,
      hr: parseInt(document.getElementById("m-abr-hr-b").value) || 6,
      wl: "0-0"
    }
  };

  loadedTeams[manualAKey] = mTeamA;
  loadedTeams[manualBKey] = mTeamB;

  populateTeamSelectors();

  teamAKey = manualAKey;
  teamBKey = manualBKey;
  document.getElementById("select-team-a").value = teamAKey;
  document.getElementById("select-team-b").value = teamBKey;

  recalculateAnalysis();
  alert("Datos manuales cargados exitosamente.");
}

/**
 * Inteligencia Parser para interpretar tablas pegadas directamente (Conserva compatibilidad)
 */
function parsePastedData(type) {
  const textareaId = `paste-${type}`;
  const text = document.getElementById(textareaId).value;
  const statusEl = document.getElementById(`${type}-status`);
  
  if (!text.trim()) {
    statusEl.textContent = "Sin datos pegados";
    statusEl.className = "status-msg text-error";
    return;
  }

  const lines = text.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length < 2) {
    statusEl.textContent = "Datos insuficientes";
    statusEl.className = "status-msg text-error";
    return;
  }

  let headerIndex = 0;
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const l = lines[i].toLowerCase();
    if (l.includes("team") || l.includes("equipo") || l.includes("avg") || l.includes("era") || l.includes("whip") || l.includes("jugador")) {
      headerIndex = i;
      break;
    }
  }

  const headerLine = lines[headerIndex];
  const headers = headerLine.split(/\t| {2,}/).map(h => h.trim().toUpperCase());

  const colIndex = {
    team: headers.findIndex(h => h.includes("EQUIPO") || h.includes("CLUB") || h.includes("TEAM") || h === "EQ" || h === "EQU"),
    player: headers.findIndex(h => h.includes("JUGADOR") || h.includes("PLAYER") || h.includes("NOMBRE") || h === "ABRIDOR" || h === "LANZADOR"),
    avg: headers.findIndex(h => h === "AVG" || h === "AVE" || h === "BA" || h.includes("PROMEDIO")),
    obp: headers.findIndex(h => h === "OBP"),
    slg: headers.findIndex(h => h === "SLG"),
    ops: headers.findIndex(h => h === "OPS"),
    r: headers.findIndex(h => h === "R" || h === "C" || h === "CA" || h === "CARRERAS"),
    hr: headers.findIndex(h => h === "HR" || h === "JON" || h === "JO" || h === "JONRONES"),
    era: headers.findIndex(h => h === "ERA" || h === "PCL" || h === "EFECTIVIDAD" || h === "EFE"),
    whip: headers.findIndex(h => h === "WHIP"),
    bb: headers.findIndex(h => h === "BB" || h === "BASE"),
    so: headers.findIndex(h => h === "SO" || h === "SO/K" || h === "K" || h === "PONCHES"),
    ip: headers.findIndex(h => h === "IP" || h === "EL" || h === "ENTRADAS" || h === "INN"),
    fip: headers.findIndex(h => h === "FIP")
  };

  let parsedCount = 0;

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const rowCells = lines[i].split(/\t| {2,}/).map(c => c.trim());
    if (rowCells.length < 3) continue;

    let teamName = "Desconocido";
    if (colIndex.team !== -1 && rowCells[colIndex.team]) {
      teamName = rowCells[colIndex.team].replace(/[0-9\.\*]/g, '').trim();
    } else if (colIndex.player !== -1 && rowCells[colIndex.player]) {
      teamName = rowCells[colIndex.player];
    } else {
      const firstNonNum = rowCells.find(cell => isNaN(cell.replace(/[\.,%]/g, '')));
      if (firstNonNum) teamName = firstNonNum.replace(/[0-9\.\*]/g, '').trim();
    }

    if (teamName === "Desconocido" || !teamName) continue;

    let targetKey = null;
    const cleanQuery = teamName.toLowerCase();
    
    for (let key of Object.keys(loadedTeams)) {
      const dbName = loadedTeams[key].nombre.toLowerCase();
      if (cleanQuery.includes(dbName) || dbName.includes(cleanQuery) || cleanQuery.includes(key.toLowerCase())) {
        targetKey = key;
        break;
      }
    }

    if (!targetKey) {
      targetKey = teamName;
      loadedTeams[targetKey] = {
        nombre: teamName,
        short: teamName.substring(0, 12),
        bateo: { avg: 0.270, obp: 0.340, slg: 0.420, ops: 0.760, r: 350, hr: 60, g: 75 },
        pitcheo: { era: 4.50, whip: 1.40, hr: 70, bb: 250, so: 500, avg: 0.270 },
        abridor: { nombre: "Abridor", era: 4.50, whip: 1.35, hr: 6, bb: 20, so: 50, ip: 50.0, fip: 4.50, wl: "0-0" }
      };
    }

    const team = loadedTeams[targetKey];

    if (type === 'batting') {
      if (colIndex.avg !== -1 && rowCells[colIndex.avg]) team.bateo.avg = parseStatVal(rowCells[colIndex.avg]);
      if (colIndex.obp !== -1 && rowCells[colIndex.obp]) team.bateo.obp = parseStatVal(rowCells[colIndex.obp]);
      if (colIndex.slg !== -1 && rowCells[colIndex.slg]) team.bateo.slg = parseStatVal(rowCells[colIndex.slg]);
      if (colIndex.ops !== -1 && rowCells[colIndex.ops]) team.bateo.ops = parseStatVal(rowCells[colIndex.ops]);
      if (colIndex.r !== -1 && rowCells[colIndex.r]) team.bateo.r = parseStatVal(rowCells[colIndex.r]);
      if (colIndex.hr !== -1 && rowCells[colIndex.hr]) team.bateo.hr = parseStatVal(rowCells[colIndex.hr]);
      parsedCount++;
    } 
    else if (type === 'pitching') {
      if (colIndex.era !== -1 && rowCells[colIndex.era]) team.pitcheo.era = parseStatVal(rowCells[colIndex.era]);
      if (colIndex.whip !== -1 && rowCells[colIndex.whip]) team.pitcheo.whip = parseStatVal(rowCells[colIndex.whip]);
      if (colIndex.avg !== -1 && rowCells[colIndex.avg]) team.pitcheo.avg = parseStatVal(rowCells[colIndex.avg]); // BAA
      if (colIndex.bb !== -1 && rowCells[colIndex.bb]) team.pitcheo.bb = parseStatVal(rowCells[colIndex.bb]);
      if (colIndex.so !== -1 && rowCells[colIndex.so]) team.pitcheo.so = parseStatVal(rowCells[colIndex.so]);
      if (colIndex.hr !== -1 && rowCells[colIndex.hr]) team.pitcheo.hr = parseStatVal(rowCells[colIndex.hr]);
      parsedCount++;
    } 
    else if (type === 'starters') {
      team.abridor.nombre = teamName;
      if (colIndex.era !== -1 && rowCells[colIndex.era]) team.abridor.era = parseStatVal(rowCells[colIndex.era]);
      if (colIndex.whip !== -1 && rowCells[colIndex.whip]) team.abridor.whip = parseStatVal(rowCells[colIndex.whip]);
      if (colIndex.ip !== -1 && rowCells[colIndex.ip]) team.abridor.ip = parseStatVal(rowCells[colIndex.ip]);
      if (colIndex.so !== -1 && rowCells[colIndex.so]) team.abridor.so = parseStatVal(rowCells[colIndex.so]);
      if (colIndex.bb !== -1 && rowCells[colIndex.bb]) team.abridor.bb = parseStatVal(rowCells[colIndex.bb]);
      if (colIndex.hr !== -1 && rowCells[colIndex.hr]) team.abridor.hr = parseStatVal(rowCells[colIndex.hr]);
      if (colIndex.fip !== -1 && rowCells[colIndex.fip]) team.abridor.fip = parseStatVal(rowCells[colIndex.fip]);
      else team.abridor.fip = window.predictor.calculateFIP(team.abridor.hr, team.abridor.bb, team.abridor.so, team.abridor.ip);
      parsedCount++;
    }
  }

  if (parsedCount > 0) {
    statusEl.textContent = `¡Procesados ${parsedCount} registros!`;
    statusEl.className = "status-msg text-success";
    populateTeamSelectors();
    recalculateAnalysis();
  } else {
    statusEl.textContent = "No se pudieron mapear los datos pegados.";
    statusEl.className = "status-msg text-error";
  }
}

function parseStatVal(str) {
  let clean = str.replace(',', '');
  if (clean.startsWith('.')) clean = '0' + clean;
  return parseFloat(clean) || 0;
}

/**
 * Realiza el cálculo del desgaste del bullpen consultando en segundo plano los boxscores de los últimos 3 días.
 */
async function analyzeBullpenFatigue(homeId, awayId) {
  if (activeLeague === "KBO") {
    activeBullpenFatigue = {
      homeScore: 0.0,
      awayScore: 0.0,
      homeStatus: "Fresco",
      awayStatus: "Fresco",
      homeYesterday: "No",
      awayYesterday: "No"
    };
    renderComparisonTable();
    recalculateAnalysis();
    return;
  }

  const currentKey = `${homeId}_${awayId}`;
  const config = LEAGUE_CONFIGS[activeLeague];
  
  const dates = [];
  for (let i = 1; i <= 4; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    dates.push([year, month.padStart(2, '0'), day.padStart(2, '0')].join('-'));
  }

  try {
    const [schedHome, schedAway] = await Promise.all([
      fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=${config.sportId}&teamId=${homeId}&startDate=${dates[dates.length - 1]}&endDate=${dates[0]}&status=Final`).then(r => r.ok ? r.json() : null),
      fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=${config.sportId}&teamId=${awayId}&startDate=${dates[dates.length - 1]}&endDate=${dates[0]}&status=Final`).then(r => r.ok ? r.json() : null)
    ]);

    const gamePks = [];
    const seenPks = new Set();

    [schedHome, schedAway].forEach(sched => {
      if (sched && sched.dates) {
        sched.dates.forEach(d => {
          if (d.games) {
            d.games.forEach(g => {
              if (!seenPks.has(g.gamePk)) {
                seenPks.add(g.gamePk);
                gamePks.push({ gamePk: g.gamePk, date: g.officialDate });
              }
            });
          }
        });
      }
    });

    const boxscorePromises = gamePks.map(async (item) => {
      if (boxscoreCache[item.gamePk]) {
        return { boxscore: boxscoreCache[item.gamePk], date: item.date };
      }
      try {
        const res = await fetch(`https://statsapi.mlb.com/api/v1/game/${item.gamePk}/boxscore`);
        if (!res.ok) return null;
        const data = await res.json();
        boxscoreCache[item.gamePk] = data;
        return { boxscore: data, date: item.date };
      } catch (e) {
        console.warn(`Error cargando boxscore ${item.gamePk}:`, e);
        return null;
      }
    });

    const results = (await Promise.all(boxscorePromises)).filter(r => r !== null);

    if (`${teamAKey}_${teamBKey}` !== currentKey) return;

    const relieversYesterdayHome = [];
    const relieversYesterdayAway = [];
    
    const pitcherDatesHome = {};
    const pitcherDatesAway = {};

    let scoreHome = 0;
    let scoreAway = 0;
    let extraInningsHome = 0;
    let extraInningsAway = 0;

    results.forEach(({ boxscore, date }) => {
      const teams = boxscore.teams || {};
      
      if (teams.home && teams.home.team && teams.home.team.id.toString() === homeId.toString()) {
        const gameIP = getGameInningsPitched(teams.home);
        extraInningsHome += Math.max(0, Math.ceil(gameIP - 9.0));
        processTeamPitchers(teams.home, date, relieversYesterdayHome, pitcherDatesHome);
      }
      if (teams.away && teams.away.team && teams.away.team.id.toString() === homeId.toString()) {
        const gameIP = getGameInningsPitched(teams.away);
        extraInningsHome += Math.max(0, Math.ceil(gameIP - 9.0));
        processTeamPitchers(teams.away, date, relieversYesterdayHome, pitcherDatesHome);
      }

      if (teams.home && teams.home.team && teams.home.team.id.toString() === awayId.toString()) {
        const gameIP = getGameInningsPitched(teams.home);
        extraInningsAway += Math.max(0, Math.ceil(gameIP - 9.0));
        processTeamPitchers(teams.home, date, relieversYesterdayAway, pitcherDatesAway);
      }
      if (teams.away && teams.away.team && teams.away.team.id.toString() === awayId.toString()) {
        const gameIP = getGameInningsPitched(teams.away);
        extraInningsAway += Math.max(0, Math.ceil(gameIP - 9.0));
        processTeamPitchers(teams.away, date, relieversYesterdayAway, pitcherDatesAway);
      }
    });

    scoreHome = calculateFatiguePoints(pitcherDatesHome, dates) + (extraInningsHome * 1.5);
    scoreAway = calculateFatiguePoints(pitcherDatesAway, dates) + (extraInningsAway * 1.5);

    const getStatus = (score, extraInnings) => {
      let statusStr = "";
      if (score >= 8) statusStr = "<span style='color: var(--error-neon); font-weight:700;'>Cansado</span>";
      else if (score >= 4) statusStr = "<span style='color: var(--warning-neon); font-weight:700;'>Moderado</span>";
      else statusStr = "<span style='color: var(--primary-neon); font-weight:700;'>Fresco</span>";
      
      if (extraInnings > 0) {
        statusStr += ` (${extraInnings} inn extra)`;
      }
      return statusStr;
    };

    activeBullpenFatigue = {
      homeScore: scoreHome,
      awayScore: scoreAway,
      homeStatus: getStatus(scoreHome, extraInningsHome),
      awayStatus: getStatus(scoreAway, extraInningsAway),
      homeYesterday: relieversYesterdayHome.length > 0 ? relieversYesterdayHome.join(", ") : "Ninguno",
      awayYesterday: relieversYesterdayAway.length > 0 ? relieversYesterdayAway.join(", ") : "Ninguno"
    };

    recalculateAnalysis();

  } catch (err) {
    console.error("Error al calcular el desgaste del bullpen:", err);
    activeBullpenFatigue = {
      homeScore: 0,
      awayScore: 0,
      homeStatus: "Error",
      awayStatus: "Error",
      homeYesterday: "-",
      awayYesterday: "-"
    };
    recalculateAnalysis();
  }
}

function processTeamPitchers(teamData, date, yesterdayList, pitcherDates) {
  if (!teamData.players) return;
  
  const pitchers = teamData.pitchers || [];
  pitchers.forEach(id => {
    const playerKey = `ID${id}`;
    const p = teamData.players[playerKey];
    if (p && p.stats && p.stats.pitching) {
      const stats = p.stats.pitching;
      
      if (stats.gamesStarted === 0 && (parseFloat(stats.inningsPitched) || 0) > 0) {
        const name = p.person.fullName;
        const pitches = parseInt(stats.pitchesThrown) || 0;
        const outs = parseInt(stats.outs) || 0;
        
        if (!pitcherDates[name]) {
          pitcherDates[name] = [];
        }
        pitcherDates[name].push({ date, pitches, outs });

        // Si lanzó ayer
        const d = new Date();
        d.setDate(d.getDate() - 1);
        const yestStr = [d.getFullYear(), ('' + (d.getMonth() + 1)).padStart(2, '0'), ('' + d.getDate()).padStart(2, '0')].join('-');
        
        if (date === yestStr && !yesterdayList.includes(name)) {
          yesterdayList.push(`${name} (${pitches} pit)`);
        }
      }
    }
  });
}

function calculateFatiguePoints(pitcherDates, dates) {
  let totalFatigue = 0;
  
  Object.keys(pitcherDates).forEach(name => {
    const appearances = pitcherDates[name];
    let pFatigue = 0;
    let pitchedYesterday = false;
    let pitchedTwoDaysAgo = false;

    appearances.forEach(app => {
      const pitches = app.pitches;

      if (app.date === dates[0]) {
        pitchedYesterday = true;
        pFatigue += pitches > 15 ? 3 : 2;
      } else if (app.date === dates[1]) {
        pitchedTwoDaysAgo = true;
        pFatigue += pitches > 20 ? 2 : 1;
      } else if (app.date === dates[2]) {
        pFatigue += pitches > 30 ? 1 : 0;
      }
    });

    if (pitchedYesterday && pitchedTwoDaysAgo) {
      pFatigue += 3;
    }

    totalFatigue += pFatigue;
  });

  return totalFatigue;
}

/**
 * Reloj de auto-actualización cada 2 minutos
 */
let autoRefreshTimer = null;
let secondsLeft = 120;

function startAutoRefreshTimer() {
  if (autoRefreshTimer) clearInterval(autoRefreshTimer);
  
  const timerLabel = document.getElementById("auto-update-countdown");
  if (activeLeague === "KBO") {
    if (timerLabel) timerLabel.textContent = "N/A";
    return;
  }

  secondsLeft = 120;
  if (timerLabel) timerLabel.textContent = "2:00";

  autoRefreshTimer = setInterval(async () => {
    secondsLeft--;
    
    const label = document.getElementById("auto-update-countdown");
    if (label) {
      const mins = Math.floor(secondsLeft / 60);
      const secs = secondsLeft % 60;
      label.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    if (secondsLeft <= 0) {
      secondsLeft = 120;
      console.log("Auto-actualización silenciosa en progreso...");
      
      const success = await initLeagueData(activeLeague, true);
      if (success) {
        const activeCard = document.querySelector(".game-card.active");
        let selectedIdx = 0;
        if (activeCard) {
          const cards = Array.from(document.querySelectorAll(".game-card"));
          selectedIdx = cards.indexOf(activeCard);
        }

        loadedTeams = { ...leagueData.teams };
        
        const dateInput = document.getElementById("game-date-input");
        const dateStr = dateInput ? dateInput.value : getTodayDateString();
        await loadDailyGames(dateStr);

        if (leagueData.games.length > 0) {
          selectGame(selectedIdx >= 0 ? selectedIdx : 0);
        }
      }
    }
  }, 1000);
}

/**
 * Suma todas las entradas lanzadas por los pitchers en un juego de la API
 */
function getGameInningsPitched(teamData) {
  if (!teamData.players || !teamData.pitchers) return 0.0;
  let totalIP = 0.0;
  teamData.pitchers.forEach(id => {
    const playerKey = `ID${id}`;
    const p = teamData.players[playerKey];
    if (p && p.stats && p.stats.pitching) {
      const ipStr = p.stats.pitching.inningsPitched || "0.0";
      let realIP = parseFloat(ipStr) || 0.0;
      const ipStrStr = ipStr.toString();
      if (ipStrStr.includes('.')) {
        const parts = ipStrStr.split('.');
        const innings = parseInt(parts[0]) || 0;
        const outs = parseInt(parts[1]) || 0;
        if (outs === 1) realIP = innings + 0.3333;
        else if (outs === 2) realIP = innings + 0.6667;
      }
      totalIP += realIP;
    }
  });
  return totalIP;
}

/**
 * Alterna entre el Tema Oscuro (por defecto) y el Tema Claro de alto contraste
 */
function toggleTheme() {
  const isLight = document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  
  const themeLbl = document.getElementById("theme-btn-lbl");
  const sunIcon = document.querySelector("#theme-toggle-btn .sun-icon");
  const moonIcon = document.querySelector("#theme-toggle-btn .moon-icon");

  if (isLight) {
    if (themeLbl) themeLbl.textContent = "Modo Oscuro";
    if (sunIcon) sunIcon.style.display = "inline-block";
    if (moonIcon) moonIcon.style.display = "none";
  } else {
    if (themeLbl) themeLbl.textContent = "Modo Claro";
    if (sunIcon) sunIcon.style.display = "none";
    if (moonIcon) moonIcon.style.display = "inline-block";
  }
}
