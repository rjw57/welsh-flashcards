import { Radio, NumberInput } from "@mantine/core";

export type SourceSelectorState = { mode: "all" } | { mode: "upto"; unit: number };

export interface SourceSelectorProps {
  state: SourceSelectorState;
  onUpdated: (state: SourceSelectorState) => void;
  maxUnit: number;
}

export default function SourceSelector({ state, onUpdated, maxUnit }: SourceSelectorProps) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Radio
        label="All units"
        checked={state.mode === "all"}
        onChange={() => {
          onUpdated({ mode: "all" });
        }}
      />
      <Radio
        label={"Up to:"}
        checked={state.mode === "upto"}
        onChange={() => {
          if (state.mode !== "upto") {
            onUpdated({ mode: "upto", unit: 1 });
          }
        }}
      />
      <NumberInput
        value={state.mode === "upto" ? state.unit : 1}
        onChange={(value) => {
          const n = typeof value === "number" ? value : 1;
          if (state.mode === "upto") {
            onUpdated({ mode: "upto", unit: n });
          }
        }}
        min={1}
        max={maxUnit}
        disabled={state.mode !== "upto"}
        style={{ width: 80 }}
      />
    </div>
  );
}
