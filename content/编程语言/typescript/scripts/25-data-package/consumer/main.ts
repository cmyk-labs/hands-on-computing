import { loadReadings, mapValues, type Reading } from "notebook-readings-ts-c";
const result = await loadReadings(async () => [{ sensor: " 温度 ", value: 18 }]);
if (!result.ok) throw new Error(result.message);
const rows: Reading[] = result.value;
const values: number[] = mapValues(rows, row => row.value);
if (rows[0]?.sensor !== "温度" || values[0] !== 18) throw new Error("installed result");
console.log("installed readings OK", rows[0].sensor, values[0]);
