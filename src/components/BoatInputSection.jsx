import { lenormandCards } from "../data/cards";
import { getLenormand } from "../utils/kyoteiLogic";
import { cardPanelStyle, sectionStyle } from "../utils/styles";

export default function BoatInputSection({
  boats,
  suggestion,
  selectedLenormandNames,
  updateBoatCard,
}) {
  return (
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
  );
}
