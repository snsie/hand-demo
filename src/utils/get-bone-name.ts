export default function getBoneName(num) {
  return `bone${String(num).padStart(3, '0')}`;
}
