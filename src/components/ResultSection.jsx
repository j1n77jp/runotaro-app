import { resultBoatNumbers } from "../data/constants";
import { sectionStyle } from "../utils/styles";

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
    <div style={sectionStyle()}>
      <h2 style={{ marginTop: 0 }}>結果入力</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
        {["first", "second", "third"].map((key, idx) => (
          <div key={key}>
            <div style={{ marginBottom: 6, color: "#a1a1aa" }}>{idx + 1}着</div>
            <select
              value={result[key]}
              onChange={(e) => updateResult(key, e.target.value)}
              style={{ width: "100%", padding: 10 }}
            >
              <option value="">選択</option>
              {resultBoatNumbers.map((n) => (
                <option key={`${key}-${n}`} value={n}>
                  {n}号艇
                </option>
              ))}
            </select>
          </div>
        ))}

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
  );
}
