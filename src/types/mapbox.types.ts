/*
 Copyright (C) 2020  Arda Örkin
 This file is part of Earthify - GNU GPL v3
*/

export interface GeocodingGeometry {
  type: string
  coordinates: [number, number]
}

export interface GeocodingFeature {
  id: string
  type: string
  place_type: string[]
  text: string
  place_name: string
  center: [number, number]
  geometry: GeocodingGeometry
  properties: Record<string, unknown>
}

export interface GeocodingResult {
  type: string
  features: GeocodingFeature[]
  attribution: string
}
