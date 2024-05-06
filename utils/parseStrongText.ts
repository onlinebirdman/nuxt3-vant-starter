interface TextSegment {
  strong: boolean
  text: string
}

function parseStrongText(text: string): TextSegment[] {
  const segments: TextSegment[] = []
  let currentIndex = 0

  text.replace(/\*\*(.*?)\*\*/g, (match, p1, offset) => {
    // 添加前面的非加粗文本（如果有的话）
    if (offset > currentIndex) {
      segments.push({
        strong: false,
        text: text.slice(currentIndex, offset),
      })
    }
    // 添加加粗文本
    segments.push({
      strong: true,
      text: p1,
    })
    currentIndex = offset + match.length
    return match // 此返回值未使用，仅为满足replace函数的签名
  })

  // 添加最后一个非加粗的文本片段（如果有的话）
  if (currentIndex < text.length) {
    segments.push({
      strong: false,
      text: text.slice(currentIndex),
    })
  }

  return segments
}

export default parseStrongText
