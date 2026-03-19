import { sectionStyle, statBoxStyle } from "../utils/styles";

export default function MemoSection({
  venue,
  raceNo,
  tarotInfo,
  suggestion,
  aiSuggestion,
  raceInsights,
  hasRaceInput,
  autoBetMemo,
  memo,
  setMemo,
}) {
  return (
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
        <div><strong>AI信頼度:</strong> {aiSuggestion.aiScore.confidence}%</div>
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
  );
}
