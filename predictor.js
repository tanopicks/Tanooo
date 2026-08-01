/**
 * Motor Predictor de Béisbol (Sabermetrics & Betting Engine)
 * Contiene las fórmulas matemáticas para FIP, Log-5 y cálculo de probabilidades.
 */

// Promedios estimados de la liga (LMB) para normalización de la temporada regular
const LEAGUE_AVGS = {
  // Bateo Colectivo
  AVG: 0.275,
  OBP: 0.345,
  SLG: 0.420,
  OPS: 0.765,
  R: 420,       // Carreras promedio anotadas por equipo en la temporada
  HR_BAT: 75,   // Jonrones promedio por equipo en la temporada

  // Pitcheo Colectivo
  ERA: 4.60,
  WHIP: 1.42,
  HR_PIT: 75,   // Jonrones promedio permitidos
  BB_PIT: 260,  // Bases por bola permitidas
  SO_PIT: 520,  // Ponches propinados
  AVG_CONTRA: 0.275, // Promedio en contra colectiva (BAA)

  // Lanzadores Abridores
  ERA_ABR: 4.30,
  WHIP_ABR: 1.32,
  HR_ABR: 7,    // Jonrones promedio del abridor en la temporada
  BB_ABR: 20,   // Bases por bola promedio del abridor
  SO_ABR: 50,   // Ponches promedio del abridor
  IP_ABR: 60.0, // Entradas promedio lanzadas
  FIP_CONST: 3.20 // Constante estándar de FIP
};

/**
 * Calcula el FIP (Fielding Independent Pitching) de un abridor.
 * Fórmula: FIP = ((13 * HR) + (3 * BB) - (2 * SO)) / IP + Constante
 */
function calculateFIP(hr, bb, so, ip) {
  let realIP = parseFloat(ip) || 0.0;
  const ipStr = (ip || "").toString();
  if (ipStr.includes('.')) {
    const parts = ipStr.split('.');
    const innings = parseInt(parts[0]) || 0;
    const outs = parseInt(parts[1]) || 0;
    if (outs === 1) realIP = innings + 0.3333;
    else if (outs === 2) realIP = innings + 0.6667;
  }

  if (realIP <= 0) return 0;
  const fipRaw = ((13 * hr) + (3 * bb) - (2 * so)) / realIP;
  return parseFloat((fipRaw + LEAGUE_AVGS.FIP_CONST).toFixed(2));
}

/**
 * Normaliza un valor estadístico. A mayor valor, mejor (tipo: 'high') o peor (tipo: 'low').
 * Retorna un índice entre 0.1 y 2.0 donde 1.0 es el promedio de la liga.
 */
function normalizeStat(value, type, leagueAvg) {
  if (value === undefined || value === null || isNaN(value)) return 1.0;
  
  if (type === 'high') {
    // Para AVG, OPS, OBP, SLG, SO, IP, R, HR_BAT
    if (leagueAvg === 0) return 1.0;
    return value / leagueAvg;
  } else {
    // Para ERA, WHIP, FIP, HR_permitidos, BB_permitidos, AVG_CONTRA
    // A menor valor, mejor. Si es 0, le damos un rating excelente.
    if (value === 0) return 1.8;
    return leagueAvg / value;
  }
}

/**
 * Ejecuta el análisis predictivo de dos equipos con pesos personalizados.
 * Compara todas las estadísticas indicadas por el usuario sin omitir ninguna.
 */
