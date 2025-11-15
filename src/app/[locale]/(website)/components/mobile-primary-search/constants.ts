/**
 * Constants for mobile search component
 */

export const SEARCH_STEPS = {
  CITY: 0,
  UNIT_TYPE: 1,
  DATE: 2,
} as const

export const TRANSITION_TIMEOUT = 300

export const DRAWER_STYLES = {
  OVERLAY_Z_INDEX: 100,
  CONTENT_Z_INDEX: 101,
  HANDLE_WIDTH: 90,
  HANDLE_HEIGHT: 4,
} as const

export const DEFAULT_CITY_ID = "0"

export const DATE_FORMAT = "YYYY-MM-DD"
