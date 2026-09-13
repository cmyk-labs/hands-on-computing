export const minutesPerHour = 60;
function add(left, right) {
  return left + right;
}
export { add as sum };
export default function describe(minutes) {
  return String(minutes) + " 分钟";
}
