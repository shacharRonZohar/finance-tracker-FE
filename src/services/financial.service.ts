// import { httpService } from './util/http.service'
import { storageService } from './util/async-storage.service'
import { authService } from './auth.service'

import type { MonthData, Item, NewItem } from '@/models/financial'
import { httpService } from './util/http.service'

export const financialService = {
  getMonthlyData,
  addItem,
  saveMonthlyData
}

const DB_KEY = 'financialsDB'
await _createDemoData()

function _query() {
  return storageService.query<MonthData>(DB_KEY)
}

async function getMonthlyData({ year, month }: { year: number; month: number }) {
  // const financials = await _query()
  // const { _id } = await authService.getLoggedInUser()
  // const data = financials.find(({ userId, month }) => userId === _id && month === searchMonth)
  // const data = await storageService.get<MonthData>(DB_KEY, searchBy)
  console.log('getMonthlyData', year, month)
  const data = httpService.get<MonthData>(`monthData/${year}`, { month })
  if (!data) throw new Error('No month data found')
  return data
}

async function addItem(item: NewItem, searchMonth: number, isRecurring: boolean) {
  const newItem = { id: Date.now().toString(), ...item }
  const monthData = await getMonthlyData(searchMonth)
  console.log(monthData)
  const {
    expneses: { recurring, nonRecurring }
  } = monthData
  ;(isRecurring ? recurring : nonRecurring).unshift(newItem)
  // console.log(monthData)
  return monthData
}

async function saveMonthlyData(monthData: MonthData) {
  // try {
  return storageService.put<MonthData>(DB_KEY, monthData)
  // } catch (err) {
}

async function _createDemoData() {
  const financials = await _query()
  if (financials.length) return
  const demoData = _getDemoData()
  await storageService.postMany<MonthData>(DB_KEY, demoData)
}

function _getDemoData(): MonthData[] {
  return [
    {
      id: '1',
      month: 1,
      budget: 1000,
      expneses: {
        recurring: [
          {
            id: '1',
            name: 'Rent',
            price: 1000
          }
        ],
        nonRecurring: []
      }
    },
    {
      id: '2',
      month: 2,
      budget: 1500,
      expneses: {
        recurring: [
          {
            id: '2',
            name: 'Rent',
            price: 1000
          }
        ],
        nonRecurring: []
      }
    }
  ]
}
