import { Coordinates } from '../types'

// Hard-coded for simplicity to keep the marker within the map bounds.
// In practice, we could overlay an image over Google Maps or an equivalent
// map software. Something like this:
// https://developers.google.com/maps/documentation/javascript/examples/maptype-image-overlay
const mapCoordinates = {
  startX: 15,
  endX: 1200,
  startY: 15,
  endY: 550,
}

/**
 * @param callback - Function that's called the with the new coordinates.
 * @param pollIntervalMs - How often to poll for new updates (assuming we're
 * polling instead of listening for server-side events).
 */
export function subscribeToCoordinates(
  callback: (coordinates: Coordinates[]) => void,
  pollIntervalMs: number
) {
  // Dummy initial coordinates
  let coordinates: Coordinates[] = [
    { x: mapCoordinates.startX, y: mapCoordinates.startY },
  ]

  // Simulate update of coordinates.
  function fetchCoordinates() {
    coordinates = coordinates.map((coords) => getNewCoordinates(coords))
    callback(coordinates)
  }

  // Fetch coordinates right away
  fetchCoordinates()

  return setInterval(fetchCoordinates, pollIntervalMs)
}

function getNewCoordinates({ x, y }: Coordinates): Coordinates {
  const isAtTopLine = x <= mapCoordinates.endX && y === mapCoordinates.startY
  const hasReachedBottomLine = y >= mapCoordinates.endY
  const isAtRightEdge =
    x >= mapCoordinates.endX &&
    y >= mapCoordinates.startY &&
    y <= mapCoordinates.endY
  const isAtLeftEdge = x === mapCoordinates.startX

  switch (true) {
    case isAtTopLine:
      return moveRight(x, y)
    case isAtRightEdge:
      return moveDown(x, y)
    case hasReachedBottomLine && !isAtLeftEdge:
      return moveLeft(x, y)
    default:
      return moveUp(x, y)
  }
}

const STEP_SIZE = 1

function moveRight(x: number, y: number) {
  return { x: x + STEP_SIZE, y }
}

function moveDown(x: number, y: number) {
  return { x, y: y + STEP_SIZE }
}

function moveLeft(x: number, y: number) {
  return { x: x - STEP_SIZE, y }
}

function moveUp(x: number, y: number) {
  return { x, y: y - STEP_SIZE }
}
