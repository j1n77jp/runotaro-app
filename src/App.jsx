import { useEffect, useMemo, useState } from "react";

const lenormandCards = [
  { id: 1, name: "騎士", meaning: "動き出し・先行・攻め気配", theme: "gold" },
  { id: 2, name: "クローバー", meaning: "展開利・軽快・ツキ", theme: "emerald" },
  { id: 3, name: "船", meaning: "流れ・水面適性・乗れている", theme: "blue" },
  { id: 4, name: "家", meaning: "安定・地元感・堅実", theme: "stone" },
  { id: 5, name: "木", meaning: "持久力・じわ伸び・維持", theme: "green" },
  { id: 6, name: "雲", meaning: "不透明・迷い・判断難", theme: "slate" },
  { id: 7, name: "蛇", meaning: "ひねり・伏兵・曲者", theme: "violet" },
  { id: 8, name: "棺", meaning: "失速・終息・厳しい", theme: "zinc" },
  { id: 9, name: "花束", meaning: "好感触・魅力・恵まれ", theme: "pink" },
  { id: 10, name: "鎌", meaning: "一撃・スタート勝負・急変", theme: "orange" },
  { id: 11, name: "鞭", meaning: "競り合い・叩き合い・消耗", theme: "red" },
  { id: 12, name: "鳥", meaning: "ざわつき・不安・波乱気配", theme: "amber" },
  { id: 13, name: "子ども", meaning: "新鮮さ・未知数・軽さ", theme: "sky" },
  { id: 14, name: "狐", meaning: "策・狙い撃ち・器用", theme: "orange" },
  { id: 15, name: "熊", meaning: "パワー・押し・重厚", theme: "amber" },
  { id: 16, name: "星", meaning: "期待・伸び・理想的", theme: "indigo" },
  { id: 17, name: "コウノトリ", meaning: "改善・上向き・変化", theme: "cyan" },
  { id: 18, name: "犬", meaning: "信頼・堅実・相手向き", theme: "blue" },
  { id: 19, name: "塔", meaning: "孤高・冷静・単騎感", theme: "slate" },
  { id: 21, name: "山", meaning: "壁・重い・届きにくい", theme: "stone" },
  { id: 22, name: "道", meaning: "選択・分岐・コース鍵", theme: "teal" },
  { id: 23, name: "ねずみ", meaning: "削られ・気配落ち・不安", theme: "neutral" },
  { id: 24, name: "ハート", meaning: "気持ち・ノリ・勢い", theme: "rose" },
  { id: 25, name: "指輪", meaning: "本線・連携・固定感", theme: "yellow" },
  { id: 30, name: "百合", meaning: "老練・落ち着き・ベテラン", theme: "fuchsia" },
  { id: 31, name: "太陽", meaning: "勝ち切る・主役・好調", theme: "sun" },
  { id: 32, name: "月", meaning: "評価・感覚・波に乗る", theme: "moon" },
  { id: 33, name: "鍵", meaning: "決め手・重要カード・突破", theme: "gold" },
  { id: 34, name: "魚", meaning: "水面相性・流動・妙味", theme: "ocean" },
  { id: 35, name: "錨", meaning: "残す・粘る・連下向き", theme: "navy" },
  { id: 36, name: "十字架", meaning: "重圧・試練・人気の罠", theme: "wine" },
];

