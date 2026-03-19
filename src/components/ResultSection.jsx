import { resultBoatNumbers } from "../data/constants";
import { fieldStyle, sectionStyle } from "../utils/styles";

export default function ResultSection({
  result,
  payout,
  setPayout,
  updateResult,
  resultHasDuplicate,
  saveCurrent,
  resetForm,
}) {
  return (
    <div style={{ ...sectionStyle(), overflow: "hidden" }}>
      <h2 style={{ marginTop: 0 }}>結果入力</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 12,
          width: "100%",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ marginBottom: 6, color: "#a1a1aa" }}>1着</div>
          <select
            value={result.first}
            onChange={(e) => updateResult("first", e.target.value)}
            style={fieldStyle()}
          >
            <option value="">選択</option>
            {resultBoatNumbers.map((n) => (
              <option key={`f-${n}`} value={n}>
                {n}号艇
              </option>
            ))}
          </select>
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ marginBottom: 6, color: "#a1a1aa" }}>2着</div>
          <select
            value={result.second}
            onChange={(e) => updateResult("second", e.target.value)}
            style={fieldStyle()}
          >
            <option value="">選択</option>
            {resultBoatNumbers.map((n) => (
              <option key={`s-${n}`} value={n}>
                {n}号艇
              </option>
            ))}
          </select>
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ marginBottom: 6, color: "#a1a1aa" }}>3着</div>
          <select
            value={result.third}
            onChange={(e) => updateResult("third", e.target.value)}
            style={fieldStyle()}
          >
            <option value="">選択</option>
            {resultBoatNumbers.map((n) => (
              <option key={`t-${n}`} value={n}>
                {n}号艇
              </option>
            ))}
          </select>
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ marginBottom: 6, color: "#a1a1aa" }}>払戻金</div>
          <input
            value={payout}
            onChange={(e) => setPayout(e.target.value)}
            placeholder="例：12840"
            style={fieldStyle()}
          />
        </div>
      </div>

      {resultHasDuplicate && (
        <div style={{ marginTop: 12, color: "#fbbf24" }}>
          1着〜3着に同じ艇番が重複しています。
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 16,
          flexWrap: "wrap",
        }}
      >
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
  );
}
