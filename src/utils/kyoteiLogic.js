import { lenormandCards, tarotCards } from "../data/cards";
import { DEFAULT_AI_SCORE, DEFAULT_SUGGESTION, readingHints } from "../data/constants";

export function createEmptyBoats() {
  return Array.from({ length: 6 }, (_, i) => ({ lane: i + 1, card: "" }));
}

export function getLenormand(cardName) {
  return lenormandCards.find((c) => c.name === cardName) || null;
}

export function normalizeTarotName(cardName) {
  return cardName.endsWith("_R") ? cardName.replace(/_R$/, "") : cardName;
}

export function isReversedTarot(cardName) {
  return cardName.endsWith("_R");
}

export function getTarot(cardName) {
  if (!cardName) return null;
  const reversed = cardName.endsWith("_R");
  const baseName = normalizeTarotName(cardName);
  const base = tarotCards.find((c) => c.name === baseName);
  if (!base) return null;

  return {
    ...base,
    rawName: base.name,
    name: reversed ? `${base.name}（逆）` : `${base.name}（正）`,
    meaning: reversed ? `逆位置: ${base.meaning}` : base.meaning,
  };
}

export function getTarotStatKey(cardName) {
  const tarot = getTarot(cardName);
  return tarot ? `${tarot.id}. ${tarot.name}` : cardName || "未設定";
}

export function cardRankScore(name) {
  const strong = ["太陽", "鍵", "熊", "星", "騎士", "指輪"];
  const middle = ["花束", "犬", "百合", "家", "魚", "コウノトリ", "ハート", "木"];
  const risky = ["雲", "蛇", "山", "ねずみ", "棺", "十字架", "鳥"];
  if (strong.includes(name)) return 3;
  if (middle.includes(name)) return 2;
  if (risky.includes(name)) return 0;
  return 1;
}

export function getTarotLaneBonus(tarot, lane) {
  const reversed = isReversedTarot(tarot);
  const tarotBaseName = normalizeTarotName(tarot || "");

  const uprightBonusMap = {
    太陽: { 1: 2, 2: 1 },
    正義: { 1: 2, 2: 1 },
    皇帝: { 1: 2, 3: 1 },
    戦車: { 3: 1, 4: 2, 5: 1 },
    運命の輪: { 2: 1, 3: 1, 4: 1 },
    塔: { 4: 1, 5: 1, 6: 2 },
    悪魔: { 4: 1, 5: 1, 6: 1 },
    死神: { 3: 1, 4: 1, 5: 1 },
    星: { 3: 1, 4: 2 },
    月: { 2: 1, 5: 1, 6: 1 },
    世界: { 1: 2, 2: 1, 3: 1 },
    恋人: { 2: 1, 3: 1, 4: 1 },
    女教皇: { 1: 1, 2: 1 },
    吊るされた男: { 2: 1, 3: 1, 5: 1 },
    隠者: { 1: 1, 2: 1, 3: 1 },
    力: { 1: 1, 2: 1, 3: 1 },
    魔術師: { 1: 1, 3: 1, 4: 1 },
    愚者: { 4: 1, 5: 1, 6: 1 },
    審判: { 2: 1, 3: 1, 5: 1 },
  };

  const reversedBonusMap = {
    太陽: { 3: 1, 4: 1, 5: 2 },
    正義: { 3: 1, 4: 1, 5: 1 },
    皇帝: { 4: 1, 5: 1, 6: 1 },
    戦車: { 1: 1, 2: 1, 5: 1 },
    運命の輪: { 1: 1, 5: 1, 6: 1 },
    塔: { 3: 1, 4: 1, 5: 1 },
    悪魔: { 2: 1, 3: 1, 4: 1 },
    死神: { 1: 1, 2: 1, 4: 1 },
    星: { 1: 1, 2: 1, 5: 1 },
    月: { 3: 1, 4: 1, 6: 1 },
    世界: { 2: 1, 4: 1, 5: 1 },
    恋人: { 1: 1, 5: 1, 6: 1 },
    女教皇: { 3: 1, 4: 1, 5: 1 },
    吊るされた男: { 4: 1, 5: 1, 6: 1 },
    隠者: { 4: 1, 5: 1 },
    力: { 4: 1, 5: 1, 6: 1 },
    魔術師: { 2: 1, 5: 1, 6: 1 },
    愚者: { 2: 1, 3: 1, 4: 1 },
    審判: { 1: 1, 4: 1, 6: 1 },
  };

  const penaltyMap = {
    太陽: { 1: -1, 2: -1 },
    正義: { 1: -1, 2: -1 },
    皇帝: { 1: -1, 3: -1 },
    戦車: { 3: -1, 4: -1 },
    運命の輪: { 2: -1, 3: -1 },
    塔: { 6: -1 },
    悪魔: { 5: -1, 6: -1 },
    死神: { 3: -1 },
    星: { 4: -1 },
    月: { 2: -1 },
    世界: { 1: -1, 2: -1 },
    恋人: { 2: -1, 3: -1 },
    女教皇: { 1: -1 },
    吊るされた男: { 2: -1, 3: -1 },
    隠者: { 1: -1, 2: -1 },
    力: { 1: -1, 2: -1 },
    魔術師: { 1: -1, 4: -1 },
    愚者: { 6: -1 },
    審判: { 2: -1, 5: -1 },
  };

  if (!reversed) {
    return uprightBonusMap[tarotBaseName]?.[lane] ?? 0;
  }

  return (reversedBonusMap[tarotBaseName]?.[lane] ?? 0) + (penaltyMap[tarotBaseName]?.[lane] ?? 0);
}

