export type ClassNames =
  | 'font-title-lg'
  | 'font-title-md'
  | 'font-title-sm'
  | 'font-subtitle'
  | 'font-body-md'
  | 'font-body-sm'
  | 'font-body-xs'
  | 'font-label-md'
  | 'font-label-sm'
  | 'font-action-md'
  | 'font-action-sm'

const classMap: Record<ClassNames, string> = {
  'font-title-lg': 'font-dmSans text-[28px] leading-[120%] font-bold',
  'font-title-md': 'font-dmSans text-[24px] leading-[120%] font-bold',
  'font-title-sm': 'font-dmSans text-[18px] leading-[120%] font-bold',
  'font-subtitle': 'font-poppins text-[16px] leading-[120%] font-semibold',
  'font-body-md': 'font-poppins text-[16px] leading-[120%] font-normal',
  'font-body-sm': 'font-poppins text-[14px] leading-[120%] font-normal',
  'font-body-xs': 'font-poppins text-[12px] leading-[120%] font-normal',
  'font-label-md':
    'font-poppins text-[12px] leading-[120%] font-medium uppercase',
  'font-label-sm':
    'font-poppins text-[10px] leading-[120%] font-medium uppercase',
  'font-action-md': 'font-poppins text-[16px] leading-[120%] font-medium',
  'font-action-sm': 'font-poppins text-[14px] leading-[120%] font-medium',
}

export function getTailwindClass(className: ClassNames): string {
  return classMap[className] || ''
}
