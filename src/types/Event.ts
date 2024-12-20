/**
 * Represents a geographical position with latitude and longitude
 */
export interface Position {
  latitude: number;
  longitude: number;
}

/**
 * Represents an event with its location and details
 */
export interface Event {
  id: string;
  position: Position;
  title?: string;
  description?: string;
  date?: string;
  createdBy?: string;
}

/**
 * Map region type for defining the visible area of the map
 */
export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
