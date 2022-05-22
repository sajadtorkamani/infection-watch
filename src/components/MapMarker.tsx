import React, { useRef } from 'react'
import mapMarkerIconUrl from '../assets/map-marker-icon.jpeg'
import { Coordinates } from '../types'

interface Props {
  coordinates: Coordinates
  mapElement: HTMLElement | null
}

const MapMarker: React.FC<Props> = ({ coordinates, mapElement }) => {
  const domElement = useRef<HTMLImageElement>(null)

  const styles = {
    top: `${coordinates.y}px`,
    left: `${coordinates.x}px`,
  }

  return (
    <img
      src={mapMarkerIconUrl}
      alt={`${coordinates.x}, ${coordinates.y}`}
      className="w-[32px] absolute"
      style={styles}
      ref={domElement}
    />
  )
}

export default MapMarker
