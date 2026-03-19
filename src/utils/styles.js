export function cardPanelStyle(isAxis, isRival, isHole) {
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

export function sectionStyle() {
  return {
    background: "#18181b",
    border: "1px solid #3f3f46",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
  };
}

export function statBoxStyle() {
  return {
    background: "#18181b",
    border: "1px solid #3f3f46",
    borderRadius: 14,
    padding: 14,
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
  };
}

export function fieldStyle() {
  return {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    padding: 10,
    boxSizing: "border-box",
    font: "inherit",
  };
}
