export interface Item {
  id: string
  name: string
  price: number
}

export type NewItem = Omit<Item, 'id'>

export interface MonthData {
  id: string
  month: number
  budget: number
  expneses: {
    recurring: Item[]
    nonRecurring: Item[]
  }
}
