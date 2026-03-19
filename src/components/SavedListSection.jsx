import { getTarotStatKey, isManShu, isReversedTarot } from "../utils/kyoteiLogic";
import { sectionStyle } from "../utils/styles";

export default function SavedListSection({
  saved,
  clearAllSaved,
  deleteSavedItem,
}) {
  return (
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
  );
}
