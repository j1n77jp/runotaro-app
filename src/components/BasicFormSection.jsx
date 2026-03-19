import { tarotCards } from "../data/cards";
import { raceNumbers, venues } from "../data/constants";
import { fieldStyle, sectionStyle } from "../utils/styles";

export default function BasicFormSection({
  venue,
  setVenue,
  raceNo,
  setRaceNo,
  dateMemo,
  setDateMemo,
  tarot,
  setTarot,
  tarotInfo,
}) {
  return (
    <div style={sectionStyle()}>
      <h2 style={{ marginTop: 0 }}>基本入力</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          marginBottom: 16,
          width: "100%",
        }}
      >
        <div style={{ minWidth: 0, width: "100%" }}>
          <div style={{ marginBottom: 6, color: "#a1a1aa" }}>場</div>
          <select
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            style={{ ...fieldStyle(), display: "block" }}
          >
            {venues.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div style={{ minWidth: 0, width: "100%" }}>
          <div style={{ marginBottom: 6, color: "#a1a1aa" }}>レース番号</div>
          <select
            value={raceNo}
            onChange={(e) => setRaceNo(e.target.value)}
            style={{ ...fieldStyle(), display: "block" }}
          >
            {raceNumbers.map((n) => (
              <option key={n} value={n}>
                {n}R
              </option>
            ))}
          </select>
        </div>

        <div style={{ minWidth: 0, width: "100%" }}>
          <div style={{ marginBottom: 6, color: "#a1a1aa" }}>日付メモ</div>
          <input
            value={dateMemo}
            onChange={(e) => setDateMemo(e.target.value)}
            placeholder="例：3/10 ナイター"
            style={{ ...fieldStyle(), display: "block" }}
          />
        </div>
      </div>

      <div style={{ minWidth: 0, width: "100%" }}>
        <div style={{ marginBottom: 6, color: "#a1a1aa" }}>レース展開タロット</div>
        <select
          value={tarot}
          onChange={(e) => setTarot(e.target.value)}
          style={{ ...fieldStyle(), display: "block" }}
        >
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
  );
}