export function getTarotConfidenceAdjustment(tarot) {
  const reversed = isReversedTarot(tarot);
  const tarotBaseName = normalizeTarotName(tarot || "");

  const uprightMap = {
    太陽: 8, 正義: 7, 皇帝: 6, 世界: 8, 女教皇: 4, 隠者: 3, 力: 4,
    魔術師: 3, 恋人: 2, 審判: 2, 星: 3, 運命の輪: 1, 戦車: 1,
    吊るされた男: -2, 月: -4, 死神: -5, 悪魔: -6, 塔: -8, 愚者: -5,
  };

  const reversedMap = {
    太陽: -8, 正義: -7, 皇帝: -6, 世界: -7, 女教皇: -5, 隠者: -4, 力: -5,
    魔術師: -4, 恋人: -5, 審判: -4, 星: -5, 運命の輪: -6, 戦車: -6,
    吊るされた男: -4, 月: -7, 死神: -6, 悪魔: -7, 塔: -9, 愚者: -7,
  };

  return reversed ? (reversedMap[tarotBaseName] ?? -3) : (uprightMap[tarotBaseName] ?? 0);
}

export function buildBaseSuggestion(tarot, boats) {
  if (!Array.isArray(boats) || boats.length === 0) return DEFAULT_SUGGESTION;

  const tarotBaseName = normalizeTarotName(tarot || "");
  const tarotHintKey = tarot || tarotBaseName;

  const scored = boats
    .filter((b) => b.card)
    .map((b) => ({
      ...b,
      score: cardRankScore(b.card) + getTarotLaneBonus(tarot, b.lane),
    }))
    .sort((a, b) => (b.score - a.score) || (a.lane - b.lane));

  if (scored.length === 0) {
    return {
      ...DEFAULT_SUGGESTION,
      style: readingHints[tarotHintKey] || readingHints[tarotBaseName] || DEFAULT_SUGGESTION.style,
    };
  }

  return {
    axis: scored[0]?.lane ?? "-",
    rival: scored[1]?.lane ?? "-",
    hole: scored[2]?.lane ?? scored[scored.length - 1]?.lane ?? "-",
    style: readingHints[tarotHintKey] || readingHints[tarotBaseName] || DEFAULT_SUGGESTION.style,
    rankedLanes: scored.map((b) => b.lane),
  };
}

export function buildLearningModel(saved) {
  const tarotLane = new Map();
  const lenormandLane = new Map();
  const pairLane = new Map();

  saved.forEach((item) => {
    const tarotKey = getTarotStatKey(item.tarot);

    item.boats.forEach((boat) => {
      const resultLanes = [item.result.first, item.result.second, item.result.third];
      const isTop3 = resultLanes.includes(String(boat.lane));
      const isFirst = item.result.first === String(boat.lane);

      const tarotKeyLane = `${tarotKey}::${boat.lane}`;
      const tarotRow = tarotLane.get(tarotKeyLane) ?? { total: 0, top3: 0, first: 0 };
      tarotRow.total += 1;
      if (isTop3) tarotRow.top3 += 1;
      if (isFirst) tarotRow.first += 1;
      tarotLane.set(tarotKeyLane, tarotRow);

      if (boat.card) {
        const lenoKeyLane = `${boat.card}::${boat.lane}`;
        const lenoRow = lenormandLane.get(lenoKeyLane) ?? { total: 0, top3: 0, first: 0 };
        lenoRow.total += 1;
        if (isTop3) lenoRow.top3 += 1;
        if (isFirst) lenoRow.first += 1;
        lenormandLane.set(lenoKeyLane, lenoRow);

        const pairKeyLane = `${tarotKey}::${boat.card}::${boat.lane}`;
        const pairRow = pairLane.get(pairKeyLane) ?? { total: 0, top3: 0, first: 0 };
        pairRow.total += 1;
        if (isTop3) pairRow.top3 += 1;
        if (isFirst) pairRow.first += 1;
        pairLane.set(pairKeyLane, pairRow);
      }
    });
  });

  return { tarotLane, lenormandLane, pairLane };
}