const tarotCards = [
  { id: 0, name: "愚者", meaning: "未知・人気薄・思い切った展開" },
  { id: 1, name: "魔術師", meaning: "技術・仕掛け・主導権" },
  { id: 2, name: "女教皇", meaning: "静観・読み・冷静な流れ" },
  { id: 3, name: "皇帝", meaning: "支配・王道・格上優勢" },
  { id: 6, name: "恋人", meaning: "選択・並び・相手関係が鍵" },
  { id: 7, name: "戦車", meaning: "突破・攻め・前に出る展開" },
  { id: 8, name: "力", meaning: "押し切り・機力・我慢比べ" },
  { id: 9, name: "隠者", meaning: "慎重・様子見・内省的" },
  { id: 10, name: "運命の輪", meaning: "流れ・ツキ・展開向く" },
  { id: 11, name: "正義", meaning: "順当・妥当・本線寄り" },
  { id: 12, name: "吊るされた男", meaning: "停滞・差し遅れ・我慢" },
  { id: 13, name: "死神", meaning: "崩れ・切替・人気飛び" },
  { id: 15, name: "悪魔", meaning: "荒れ・過信・波乱" },
  { id: 16, name: "塔", meaning: "事故・崩壊・大荒れ" },
  { id: 17, name: "星", meaning: "期待・伸び・注目株" },
  { id: 18, name: "月", meaning: "ムラ・感覚・読み難さ" },
  { id: 19, name: "太陽", meaning: "勝利・抜けた本命・明快" },
  { id: 20, name: "審判", meaning: "巻き返し・再評価・復活" },
  { id: 21, name: "世界", meaning: "完成・収まり・きれいな決着" },
];

const venues = [
  "桐生", "戸田", "江戸川", "平和島", "多摩川", "浜名湖", "蒲郡", "常滑", "津", "三国",
  "びわこ", "住之江", "尼崎", "鳴門", "丸亀", "児島", "宮島", "徳山", "下関", "若松",
  "芦屋", "福岡", "唐津", "大村",
];

const raceNumbers = Array.from({ length: 12 }, (_, i) => String(i + 1));
const resultBoatNumbers = Array.from({ length: 6 }, (_, i) => String(i + 1));
const INITIAL_MEMO = `展開：
軸：
相手：
穴：`;

const DEFAULT_SUGGESTION = {
  axis: "-",
  rival: "-",
  hole: "-",
  style: "展開カードの意味と各艇カードの強弱を合わせて判断。",
  rankedLanes: [],
};

const DEFAULT_AI_SCORE = {
  predictedOrder: [],
  confidence: 35,
  learnedBoosts: [],
};

const readingHints = {
  太陽: "本命寄り。素直な決着を意識。",
  太陽_R: "本命の取りこぼし注意。人気でも過信禁物。",
  塔: "事故や崩れを含む大荒れ注意。",
  塔_R: "崩壊までは行かず混戦気味。穴は絡むが全壊級までは弱め。",
  悪魔: "欲張り禁物。穴を混ぜても絞る。",
  悪魔_R: "過剰な荒れ期待は禁物。波乱含みでも収束気味。",
  正義: "順当。本線重視でOK。",
  正義_R: "順当感が崩れやすい。人気サイドでもズレ注意。",
  運命の輪: "展開利がそのまま結果に出やすい。",
  運命の輪_R: "流れが噛み合いにくい。ツキ頼みは危険。",
  戦車: "攻める艇、まくり気配に注目。",
  戦車_R: "攻め遅れ・空回り注意。仕掛け不発も。",
  死神: "人気艇の飛びや入れ替わり注意。",
  死神_R: "総崩れまでは行かず、一部立て直しあり。",
  世界: "きれいに収まる形。本線〜準本線向き。",
  世界_R: "完成し切らず、どこか1艇ズレる形に注意。",
  皇帝: "イン・格上・主導権を取りやすい。",
  皇帝_R: "主導権が揺らぐ。内有利でも絶対視は禁物。",
  月: "ムラ・感覚・読み難さあり。",
  月_R: "読み違いは減るが、不気味さが残る混戦。",
  星: "期待感あり。伸びや上向きの艇に注目。",
  星_R: "期待先行で過信注意。評価倒れの可能性。",
  恋人: "並び・相手関係が鍵。組み合わせ重視。",
  恋人_R: "連携不発や相手ズレに注意。",
  女教皇: "静かな流れ。冷静に本線を読む。",
  女教皇_R: "読みづらさが増す。様子見の流れからズレやすい。",
  吊るされた男: "停滞・差し遅れ・我慢の流れ。",
  吊るされた男_R: "停滞がほどけて一気に入れ替わる余地あり。",
  隠者: "慎重。絞って狙う流れ。",
  隠者_R: "慎重すぎて読み負けしやすい。相手ズレ注意。",
  力: "押し切り・機力・粘り強さ。",
  力_R: "押し切れず甘さが出る。残し切れない場面も。",
  魔術師: "技術・仕掛け・主導権。",
  魔術師_R: "器用さ不発。仕掛けが空回る恐れ。",
  愚者: "未知・人気薄・思い切った展開。",
  愚者_R: "無茶な狙いは危険。荒れ期待の空振り注意。",
  審判: "巻き返し・再評価・復活。",
  審判_R: "巻き返し不発。見直した艇が届かない恐れ。",
};

