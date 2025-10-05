/*
 * Created by Asad on 04 OCT 2025
 */

export const typography = {
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 22, fontWeight: '400' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
} as const;

// ✅ Derive valid keys from typography object
export type TypographyVariant = keyof typeof typography;

// TODO: will separate logic in M2 with dimens etc