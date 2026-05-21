import { useState } from 'react'
import {getSelectedCurrency, saveSelectedCurrency, CURRENCIES } from '../store/currencyStore'
import type {Currency} from '../store/currencyStore'

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>(getSelectedCurrency())

  const changeCurrency = (code: string) => {
    const found = CURRENCIES.find(c => c.code === code)
    if (!found) return
    saveSelectedCurrency(code)
    setCurrency(found)
  }

  return { currency, changeCurrency, currencies: CURRENCIES }
}