function createEmptyBoats() {
  return Array.from({ length: 6 }, (_, i) => ({ lane: i + 1, card: "" }));
}

function getLenormand(cardName) {
  return lenormandCards.find((c) => c.name === cardName) || null;
}

function normalizeTarotName(cardName) {
  return cardName.endsWith("_R") ? cardName.replace(/_R$/, "") : cardName;
}

function isReversedTarot(cardName) {
  return cardName.endsWith("_R");
}

function getTarot(cardName) {
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

function getTarotStatKey(cardName) {
  const tarot = getTarot(cardName);
  return tarot ? `${tarot.id}. ${tarot.name}` : cardName || "未設定";
}

function cardRankScore(name) {
  const strong = ["太陽", "鍵", "熊", "星", "騎士", "指輪"];
  const middle = ["花束", "犬", "百合", "家", "魚", "コウノトリ", "ハート", "木"];
  const risky = ["雲", "蛇", "山", "ねずみ", "棺", "十字架", "鳥"];
  if (strong.includes(name)) return 3;
  if (middle.includes(name)) return 2;
  if (risky.includes(name)) return 0;
  return 1;
}

function getTarotLaneBonus(tarot, lane) {
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

function getTarotConfidenceAdjustment(tarot) {
  const reversed = isReversedTarot(tarot);
  const tarotBaseName = normalizeTarotName(tarot || "");

  const uprightMap = {
    太陽: 8,
    正義: 7,
    皇帝: 6,
    世界: 8,
    女教皇: 4,
    隠者: 3,
    力: 4,
    魔術師: 3,
    恋人: 2,
    審判: 2,
    星: 3,
    運命の輪: 1,
    戦車: 1,
    吊るされた男: -2,
    月: -4,
    死神: -5,
    悪魔: -6,
    塔: -8,
    愚者: -5,
  };

  const reversedMap = {
    太陽: -8,
    正義: -7,
    皇帝: -6,
    世界: -7,
    女教皇: -5,
    隠者: -4,
    力: -5,
    魔術師: -4,
    恋人: -5,
    審判: -4,
    星: -5,
    運命の輪: -6,
    戦車: -6,
    吊るされた男: -4,
    月: -7,
    死神: -6,
    悪魔: -7,
    塔: -9,
    愚者: -7,
  };

  return reversed ? (reversedMap[tarotBaseName] ?? -3) : (uprightMap[tarotBaseName] ?? 0);
}

function buildBaseSuggestion(tarot, boats) {
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

function buildLearningModel(saved) {
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

function getLearnedLaneBoosts(tarot, boats, saved) {
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

function buildAISuggestion(tarot, boats, saved) {
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
  const inputPenalty = enteredBoatCount >= 6 ? 0 : enteredBoatCount === 5 ? 4 : enteredBoatCount === 4 ? 8 : enteredBoatCount === 3 ? 14 : 20;

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

function buildAutoBetMemo(tarot, suggestion) {
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

function hasDuplicateResults(result) {
  const picked = [result.first, result.second, result.third].filter(Boolean);
  return new Set(picked).size !== picked.length;
}

function parsePayout(value) {
  const normalized = value.replace(/[,円\s]/g, "");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : 0;
}

function isManShu(value) {
  return parsePayout(value) >= 10000;
}

function buildRaceInsights(tarot, suggestion, boats, saved, confidence) {
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

function cardPanelStyle(isAxis, isRival, isHole) {
  if (isAxis) {
    return {
      border: "2px solid #f59e0b",
      background: "#2b2110",
      boxShadow: "0 0 0 1px rgba(245,158,11,0.3)",
    };
  }
  if (isRival) {
    return {
      border: "2px solid #a1a1aa",
      background: "#232326",
    };
  }
  if (isHole) {
    return {
      border: "2px solid #38bdf8",
      background: "#0f1e29",
    };
  }
  return {
    border: "1px solid #3f3f46",
    background: "#18181b",
  };
}

function sectionStyle() {
  return {
    background: "#18181b",
    border: "1px solid #3f3f46",
    borderRadius: 16,
    padding: 16,
  };
}

function statBoxStyle() {
  return {
    background: "#18181b",
    border: "1px solid #3f3f46",
    borderRadius: 14,
    padding: 14,
  };
}

export default function App() {
  const [venue, setVenue] = useState("桐生");
  const [raceNo, setRaceNo] = useState("1");
  const [dateMemo, setDateMemo] = useState("");
  const [tarot, setTarot] = useState("");
  const [boats, setBoats] = useState(createEmptyBoats());
  const [memo, setMemo] = useState(INITIAL_MEMO);
  const [saved, setSaved] = useState(() => {
    try {
      const data = localStorage.getItem("kyotei_saved");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("localStorage読み込み失敗:", error);
      return [];
    }
  });
  const [result, setResult] = useState({ first: "", second: "", third: "" });
  const [payout, setPayout] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("kyotei_saved", JSON.stringify(saved));
    } catch (error) {
      console.error("localStorage保存失敗:", error);
    }
  }, [saved]);

  const tarotInfo = useMemo(() => getTarot(tarot), [tarot]);
  const aiSuggestion = useMemo(() => buildAISuggestion(tarot, boats, saved), [tarot, boats, saved]);
  const suggestion = aiSuggestion;
  const autoBetMemo = useMemo(() => buildAutoBetMemo(tarot, suggestion), [tarot, suggestion]);
  const resultHasDuplicate = useMemo(() => hasDuplicateResults(result), [result]);
  const selectedLenormandNames = useMemo(() => boats.map((boat) => boat.card).filter(Boolean), [boats]);
  const raceInsights = useMemo(
    () => buildRaceInsights(tarot, suggestion, boats, saved, aiSuggestion.aiScore.confidence),
    [tarot, suggestion, boats, saved, aiSuggestion.aiScore.confidence]
  );
  const hasRaceInput = Boolean(tarot && boats.some((boat) => boat.card));

  const stats = useMemo(() => {
    const total = saved.length;
    const hitCount = saved.filter((item) => item.hit.trifectaOrder).length;
    const axisHitCount = saved.filter((item) => item.hit.axisHit).length;
    const manshuCount = saved.filter((item) => isManShu(item.payout)).length;

    return {
      total,
      hitRate: total ? Math.round((hitCount / total) * 100) : 0,
      axisRate: total ? Math.round((axisHitCount / total) * 100) : 0,
      manshuRate: total ? Math.round((manshuCount / total) * 100) : 0,
    };
  }, [saved]);

  const updateBoatCard = (lane, value) => {
    setBoats((prev) => prev.map((boat) => (boat.lane === lane ? { ...boat, card: value } : boat)));
  };

  const updateResult = (key, value) => {
    setResult((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setVenue("桐生");
    setRaceNo("1");
    setDateMemo("");
    setTarot("");
    setBoats(createEmptyBoats());
    setMemo(INITIAL_MEMO);
    setResult({ first: "", second: "", third: "" });
    setPayout("");
  };

  const saveCurrent = () => {
    if (resultHasDuplicate) return;

    const resultOrder = [result.first, result.second, result.third].filter(Boolean);
    const predictedOrder = [suggestion.axis, suggestion.rival, suggestion.hole].filter((v) => typeof v === "number");

    const item = {
      id: Date.now(),
      title: `${venue} ${raceNo}R`,
      dateMemo,
      tarot,
      boats: boats.map((boat) => ({ ...boat })),
      memo,
      result: { ...result },
      suggestion: {
        axis: suggestion.axis,
        rival: suggestion.rival,
        hole: suggestion.hole,
        style: suggestion.style,
        rankedLanes: [...suggestion.rankedLanes],
      },
      hit: {
        exactaBox:
          resultOrder.length >= 2 &&
          predictedOrder.length >= 2 &&
          [String(predictedOrder[0]), String(predictedOrder[1])].sort().join("-") ===
            [result.first, result.second].sort().join("-"),
        trifectaOrder:
          resultOrder.length === 3 &&
          predictedOrder.length === 3 &&
          predictedOrder.map(String).join("-") === resultOrder.join("-"),
        axisHit: typeof suggestion.axis === "number" ? resultOrder.includes(String(suggestion.axis)) : false,
      },
      payout,
      autoMemo: [...autoBetMemo],
      aiScore: {
        predictedOrder: suggestion.rankedLanes.slice(0, 3),
        confidence: aiSuggestion.aiScore.confidence,
        learnedBoosts: aiSuggestion.aiScore.learnedBoosts,
      },
    };

    setSaved((prev) => [item, ...prev].slice(0, 50));
  };

  const deleteSavedItem = (id) => {
    const ok = window.confirm("この保存履歴を削除しますか？");
    if (!ok) return;
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllSaved = () => {
    const ok = window.confirm("保存履歴を全部削除しますか？");
    if (!ok) return;
    setSaved([]);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09090b",
        color: "white",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>🚤 ルノタロ競艇占い</h1>
        <p style={{ color: "#a1a1aa", marginBottom: 24 }}>
          タロット1枚で展開、1〜6艇にルノルマンを割り当ててAI補助予想する簡易版
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: 20 }}>
            <div style={sectionStyle()}>
              <h2 style={{ marginTop: 0 }}>基本入力</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ marginBottom: 6, color: "#a1a1aa" }}>場</div>
                  <select value={venue} onChange={(e) => setVenue(e.target.value)} style={{ width: "100%", padding: 10 }}>
                    {venues.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div style={{ marginBottom: 6, color: "#a1a1aa" }}>レース番号</div>
                  <select value={raceNo} onChange={(e) => setRaceNo(e.target.value)} style={{ width: "100%", padding: 10 }}>
                    {raceNumbers.map((n) => (
                      <option key={n} value={n}>
                        {n}R
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div style={{ marginBottom: 6, color: "#a1a1aa" }}>日付メモ</div>
                  <input
                    value={dateMemo}
                    onChange={(e) => setDateMemo(e.target.value)}
                    placeholder="例：3/10 ナイター"
                    style={{ width: "100%", padding: 10 }}
                  />
                </div>
              </div>

              <div>
                <div style={{ marginBottom: 6, color: "#a1a1aa" }}>レース展開タロット</div>
                <select value={tarot} onChange={(e) => setTarot(e.target.value)} style={{ width: "100%", padding: 10 }}>
                  <option value="">選択してください</option>
                  {tarotCards.flatMap((card) => [
                    <option key={`${card.name}-normal`} value={card.name}>
                      {card.id}. {card.name}（正位置）
                    </option>,
                    <option key={`${card.name}-reverse`} value={`${card.name}_R`}>
                      {card.id}. {card.name}（逆位置）
                    </option>,
                  ])}
                </select>
              </div>

              {tarotInfo && (
                <div
                  style={{
                    marginTop: 16,
                    padding: 16,
                    borderRadius: 14,
                    background: "#111827",
                    border: "1px solid #374151",
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
                    {tarotInfo.id}. {tarotInfo.name}
                  </div>
                  <div style={{ color: "#d4d4d8" }}>{tarotInfo.meaning}</div>
                </div>
              )}
            </div>

            <div style={sectionStyle()}>
              <h2 style={{ marginTop: 0 }}>1〜6艇 ルノルマン入力</h2>

              {suggestion.rankedLanes.length > 0 && (
                <div
                  style={{
                    marginBottom: 16,
                    padding: 10,
                    borderRadius: 12,
                    background: "#082f49",
                    border: "1px solid #0ea5e9",
                    color: "#bae6fd",
                  }}
                >
                  AI順: {suggestion.rankedLanes.join(" → ")}
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {boats.map((boat) => {
                  const info = getLenormand(boat.card);
                  const isAxis = suggestion.axis === boat.lane;
                  const isRival = suggestion.rival === boat.lane;
                  const isHole = suggestion.hole === boat.lane;
                  const availableCards = lenormandCards.filter(
                    (card) => card.name === boat.card || !selectedLenormandNames.includes(card.name)
                  );

                  return (
                    <div key={boat.lane} style={{ ...cardPanelStyle(isAxis, isRival, isHole), borderRadius: 14, padding: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <strong>{boat.lane}号艇</strong>
                        <div>
                          {isAxis && <span style={{ color: "#fbbf24" }}>軸候補</span>}
                          {!isAxis && isRival && <span style={{ color: "#e4e4e7" }}>相手</span>}
                          {!isAxis && !isRival && isHole && <span style={{ color: "#7dd3fc" }}>穴注意</span>}
                        </div>
                      </div>

                      <select
                        value={boat.card}
                        onChange={(e) => updateBoatCard(boat.lane, e.target.value)}
                        style={{ width: "100%", padding: 10, marginBottom: 12 }}
                      >
                        <option value="">ルノルマンを選択</option>
                        {availableCards.map((card) => (
                          <option key={card.id} value={card.name}>
                            {card.id}. {card.name}
                          </option>
                        ))}
                      </select>

                      {info ? (
                        <div>
                          <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>{info.name}</div>
                          <div style={{ color: "#d4d4d8", fontSize: 14 }}>{info.meaning}</div>
                        </div>
                      ) : (
                        <div style={{ color: "#71717a", fontSize: 14 }}>カード未選択</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={sectionStyle()}>
              <h2 style={{ marginTop: 0 }}>結果入力</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <div style={{ marginBottom: 6, color: "#a1a1aa" }}>1着</div>
                  <select value={result.first} onChange={(e) => updateResult("first", e.target.value)} style={{ width: "100%", padding: 10 }}>
                    <option value="">選択</option>
                    {resultBoatNumbers.map((n) => (
                      <option key={`f-${n}`} value={n}>
                        {n}号艇
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div style={{ marginBottom: 6, color: "#a1a1aa" }}>2着</div>
                  <select value={result.second} onChange={(e) => updateResult("second", e.target.value)} style={{ width: "100%", padding: 10 }}>
                    <option value="">選択</option>
                    {resultBoatNumbers.map((n) => (
                      <option key={`s-${n}`} value={n}>
                        {n}号艇
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div style={{ marginBottom: 6, color: "#a1a1aa" }}>3着</div>
                  <select value={result.third} onChange={(e) => updateResult("third", e.target.value)} style={{ width: "100%", padding: 10 }}>
                    <option value="">選択</option>
                    {resultBoatNumbers.map((n) => (
                      <option key={`t-${n}`} value={n}>
                        {n}号艇
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div style={{ marginBottom: 6, color: "#a1a1aa" }}>払戻金</div>
                  <input
                    value={payout}
                    onChange={(e) => setPayout(e.target.value)}
                    placeholder="例：12840"
                    style={{ width: "100%", padding: 10 }}
                  />
                </div>
              </div>

              {resultHasDuplicate && (
                <div style={{ marginTop: 12, color: "#fbbf24" }}>
                  1着〜3着に同じ艇番が重複しています。
                </div>
              )}

              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button
                  onClick={saveCurrent}
                  disabled={resultHasDuplicate}
                  style={{
                    padding: "12px 16px",
                    background: resultHasDuplicate ? "#52525b" : "white",
                    color: resultHasDuplicate ? "#d4d4d8" : "black",
                    border: "none",
                    borderRadius: 10,
                    cursor: resultHasDuplicate ? "not-allowed" : "pointer",
                  }}
                >
                  この占いを保存
                </button>

                <button
                  onClick={resetForm}
                  style={{
                    padding: "12px 16px",
                    background: "#27272a",
                    color: "white",
                    border: "1px solid #52525b",
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                >
                  入力をリセット
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 20 }}>
            <div style={sectionStyle()}>
              <h2 style={{ marginTop: 0 }}>占い整理メモ</h2>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                <span style={{ background: "#27272a", padding: "6px 10px", borderRadius: 999 }}>場: {venue}</span>
                <span style={{ background: "#27272a", padding: "6px 10px", borderRadius: 999 }}>R: {raceNo}</span>
                {tarotInfo && (
                  <span style={{ background: "#581c87", padding: "6px 10px", borderRadius: 999 }}>
                    展開: {tarotInfo.name}
                  </span>
                )}
              </div>

              <div style={{ lineHeight: 1.8 }}>
                <div><strong>◎ 本命:</strong> {suggestion.axis}号艇</div>
                <div><strong>○ 相手:</strong> {suggestion.rival}号艇</div>
                <div><strong>▲ 3番手:</strong> {suggestion.hole}号艇</div>
                <div><strong>流れメモ:</strong> {suggestion.style}</div>
                {suggestion.rankedLanes.length > 0 && (
                  <div><strong>AI順:</strong> {suggestion.rankedLanes.join(" → ")}</div>
                )}
                <div>
                  <strong>AI信頼度:</strong> {aiSuggestion.aiScore.confidence}%
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                <div style={statBoxStyle()}>
                  <div style={{ color: "#a1a1aa", fontSize: 13 }}>荒れ度予測</div>
                  <div style={{ fontSize: 28, fontWeight: "bold" }}>
                    {hasRaceInput ? raceInsights.volatilityScore : "-"}
                  </div>
                  <div style={{ color: "#d4d4d8" }}>
                    {hasRaceInput ? raceInsights.volatilityLabel : "未入力"}
                  </div>
                </div>
                <div style={statBoxStyle()}>
                  <div style={{ color: "#a1a1aa", fontSize: 13 }}>万舟期待度</div>
                  <div style={{ fontSize: 28, fontWeight: "bold" }}>
                    {hasRaceInput ? `${raceInsights.manshuProbability}%` : "-"}
                  </div>
                  <div style={{ color: "#d4d4d8" }}>
                    {hasRaceInput ? raceInsights.manshuLabel : "未入力"}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ marginBottom: 8, color: "#a1a1aa" }}>買い目メモ自動整理</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {autoBetMemo.map((line, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: 10,
                        borderRadius: 10,
                        background: "#0f172a",
                        border: "1px solid #334155",
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ marginBottom: 8, color: "#a1a1aa" }}>あなたの最終判断メモ</div>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: 180,
                    padding: 12,
                    background: "#09090b",
                    color: "white",
                    border: "1px solid #52525b",
                    borderRadius: 10,
                  }}
                />
              </div>
            </div>

            <div style={sectionStyle()}>
              <h2 style={{ marginTop: 0 }}>集計</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={statBoxStyle()}>
                  <div style={{ color: "#a1a1aa", fontSize: 13 }}>保存件数</div>
                  <div style={{ fontSize: 28, fontWeight: "bold" }}>{stats.total}</div>
                </div>
                <div style={statBoxStyle()}>
                  <div style={{ color: "#a1a1aa", fontSize: 13 }}>3連単的中率</div>
                  <div style={{ fontSize: 28, fontWeight: "bold" }}>{stats.hitRate}%</div>
                </div>
                <div style={statBoxStyle()}>
                  <div style={{ color: "#a1a1aa", fontSize: 13 }}>軸ヒット率</div>
                  <div style={{ fontSize: 28, fontWeight: "bold" }}>{stats.axisRate}%</div>
                </div>
                <div style={statBoxStyle()}>
                  <div style={{ color: "#a1a1aa", fontSize: 13 }}>万舟率</div>
                  <div style={{ fontSize: 28, fontWeight: "bold" }}>{stats.manshuRate}%</div>
                </div>
              </div>
            </div>

            <div style={sectionStyle()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <h2 style={{ margin: 0 }}>保存履歴</h2>
                {saved.length > 0 && (
                  <button
                    onClick={clearAllSaved}
                    style={{
                      padding: "8px 12px",
                      background: "#7f1d1d",
                      color: "white",
                      border: "1px solid #b91c1c",
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                  >
                    全削除
                  </button>
                )}
              </div>

              {saved.length === 0 ? (
                <div style={{ color: "#71717a" }}>まだ保存はありません。</div>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {saved.map((item) => {
                    const reversed = isReversedTarot(item.tarot);
                    return (
                      <div
                        key={item.id}
                        style={{
                          border: "1px solid #3f3f46",
                          borderRadius: 12,
                          padding: 12,
                          background: "#09090b",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            <span style={{ background: "white", color: "black", padding: "4px 8px", borderRadius: 999 }}>
                              {item.title}
                            </span>
                            {item.dateMemo && (
                              <span style={{ background: "#27272a", padding: "4px 8px", borderRadius: 999 }}>
                                {item.dateMemo}
                              </span>
                            )}
                            {item.tarot && (
                              <span
                                style={{
                                  background: reversed ? "#be123c" : "#6b21a8",
                                  padding: "4px 8px",
                                  borderRadius: 999,
                                }}
                              >
                                {getTarotStatKey(item.tarot)}
                              </span>
                            )}
                            {item.hit.trifectaOrder && (
                              <span style={{ background: "#15803d", padding: "4px 8px", borderRadius: 999 }}>
                                3連単的中
                              </span>
                            )}
                            {!item.hit.trifectaOrder && item.hit.axisHit && (
                              <span style={{ background: "#f59e0b", color: "black", padding: "4px 8px", borderRadius: 999 }}>
                                軸ヒット
                              </span>
                            )}
                            {isManShu(item.payout) && (
                              <span style={{ background: "#e11d48", padding: "4px 8px", borderRadius: 999 }}>
                                万舟
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => deleteSavedItem(item.id)}
                            style={{
                              padding: "6px 10px",
                              background: "#3f3f46",
                              color: "white",
                              border: "1px solid #52525b",
                              borderRadius: 8,
                              cursor: "pointer",
                              whiteSpace: "nowrap",
                            }}
                          >
                            削除
                          </button>
                        </div>

                        <div style={{ color: "#a1a1aa", fontSize: 13, marginBottom: 6 }}>
                          結果: {item.result.first || "-"}-{item.result.second || "-"}-{item.result.third || "-"} / 払戻: {item.payout || "-"}
                        </div>

                        <div style={{ color: "#a1a1aa", fontSize: 13, marginBottom: 6 }}>
                          {item.boats.map((boat) => `${boat.lane}:${boat.card || "-"}`).join(" / ")}
                        </div>

                        <div style={{ color: "#67e8f9", fontSize: 13 }}>
                          AI信頼度: {item.aiScore.confidence}% / AI順: {item.aiScore.predictedOrder.join("-") || "-"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}