function analyzeMatchup(teamA, teamB, weights, fatigueA = 0, fatigueB = 0) {
  // 1. Calcular FIP de los abridores si no está ingresado directamente
  const abridorA_FIP = teamA.abridor.fip || calculateFIP(teamA.abridor.hr, teamA.abridor.bb, teamA.abridor.so, teamA.abridor.ip);
  const abridorB_FIP = teamB.abridor.fip || calculateFIP(teamB.abridor.hr, teamB.abridor.bb, teamB.abridor.so, teamB.abridor.ip);

  // Aplicar penalidad por fatiga de bullpen en la efectividad del pitcheo
  let eraColectivaA = teamA.pitcheo.era;
  let eraColectivaB = teamB.pitcheo.era;

  if (fatigueA > 7) {
    const penalty = Math.min((fatigueA - 7) * 0.03, 0.20); // Máximo 20%
    eraColectivaA = eraColectivaA * (1 + penalty);
  }
  if (fatigueB > 7) {
    const penalty = Math.min((fatigueB - 7) * 0.03, 0.20);
    eraColectivaB = eraColectivaB * (1 + penalty);
  }

  // 2. Rating Ofensivo de Bateo (AVG, OBP, SLG, OPS, R, HR)
  const ratingOfensivoA = (
    normalizeStat(teamA.bateo.avg, 'high', LEAGUE_AVGS.AVG) * 0.15 +
    normalizeStat(teamA.bateo.obp, 'high', LEAGUE_AVGS.OBP) * 0.15 +
    normalizeStat(teamA.bateo.slg, 'high', LEAGUE_AVGS.SLG) * 0.15 +
    normalizeStat(teamA.bateo.ops, 'high', LEAGUE_AVGS.OPS) * 0.25 +
    normalizeStat(teamA.bateo.r, 'high', LEAGUE_AVGS.R) * 0.15 +
    normalizeStat(teamA.bateo.hr, 'high', LEAGUE_AVGS.HR_BAT) * 0.15
  );

  const ratingOfensivoB = (
    normalizeStat(teamB.bateo.avg, 'high', LEAGUE_AVGS.AVG) * 0.15 +
    normalizeStat(teamB.bateo.obp, 'high', LEAGUE_AVGS.OBP) * 0.15 +
    normalizeStat(teamB.bateo.slg, 'high', LEAGUE_AVGS.SLG) * 0.15 +
    normalizeStat(teamB.bateo.ops, 'high', LEAGUE_AVGS.OPS) * 0.25 +
    normalizeStat(teamB.bateo.r, 'high', LEAGUE_AVGS.R) * 0.15 +
    normalizeStat(teamB.bateo.hr, 'high', LEAGUE_AVGS.HR_BAT) * 0.15
  );

  // 3. Rating del Lanzador Abridor (ERA, WHIP, HR, BB, SO, IP, FIP)
  const ratingAbridorA = (
    normalizeStat(teamA.abridor.era, 'low', LEAGUE_AVGS.ERA_ABR) * 0.20 +
    normalizeStat(teamA.abridor.whip, 'low', LEAGUE_AVGS.WHIP_ABR) * 0.20 +
    normalizeStat(teamA.abridor.hr, 'low', LEAGUE_AVGS.HR_ABR) * 0.10 +
    normalizeStat(teamA.abridor.bb, 'low', LEAGUE_AVGS.BB_ABR) * 0.10 +
    normalizeStat(teamA.abridor.so, 'high', LEAGUE_AVGS.SO_ABR) * 0.10 +
    normalizeStat(teamA.abridor.ip, 'high', LEAGUE_AVGS.IP_ABR) * 0.10 +
    normalizeStat(abridorA_FIP, 'low', LEAGUE_AVGS.ERA_ABR) * 0.20
  );

  const ratingAbridorB = (
    normalizeStat(teamB.abridor.era, 'low', LEAGUE_AVGS.ERA_ABR) * 0.20 +
    normalizeStat(teamB.abridor.whip, 'low', LEAGUE_AVGS.WHIP_ABR) * 0.20 +
    normalizeStat(teamB.abridor.hr, 'low', LEAGUE_AVGS.HR_ABR) * 0.10 +
    normalizeStat(teamB.abridor.bb, 'low', LEAGUE_AVGS.BB_ABR) * 0.10 +
    normalizeStat(teamB.abridor.so, 'high', LEAGUE_AVGS.SO_ABR) * 0.10 +
    normalizeStat(teamB.abridor.ip, 'high', LEAGUE_AVGS.IP_ABR) * 0.10 +
    normalizeStat(abridorB_FIP, 'low', LEAGUE_AVGS.ERA_ABR) * 0.20
  );

  // 4. Rating de Pitcheo Colectivo (ERA, WHIP, HR, BB, SO, AVG)
  const ratingPitcheoColectivoA = (
    normalizeStat(eraColectivaA, 'low', LEAGUE_AVGS.ERA) * 0.25 +
    normalizeStat(teamA.pitcheo.whip, 'low', LEAGUE_AVGS.WHIP) * 0.25 +
    normalizeStat(teamA.pitcheo.hr, 'low', LEAGUE_AVGS.HR_PIT) * 0.10 +
    normalizeStat(teamA.pitcheo.bb, 'low', LEAGUE_AVGS.BB_PIT) * 0.10 +
    normalizeStat(teamA.pitcheo.so, 'high', LEAGUE_AVGS.SO_PIT) * 0.15 +
    normalizeStat(teamA.pitcheo.avg, 'low', LEAGUE_AVGS.AVG_CONTRA) * 0.15
  );

  const ratingPitcheoColectivoB = (
    normalizeStat(eraColectivaB, 'low', LEAGUE_AVGS.ERA) * 0.25 +
    normalizeStat(teamB.pitcheo.whip, 'low', LEAGUE_AVGS.WHIP) * 0.25 +
    normalizeStat(teamB.pitcheo.hr, 'low', LEAGUE_AVGS.HR_PIT) * 0.10 +
    normalizeStat(teamB.pitcheo.bb, 'low', LEAGUE_AVGS.BB_PIT) * 0.10 +
    normalizeStat(teamB.pitcheo.so, 'high', LEAGUE_AVGS.SO_PIT) * 0.15 +
    normalizeStat(teamB.pitcheo.avg, 'low', LEAGUE_AVGS.AVG_CONTRA) * 0.15
  );

  // 5. Fuerza General calculada en base a las ponderaciones del usuario
  const wSum = weights.abridor + weights.bateo + weights.pitcheo + weights.localia;
  const pAbridor = weights.abridor / wSum;
  const pBateo = weights.bateo / wSum;
  const pPitcheo = weights.pitcheo / wSum;
  const pLocalia = weights.localia / wSum;

  const localAdvantage = 1.08; // 8% de ventaja por localía (Team A)

  const fuerzaA = (
    ratingAbridorA * pAbridor +
    ratingOfensivoA * pBateo +
    ratingPitcheoColectivoA * pPitcheo +
    localAdvantage * pLocalia
  );

  const fuerzaB = (
    ratingAbridorB * pAbridor +
    ratingOfensivoB * pBateo +
    ratingPitcheoColectivoB * pPitcheo +
    1.0 * pLocalia
  );

  // 6. Porcentaje de victoria usando la derivación Log-5
  const probA = (fuerzaA / (fuerzaA + fuerzaB)) * 100;
  const probB = 100 - probA;

  // 7. Estimación de Carreras (Over/Under)
  // Basado en el promedio anotado colectivo y la efectividad del pitcheo rival
  const rPG_A = (teamA.bateo.r / (teamA.bateo.g || 70)) || 5.0;
  const rPG_B = (teamB.bateo.r / (teamB.bateo.g || 70)) || 5.0;

  const eraRivalA = (teamB.abridor.era * 0.5) + (eraColectivaB * 0.5);
  const eraRivalB = (teamA.abridor.era * 0.5) + (eraColectivaA * 0.5);

  const rawCarrerasEstA = rPG_A * (eraRivalA / LEAGUE_AVGS.ERA);
  const rawCarrerasEstB = rPG_B * (eraRivalB / LEAGUE_AVGS.ERA);
  const carrerasTotalesEstimadas = parseFloat((rawCarrerasEstA + rawCarrerasEstB).toFixed(1));

  // Distribuir el total de carreras estimadas en proporción a la probabilidad de victoria
  // Esto evita la contradicción de proyectar más carreras al equipo que el modelo da como perdedor
  const carrerasEstA = parseFloat((carrerasTotalesEstimadas * (probA / 100)).toFixed(1));
  const carrerasEstB = parseFloat((carrerasTotalesEstimadas * (probB / 100)).toFixed(1));

  // 8. Determinar recomendaciones de apuestas
  let equipoRecomendado = probA > probB ? teamA.nombre : teamB.nombre;
  let porcentajeRecomendado = Math.max(probA, probB);
  let confianza = 'Baja';

  if (porcentajeRecomendado >= 62) {
    confianza = 'Alta';
  } else if (porcentajeRecomendado >= 55) {
    confianza = 'Media';
  }

  const runDiff = Math.abs(carrerasEstA - carrerasEstB);
  let runLineRecomendado = '';
  
  if (probA > probB) {
    if (runDiff >= 1.5) {
      runLineRecomendado = `${teamA.nombre} -1.5`;
    } else {
      runLineRecomendado = `${teamB.nombre} +1.5`;
    }
  } else {
    if (runDiff >= 1.5) {
      runLineRecomendado = `${teamB.nombre} -1.5`;
    } else {
      runLineRecomendado = `${teamA.nombre} +1.5`;
    }
  }

  // Generar justificación sabermétrica
  const ventajasA = [];
  const ventajasB = [];

  // 1. Análisis del Abridor
  const abrNameA = teamA.abridor.nombre || 'Abridor Local';
  const abrNameB = teamB.abridor.nombre || 'Abridor Visitante';
  if (ratingAbridorA > ratingAbridorB) {
    const diffFIP = Math.abs(abridorB_FIP - abridorA_FIP).toFixed(2);
    ventajasA.push(`<strong>Ventaja en la Loma:</strong> ${abrNameA} supera en proyección sabermétrica a ${abrNameB} (FIP proyectado de ${abridorA_FIP.toFixed(2)} vs ${abridorB_FIP.toFixed(2)}, una diferencia de ${diffFIP} a favor del local).`);
  } else if (ratingAbridorB > ratingAbridorA) {
    const diffFIP = Math.abs(abridorA_FIP - abridorB_FIP).toFixed(2);
    ventajasB.push(`<strong>Ventaja en la Loma:</strong> ${abrNameB} supera en proyección sabermétrica a ${abrNameA} (FIP proyectado de ${abridorB_FIP.toFixed(2)} vs ${abridorA_FIP.toFixed(2)}, una diferencia de ${diffFIP} a favor del visitante).`);
  }

  // 2. Análisis del Bateo
  if (teamA.bateo.ops > teamB.bateo.ops) {
    ventajasA.push(`<strong>Poder al Bate:</strong> Ofensiva local más sólida con un OPS colectivo de .${Math.round(teamA.bateo.ops*1000)} (AVG .${Math.round(teamA.bateo.avg*1000).toString().padStart(3, '0')}, ${teamA.bateo.hr} HR) frente al OPS de .${Math.round(teamB.bateo.ops*1000)} de la visita.`);
  } else if (teamB.bateo.ops > teamA.bateo.ops) {
    ventajasB.push(`<strong>Poder al Bate:</strong> Ofensiva visitante más sólida con un OPS colectivo de .${Math.round(teamB.bateo.ops*1000)} (AVG .${Math.round(teamB.bateo.avg*1000).toString().padStart(3, '0')}, ${teamB.bateo.hr} HR) frente al OPS de .${Math.round(teamA.bateo.ops*1000)} del local.`);
  }

  // 3. Análisis de Pitcheo Colectivo
  if (teamA.pitcheo.era < teamB.pitcheo.era) {
    ventajasA.push(`<strong>Consistencia del Pitcheo:</strong> El pitcheo y relevo de ${teamA.nombre} tiene mejor efectividad colectiva (ERA de ${teamA.pitcheo.era.toFixed(2)} y WHIP ${teamA.pitcheo.whip.toFixed(2)}) comparado con la ERA de ${teamB.pitcheo.era.toFixed(2)} de ${teamB.nombre}.`);
  } else if (teamB.pitcheo.era < teamA.pitcheo.era) {
    ventajasB.push(`<strong>Consistencia del Pitcheo:</strong> El pitcheo y relevo de ${teamB.nombre} tiene mejor efectividad colectiva (ERA de ${teamB.pitcheo.era.toFixed(2)} y WHIP ${teamB.pitcheo.whip.toFixed(2)}) comparado con la ERA de ${teamA.pitcheo.era.toFixed(2)} de ${teamA.nombre}.`);
  }

  // 4. Relación Ponches/Bases por bola (SO/BB)
  const ratioA = teamA.pitcheo.so / (teamA.pitcheo.bb || 1);
  const ratioB = teamB.pitcheo.so / (teamB.pitcheo.bb || 1);
  if (ratioA > ratioB) {
    ventajasA.push(`<strong>Control en Pitcheo:</strong> Mejor relación Ponches/Bases por Bola colectiva (${ratioA.toFixed(1)} SO/BB vs ${ratioB.toFixed(1)} SO/BB) que reduce los corredores gratis en las bases.`);
  } else if (ratioB > ratioA) {
    ventajasB.push(`<strong>Control en Pitcheo:</strong> Mejor relación Ponches/Bases por Bola colectiva (${ratioB.toFixed(1)} SO/BB vs ${ratioA.toFixed(1)} SO/BB) que reduce los corredores gratis en las bases.`);
  }

  // 5. Desgaste de Bullpen (Advertencias en el Análisis)
  if (fatigueA > 7) {
    ventajasB.push(`<strong>Desgaste de Bullpen Local:</strong> El relevo de ${teamA.nombre} llega con cansancio acumulado (Índice de Fatiga: ${fatigueA}), lo que puede comprometer el cierre del partido.`);
  }
  if (fatigueB > 7) {
    ventajasA.push(`<strong>Desgaste de Bullpen Visitante:</strong> El relevo de ${teamB.nombre} llega con cansancio acumulado (Índice de Fatiga: ${fatigueB}), lo que puede comprometer el cierre del partido.`);
  }

  const ventajasGanador = probA > probB ? ventajasA : ventajasB;
  
  let justificacionHTML = `
    <div class="justification-header" style="font-weight: 700; color: var(--primary-neon); margin-bottom: 0.5rem; font-size: 0.9rem;">
      Proyección: ${equipoRecomendado} a ganar (${Math.max(probA, probB).toFixed(1)}% de probabilidad)
    </div>
    <p style="margin-bottom: 0.6rem;">El modelo sabermétrico proyecta un marcador estimado de <strong>${carrerasEstA.toFixed(1)}</strong> carreras para el equipo Local y <strong>${carrerasEstB.toFixed(1)}</strong> carreras para el Visitante (Total proyectado: <strong>${carrerasTotalesEstimadas}</strong> carreras).</p>
  `;

  if (ventajasGanador.length > 0) {
    justificacionHTML += `
      <div style="margin-top: 0.6rem;">
        <span style="color: var(--info-neon); font-weight: 700; text-transform: uppercase; font-size: 0.75rem;">Factores Clave del Modelo:</span>
        <ul style="margin: 0.3rem 0 0 1rem; padding: 0 0 0 0.5rem; list-style-type: square; line-height: 1.5; font-size: 0.8rem;">
          <li style="margin-bottom: 0.4rem;">` + ventajasGanador.join('</li><li style="margin-bottom: 0.4rem;">') + `</li>
        </ul>
      </div>
    `;
  } else {
    justificacionHTML += `<p>Encuentro sumamente balanceado. La recomendación de victoria para ${equipoRecomendado} se sostiene principalmente en factores de localía y consistencia ofensiva general.</p>`;
  }

  const pickML = probA > probB ? teamA.short || teamA.nombre : teamB.short || teamB.nombre;
  justificacionHTML += `
    <div style="margin-top: 0.8rem; border-top: 1px dashed rgba(255,255,255,0.06); padding-top: 0.5rem; font-size: 0.75rem; color: var(--text-muted);">
      <strong>Recomendación:</strong> Apuesta directa a ganar (Moneyline) por <strong>${pickML}</strong>. 
      La proyección de diferencia es de ${runDiff.toFixed(1)} carreras, inclinando el Run Line a ${runLineRecomendado}.
    </div>
  `;

  return {
    probA: parseFloat(probA.toFixed(1)),
    probB: parseFloat(probB.toFixed(1)),
    carrerasEstA: parseFloat(carrerasEstA.toFixed(1)),
    carrerasEstB: parseFloat(carrerasEstB.toFixed(1)),
    carrerasTotales: carrerasTotalesEstimadas,
    moneyline: {
      recomendacion: equipoRecomendado,
      probabilidad: parseFloat(porcentajeRecomendado.toFixed(1)),
      confianza: confianza
    },
    runLine: {
      recomendacion: runLineRecomendado,
      diferenciaEsperada: parseFloat(runDiff.toFixed(2))
    },
    fipA: abridorA_FIP,
    fipB: abridorB_FIP,
    justificacion: justificacionHTML
  };
}

// Exportar funciones si se corre en Node.js, si no agregarlas al scope global del navegador
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateFIP,
    analyzeMatchup,
    LEAGUE_AVGS
  };
} else {
  window.predictor = {
    calculateFIP,
    analyzeMatchup,
    LEAGUE_AVGS
  };
}

