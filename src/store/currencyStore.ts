export interface Currency{
    code: string;
    symbol: string;
    name: string;
    flag: string;
}

export const CURRENCIES: Currency[]=[
    { code: 'usd', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'ngn', symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬' },
    { code: 'eur', symbol: '€', name: 'Euro', flag: 'EU' },
    { code: 'gbp', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    { code: 'jpy', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'cad', symbol: 'CA$', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'aud', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
]
const KEY = "crypto_currency"

export function getSelectedCurrency(): Currency {
    const saved = localStorage.getItem(KEY)
    return CURRENCIES.find(c=> c.code === saved) ?? CURRENCIES[0]
}

export function saveSelectedCurrency(code: string) {
  localStorage.setItem(KEY, code)
}