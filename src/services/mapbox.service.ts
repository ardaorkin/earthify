/*
 Copyright (C) 2020  Arda Örkin
 This file is part of Earthify - GNU GPL v3
*/

import type { GeocodingResult } from '../types'
import { mapbox_access_token } from '../config/config'

const API_BASE = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

class MapboxService {
  async reverseGeocode(lng: number, lat: number): Promise<GeocodingResult | null> {
    const response = await fetch(`${API_BASE}/${lng},${lat}.json?access_token=${mapbox_access_token}`)
    return response.json()
  }

  async searchPlace(query: string): Promise<GeocodingResult | null> {
    const response = await fetch(`${API_BASE}/${encodeURIComponent(query)}.json?access_token=${mapbox_access_token}`)
    return response.json()
  }
}

export const mapboxService = new MapboxService()
