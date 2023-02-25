export const storageService = {
  query,
  get,
  post,
  postMany,
  put,
  putMany,
  remove,
  removeMany
}

function query<T>(entityType: string, delay = 1000) {
  return new Promise<T[]>((resolve) => {
    const entities = JSON.parse(localStorage.getItem(entityType) || '[]')
    setTimeout(() => resolve(entities), delay)
  })
}

async function get<T extends { _id: string }>(entityType: string, entityId: string): Promise<T> {
  const entities = await query<T>(entityType)
  const entity = entities.find((entity) => entity._id === entityId)
  if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
  return entity
}

async function post<T>(entityType: string, newEntity: T) {
  const entities = await query<T>(entityType)
  entities.push({ _id: _makeId(), ...structuredClone(newEntity) })
  _save(entityType, entities)
  return newEntity
}

async function postMany<T>(entityType: string, newEntities: T[]) {
  const entities = await query<T>(entityType)
  newEntities.forEach((newEntity) => entities.push({ _id: _makeId(), ...structuredClone(newEntity) }))
  _save(entityType, entities)
  return newEntities
}

async function put<T extends { _id: string }>(entityType: string, updatedEntity: T) {
  const entities = await query<T>(entityType)
  const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
  if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
  entities.splice(idx, 1, structuredClone(updatedEntity))
  _save(entityType, entities)
  return updatedEntity
}

async function putMany<T extends { _id: string }>(entityType: string, updatedEntities: T[]) {
  const entities = await query<T>(entityType)
  updatedEntities.forEach((updatedEntity) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
    entities.splice(idx, 1, structuredClone(updatedEntity))
  })
  _save(entityType, entities)
  return updatedEntities
}

async function remove<T extends { _id: string }>(entityType: string, entityId: string) {
  const entities = await query<T>(entityType)
  const idx = entities.findIndex((entity) => entity._id === entityId)
  if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
  entities.splice(idx, 1)
  _save(entityType, entities)
  return entities
}

async function removeMany<T extends { _id: string }>(entityType: string, entityIds: string[]) {
  const entities = await query<T>(entityType)
  entityIds.forEach((entityId) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    entities.splice(idx, 1)
  })
  _save(entityType, entities)
  return entities
}

function _save(entityType: string, entities: any[]) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  let txt = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
