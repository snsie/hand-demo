export default function getBoneName(num, totalLength) {
  return `bone${String(num).padStart(totalLength, '0')}`;
}
