export default function clamp (
  preferred,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY
) {
  if (preferred === null || preferred === undefined) {
    throw new Error('A preferred value is required')
  }

  return Math.max(Math.min(preferred, max), min)
}
