export default (px: number) => {
  // 750px = 100vw
  // 1px = (100 / 750)vw
  return `${px * (100 / 750)}vw`
}