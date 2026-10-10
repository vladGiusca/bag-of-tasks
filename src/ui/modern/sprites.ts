import { spriteUrl } from './pixel'

const OUTLINE = '#111111'

// prettier-ignore
const BAG = [
  '......kkkkkkkkkkkk......',
  '....kkllllllllllllkk....',
  '...klkkkkkkkkkkkkkklk...',
  '...kk000000000000000k...',
  '....kkk0000000000kkk....',
  '......kkkkkkkkkkkk......',
  '.......kbbbbbbbbk.......',
  '......krrrrrrrrrrk......',
  '......kRRRRRRRRRRk......',
  '.......kbbbbbbbbk.......',
  '......kbbbbbbbbbbk......',
  '.....kbllbbbbbbbbdk.....',
  '....kbllbbbbbbbbbbdk....',
  '...kbllbbbbbbbbbbbbdk...',
  '..kbllbbbYyyyyybbbbbdk..',
  '..kbllbbbyyyyyyobbbbdk..',
  '.kbllbbbbbbyyobbbbbbbdk.',
  '.kbllbbbbbbyyobbbbbbbdk.',
  '.kbbbbbbbbbyyobbbbbbddk.',
  '.kbbbbbbbbbyyobbbbbbddk.',
  '.kdbbbbbbbbbbbbbbbbbddk.',
  '..kdbbbbbbbbbbbbbbbddk..',
  '...kdddddddddddddddddk..',
  '....kkkkkkkkkkkkkkkkk...',
]

// prettier-ignore
const COIN = [
  '...kkkkkk...',
  '..kyyyyyyk..',
  '.kyYYyyyyok.',
  'kyYyyyyyyyok',
  'kyYyyooyyyok',
  'kyyyyoYyyyok',
  'kyyyyoYyyyok',
  'kyyyyoYyyyok',
  'kyyyyyyyyyok',
  '.kyyyyyyyok.',
  '..kooooook..',
  '...kkkkkk...',
]

// prettier-ignore
const CLOUD = [
  '......wwww......',
  '....wwwwwwww....',
  '..wwwwwwwwwwww..',
  '.wwwwwwwwwwwwwww',
  'wwwwwwwwwwwwwwww',
  'wswwwwsswwwwwssw',
  '.ssssssssssssss.',
]

// prettier-ignore
const GRASS = [
  '..l.......l...l.',
  '.lG..l...lG..lG.',
  'GGGGlGGGGGGGlGGG',
  'GGGGGGGGGGGGGGGG',
  'GGlGGGGGGGlGGGGG',
  'GGGGGGGGGGGGGGGG',
  'DDGDDDDGDDDDDGDD',
  'DDDDDDDDDDDDDDDD',
]

// prettier-ignore
const DIRT = [
  'dddddddd',
  'ddeddddd',
  'dddddddd',
  'dddddfdd',
  'dddddddd',
  'deddddde',
  'dddddddd',
  'ddddfddd',
]

const GOLD = { y: '#f7c531', Y: '#fff3a6', o: '#c7860e' }

export const SPRITES = {
  bag: {
    url: spriteUrl(BAG, {
      k: OUTLINE,
      b: '#b8743a',
      l: '#dca066',
      d: '#7d4a22',
      '0': '#3a1f0c',
      r: '#e9d38c',
      R: '#b39a52',
      ...GOLD,
    }),
    width: BAG[0].length,
    height: BAG.length,
  },
  coin: {
    url: spriteUrl(COIN, { k: OUTLINE, ...GOLD }),
    width: COIN[0].length,
    height: COIN.length,
  },
  cloud: {
    url: spriteUrl(CLOUD, { w: '#ffffff', s: '#d4ecff' }),
    width: CLOUD[0].length,
    height: CLOUD.length,
  },
  grass: {
    url: spriteUrl(GRASS, { l: '#9be35a', G: '#5bbf35', D: '#3d8c27' }),
    width: GRASS[0].length,
    height: GRASS.length,
  },
  dirt: {
    url: spriteUrl(DIRT, { d: '#8b5a2b', e: '#6d4220', f: '#a8743e' }),
    width: DIRT[0].length,
    height: DIRT.length,
  },
}
