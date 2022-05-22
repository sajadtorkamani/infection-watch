import React, { useEffect, useRef, useState } from 'react'
import { Coordinates } from '../types'
import mapImageUrl from '../assets/map.png'
import MapMarker from './MapMarker'
import { subscribeToCoordinates } from '../lib/subscribeToCoordinates'
import Dump from './Dump'

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates[]>([])
  const coordinatesSubscriptionId = useRef<ReturnType<typeof setInterval>>()

  // Simulate subscription to coordinate updates.
  useEffect(() => {
    coordinatesSubscriptionId.current = subscribeToCoordinates(
      (newCoordinates) => setCoordinates(newCoordinates)
    )

    // Stop listening for updates when component unmounts.
    return () => {
      clearInterval(coordinatesSubscriptionId.current)
    }
  }, [])

  return (
    <>
      <h1 className="text-3xl mb-6">Dunder Mifflin Office</h1>

      <div className="w-[1280px] h-[700px] relative">
        <img
          src={mapImageUrl}
          alt="Map"
          className="absolute top-0 right-0 bottom-0 left-0"
        />

        {coordinates.map((coords, index) => (
          <MapMarker key={index} coordinates={coords} />
        ))}
      </div>

      <Dump title="Coordinates" value={coordinates} expanded />
    </>
  )
}

export default Map