export function getLearnedLaneBoosts(tarot, boats, saved) {
  const model = buildLearningModel(saved);
  const tarotKey = getTarotStatKey(tarot);

  return boats.map((boat) => {
    let boost = 0;
    const tarotRow = model.tarotLane.get(`${tarotKey}::${boat.lane}`);
    if (tarotRow && tarotRow.total >= 3) {
      boost += Math.round(((tarotRow.top3 / tarotRow.total) * 100 - 45) / 12);
      boost += Math.round((tarotRow.first / tarotRow.total) * 2);
    }

    if (boat.card) {
      const lenoRow = model.lenormandLane.get(`${boat.card}::${boat.lane}`);
      if (lenoRow && lenoRow.total >= 3) {
        boost += Math.round(((lenoRow.top3 / lenoRow.total) * 100 - 45) / 14);
        boost += Math.round((lenoRow.first / lenoRow.total) * 2);
      }

      const pairRow = model.pairLane.get(`${tarotKey}::${boat.card}::${boat.lane}`);
      if (pairRow && pairRow.total >= 2) {
        boost += Math.round(((pairRow.top3 / pairRow.total) * 100 - 50) / 10);
        boost += Math.round((pairRow.first / pairRow.total) * 3);
      }
    }

    return { lane: boat.lane, value: Math.max(-2, Math.min(6, boost)) };
  });
}

export function buildAISuggestion(tarot, boats, saved) {
  const base = buildBaseSuggestion(tarot, boats);
  if (!Array.isArray(boats) || boats.length === 0) return { ...base, aiScore: DEFAULT_AI_SCORE };

  const learnedBoosts = getLearnedLaneBoosts(tarot, boats, saved);
  const boostMap = new Map(learnedBoosts.map((b) => [b.lane, b.value]));

  const ranked = boats
    .filter((b) => b.card)
    .map((b) => ({
      lane: b.lane,
      score: cardRankScore(b.card) + getTarotLaneBonus(tarot, b.lane) + (boostMap.get(b.lane) ?? 0),
    }))
    .sort((a, b) => (b.score - a.score) || (a.lane - b.lane));

  const predictedOrder = ranked.slice(0, 3).map((r) => r.lane);
  const positiveBoostTotal = learnedBoosts.reduce((sum, b) => sum + Math.max(0, b.value), 0);
  const negativeBoostTotal = learnedBoosts.reduce((sum, b) => sum + Math.abs(Math.min(0, b.value)), 0);
  const tarotConfidenceAdj = getTarotConfidenceAdjustment(tarot);

  const topScore = ranked[0]?.score ?? 0;
  const secondScore = ranked[1]?.score ?? 0;
  const thirdScore = ranked[2]?.score ?? 0;
  const gap12 = topScore - secondScore;
  const gap23 = secondScore - thirdScore;

  let balancePenalty = 0;
  if (gap12 <= 0) balancePenalty += 8;
  else if (gap12 === 1) balancePenalty += 5;
  else if (gap12 === 2) balancePenalty += 2;

  if (gap23 <= 0) balancePenalty += 6;
  else if (gap23 === 1) balancePenalty += 4;
  else if (gap23 === 2) balancePenalty += 2;

  const enteredBoatCount = boats.filter((b) => b.card).length;
  const inputPenalty =
    enteredBoatCount >= 6 ? 0 :
    enteredBoatCount === 5 ? 4 :
    enteredBoatCount === 4 ? 8 :
    enteredBoatCount === 3 ? 14 : 20;

  const rawConfidence = 52 + positiveBoostTotal * 4 - negativeBoostTotal * 3 + tarotConfidenceAdj - balancePenalty - inputPenalty;
  const confidence = Math.max(22, Math.min(96, rawConfidence));

  return {
    ...base,
    axis: predictedOrder[0] ?? base.axis,
    rival: predictedOrder[1] ?? base.rival,
    hole: predictedOrder[2] ?? base.hole,
    rankedLanes: ranked.length > 0 ? ranked.map((r) => r.lane) : base.rankedLanes,
    aiScore: { predictedOrder, confidence, learnedBoosts },
  };
}

