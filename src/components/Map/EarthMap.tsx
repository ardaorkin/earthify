import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { mapbox_access_token } from '../../config/config'
import './EarthMap.css'

interface EarthMapProps { style: 'light' | 'dark'; onCountryClick?: (country: string) => void; onMapReady?: (map: mapboxgl.Map) => void }

mapboxgl.accessToken = mapbox_access_token

export function EarthMap({ style, onCountryClick, onMapReady }: EarthMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return
    const map = new mapboxgl.Map({ container: mapContainer.current, style: `mapbox://styles/mapbox/${style}-v10`, zoom: 1.5 })
    mapRef.current = map
    map.on('load', () => onMapReady?.(map))
    map.on('click', async (e) => {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${mapboxgl.accessToken}`)
      const result = await response.json()
      const country = result.features?.find((f: { place_type: string[] }) => f.place_type[0] === 'country')
      if (country) onCountryClick?.(country.text)
    })
    return () => { map.remove(); mapRef.current = null }
  }, [])

  useEffect(() => { mapRef.current?.setStyle(`mapbox://styles/mapbox/${style}-v10`) }, [style])

  return <div ref={mapContainer} className="earth-map" />
}
