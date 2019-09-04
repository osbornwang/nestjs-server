export interface Banner {
  value: string[]
  index: number
}

export interface LocationInfo {
  name: string
  address: string
  latitude: number
  longitude: number
  tip: string
}

export const parseBannerValue = (field: string): Banner => {
  let banner: Banner
  try {
    banner = JSON.parse(field)
  } catch {
    banner = { value: [field], index: 0 }
  }
  return banner
}

export const parseAddressValue = (field: string): LocationInfo => {
  let address: LocationInfo
  try {
    address = JSON.parse(field)
  } catch {
    address = {
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
      tip: field,
    }
  }
  return address
}