export function buildAutoBetMemo(tarot, suggestion) {
  const s = suggestion ?? DEFAULT_SUGGESTION;
  const axis = typeof s.axis === "number" ? s.axis : null;
  const rival = typeof s.rival === "number" ? s.rival : null;
  const ranked = s.rankedLanes ?? [];
  const tarotBaseName = normalizeTarotName(tarot || "");
  const reversed = isReversedTarot(tarot);

  if (!axis || !rival) return ["カード入力後に買い目メモ候補を表示します。"];

  const rest = ranked.filter((lane) => lane !== axis && lane !== rival);
  const third = rest[0] ?? axis;
  const fourth = rest[1] ?? rival;
  const fifth = rest[2] ?? third;
  const sixth = rest[3] ?? fifth;
  const holeLane = typeof s.hole === "number" ? s.hole : fourth;

  if (!reversed) {
    if (["太陽", "正義", "皇帝", "世界"].includes(tarotBaseName)) {
      return [`本線: ${axis}-${rival}-${third}`, `押さえ: ${axis}-${third}-${rival}`, `2連軸: ${axis}-${rival}`];
    }
    if (["戦車", "星", "運命の輪", "魔術師", "力"].includes(tarotBaseName)) {
      return [`本線: ${axis}-${rival}-${third}`, `折返し: ${rival}-${axis}-${third}`, `穴目: ${axis}-${fourth}-${rival}`];
    }
    if (["塔", "悪魔", "死神", "月", "愚者"].includes(tarotBaseName)) {
      return [`波乱本線: ${holeLane}-${axis}-${rival}`, `波乱押さえ: ${axis}-${holeLane}-${fourth}`, `大穴: ${fourth}-${holeLane}-${fifth}`];
    }
    return [`本線: ${axis}-${rival}-${third}`, `押さえ: ${axis}-${rival}-${fourth}`, `裏目: ${rival}-${axis}-${third}`];
  }

  return [
    `本線: ${axis}-${rival}-${third}`,
    `押さえ: ${axis}-${fourth}-${rival}`,
    `穴目: ${rival}-${axis}-${fourth}`,
    `大穴: ${holeLane}-${fourth}-${fifth}`,
    `超穴: ${fifth}-${holeLane}-${sixth}`,
  ];
}

export function hasDuplicateResults(result) {
  const picked = [result.first, result.second, result.third].filter(Boolean);
  return new Set(picked).size !== picked.length;
}

export function parsePayout(value) {
  const normalized = value.replace(/[,円\s]/g, "");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : 0;
}

export function isManShu(value) {
  return parsePayout(value) >= 10000;
}

export function buildRaceInsights(tarot, suggestion, boats, saved, confidence) {
  const enteredBoats = boats.filter((boat) => boat.card);
  const ranked = suggestion.rankedLanes;
  const reversed = isReversedTarot(tarot);
  const tarotBaseName = normalizeTarotName(tarot || "");
  const riskyCards = enteredBoats.filter((boat) => ["雲", "蛇", "棺", "鳥", "十字架", "ねずみ", "山"].includes(boat.card)).length;
  const strongCards = enteredBoats.filter((boat) => ["太陽", "鍵", "星", "熊", "指輪", "花束"].includes(boat.card)).length;
  const outerAttack = ranked.filter((lane) => lane >= 4).slice(0, 3).length;
  const learningPositive =
    saved.length === 0
      ? 0
      : saved.reduce((sum, item) => sum + item.aiScore.learnedBoosts.filter((b) => b.value > 0).length, 0) /
        Math.max(saved.length, 1);

  let volatilityScore = 42;
  volatilityScore += reversed ? 10 : 0;
  volatilityScore += riskyCards * 7;
  volatilityScore += outerAttack >= 2 ? 10 : outerAttack === 1 ? 4 : 0;
  volatilityScore += confidence >= 75 ? -12 : confidence >= 60 ? -5 : confidence <= 40 ? 10 : 4;
  volatilityScore += ["塔", "悪魔", "死神", "月", "愚者"].includes(tarotBaseName) ? 12 : 0;
  volatilityScore += ["太陽", "正義", "皇帝", "世界"].includes(tarotBaseName) ? -10 : 0;
  volatilityScore += strongCards >= 3 ? -6 : 0;
  volatilityScore = Math.max(8, Math.min(95, Math.round(volatilityScore)));

  const volatilityLabel = volatilityScore >= 72 ? "大荒れ" : volatilityScore >= 48 ? "中荒れ" : "堅め";

  let manshuProbability = Math.round(
    volatilityScore * 0.72 + riskyCards * 4 + (reversed ? 6 : 0) + learningPositive * 2 - (confidence >= 70 ? 8 : 0)
  );
  manshuProbability = Math.max(6, Math.min(92, manshuProbability));

  return {
    volatilityScore,
    volatilityLabel,
    manshuProbability,
    manshuLabel: manshuProbability >= 66 ? "万舟警戒" : manshuProbability >= 45 ? "万舟注意" : "万舟薄め",
  };
}
