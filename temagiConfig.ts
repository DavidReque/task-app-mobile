import {  createTamagui } from '@tamagui/core' // or 'tamagui'
import { config } from '@tamagui/config/v3'

// you usually export this from a tamagui.config.ts file
export const tamaguiConfig = createTamagui(config)

// make TypeScript type everything based on your config
export type Conf = typeof tamaguiConfig
declare module '@tamagui/core' { // or 'tamagui'
  interface TamaguiCustomConfig extends Conf {}
}