export interface Item {
  id: string
  name: string
  price: number
}

export type NewItem = Omit<Item, 'id'>

export interface MonthData {
  _id: string
  userId: string
  month: number
  budget: number
  expneses: {
    recurring: Item[]
    nonRecurring: Item[]
  }
}
