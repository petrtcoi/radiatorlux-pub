'use client'

import { TColor, TConnection } from '@/entities'
import { atom } from 'jotai'

export const $filterColor = atom<TColor | null>(null)

export const $filterConnection = atom<TConnection>()
