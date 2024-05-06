type FormatterType = 'num2percent'
export default (type: FormatterType, v: string | number | boolean) => {
  switch (type) {
    case 'num2percent':
      // 百分比小数转百分比
      return `${(v * 100).toFixed(2)}`
    default:
      return v
  }
}
