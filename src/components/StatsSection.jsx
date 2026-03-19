import { sectionStyle, statBoxStyle } from "../utils/styles";

export default function StatsSection({ stats }) {
  return (
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
  );
}
