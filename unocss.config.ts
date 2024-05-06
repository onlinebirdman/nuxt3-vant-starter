import process from 'node:process'
import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetWind from '@unocss/preset-wind'

const env = process.env.NODE_ENV
export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetAttributify(),
  ],
  rules: [
    [/^border-([lrtb])-\[(\d+px)_solid_(.*?)\]$/, ([, direction, size, color]) => {
      // 根据方向转换为对应的CSS属性
      const directionMap = {
        l: 'border-left',
        r: 'border-right',
        t: 'border-top',
        b: 'border-bottom',
      }
      const prop = directionMap[direction]
      return {
        [`${prop}-width`]: size,
        [`${prop}-style`]: 'solid',
        [`${prop}-color`]: color,
      }
    }],
  ],
  shortcuts: [
    { debug: env === 'production' ? '' : 'border-1 border-solid border-color-red box-border' },
    { 'absolute-center-x': 'absolute left-1/2 -translate-x-1/2' },
    { 'absolute-center-y': 'absolute top-1/2 -translate-y-1/2' },
    { 'absolute-center': 'absolute-center-x absolute-center-y' },
    { 'flex-center-x': 'flex justify-center' },
    { 'flex-center-y': 'flex items-center' },
    { 'flex-center': 'flex-center-x flex-center-y' },
    { 'flex-col-center-x': 'flex flex-col items-center' },
    { 'flex-col-center-y': 'flex flex-col justify-center' },
    { 'flex-col-center': 'flex-col-center-x flex-col-center-y' },
    { 'triangle-t': 'w-0 h-0 border-l-[10px_solid_transparent] border-r-[10px_solid_transparent] border-b-[10px_solid_#E9965A]' },
    // ['triangle-t-\[(.*?)\]$', ([a]) => `${a} w-0 h-0 border-l-[50px_solid_transparent] border-r-[50px_solid_transparent] border-t-[50px_solid_black]`],
  ],
  // ...UnoCSS options
})
