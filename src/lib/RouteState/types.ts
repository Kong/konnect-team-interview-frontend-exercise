import type { LocationQueryValue } from 'vue-router'

export type RouteStateValue = LocationQueryValue | LocationQueryValue[]

export type Serialize<T> = (value: T) => RouteStateValue
export type Deserialize<T> = (value: RouteStateValue, defaultValue: T) => T

export interface RouteStateOptions<T> {
  replace?: boolean
  omitEmpty?: boolean
  serialize?: Serialize<T>
  deserialize?: Deserialize<T>
}