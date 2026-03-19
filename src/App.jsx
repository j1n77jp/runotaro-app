import { useMemo, useState } from "react";
import BasicFormSection from "./components/BasicFormSection";
import BoatInputSection from "./components/BoatInputSection";
import MemoSection from "./components/MemoSection";
import ResultSection from "./components/ResultSection";
import SavedListSection from "./components/SavedListSection";
import StatsSection from "./components/StatsSection";
import { INITIAL_MEMO } from "./data/constants";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  buildAISuggestion,
  buildAutoBetMemo,
  buildRaceInsights,
  createEmptyBoats,
  getTarot,
  hasDuplicateResults,
  isManShu,
} from "./utils/kyoteiLogic";

export default function App() {
  const [venue, setVenue] = useState("桐生");
  const [raceNo, setRaceNo] = useState("1");
  const [dateMemo, setDateMemo] = useState("");
  const [tarot, setTarot] = useState("");
  const [boats, setBoats] = useState(createEmptyBoats());
  const [memo, setMemo] = useState(INITIAL_MEMO);
  const [saved, setSaved] = useLocalStorage("kyotei_saved", []);
  const [result, setResult] = useState({ first: "", second: "", third: "" });
  const [payout, setPayout] = useState("");

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
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          width: "100%",
          minWidth: 0,
        }}
      >
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>🚤 ルノタロ競艇占い</h1>
        <p style={{ color: "#a1a1aa", marginBottom: 24 }}>
          タロット1枚で展開、1〜6艇にルノルマンを割り当ててAI補助予想する簡易版
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
            gap: 20,
            alignItems: "start",
            width: "100%",
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 20,
              minWidth: 0,
              width: "100%",
            }}
          >
            <BasicFormSection
              venue={venue}
              setVenue={setVenue}
              raceNo={raceNo}
              setRaceNo={setRaceNo}
              dateMemo={dateMemo}
              setDateMemo={setDateMemo}
              tarot={tarot}
              setTarot={setTarot}
              tarotInfo={tarotInfo}
            />

            <BoatInputSection
              boats={boats}
              suggestion={suggestion}
              selectedLenormandNames={selectedLenormandNames}
              updateBoatCard={updateBoatCard}
            />

            <ResultSection
              result={result}
              payout={payout}
              setPayout={setPayout}
              updateResult={updateResult}
              resultHasDuplicate={resultHasDuplicate}
              saveCurrent={saveCurrent}
              resetForm={resetForm}
            />
          </div>

          <div
            style={{
              display: "grid",
              gap: 20,
              minWidth: 0,
              width: "100%",
            }}
          >
            <MemoSection
              venue={venue}
              raceNo={raceNo}
              tarotInfo={tarotInfo}
              suggestion={suggestion}
              aiSuggestion={aiSuggestion}
              raceInsights={raceInsights}
              hasRaceInput={hasRaceInput}
              autoBetMemo={autoBetMemo}
              memo={memo}
              setMemo={setMemo}
            />

            <StatsSection stats={stats} />

            <SavedListSection
              saved={saved}
              clearAllSaved={clearAllSaved}
              deleteSavedItem={deleteSavedItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
