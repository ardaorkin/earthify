import { useState, useEffect, useCallback, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { mapbox_access_token } from '../config/config'

mapboxgl.accessToken = mapbox_access_token

export function useMap(containerId: string, initialStyle: 'light' | 'dark' = 'light') {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [style, setStyleState] = useState(initialStyle)

  useEffect(() => {
    if (mapRef.current) return
    const map = new mapboxgl.Map({ container: containerId, style: `mapbox://styles/mapbox/${style}-v10`, zoom: 1.5 })
    mapRef.current = map
    return () => { map.remove(); mapRef.current = null }
  }, [containerId])

  const setStyle = useCallback((newStyle: 'light' | 'dark') => {
    mapRef.current?.setStyle(`mapbox://styles/mapbox/${newStyle}-v10`)
    setStyleState(newStyle)
    localStorage.setItem('map_style', newStyle)
  }, [])

  const flyTo = useCallback((coordinates: [number, number], zoom = 5) => {
    mapRef.current?.flyTo({ center: coordinates, zoom })
  }, [])

  return { map: mapRef.current, style, setStyle, flyTo }
}
