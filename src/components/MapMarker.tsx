import React from 'react'
import mapMarkerIconUrl from '../assets/map-marker-icon.jpeg'
import { Coordinates } from '../types'

interface Props {
  coordinates: Coordinates
}

const MapMarker: React.FC<Props> = ({ coordinates }) => {
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
    />
  )
}

export default MapMarker
