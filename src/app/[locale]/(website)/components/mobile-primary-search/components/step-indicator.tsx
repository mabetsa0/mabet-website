"use client"
import { DRAWER_STYLES } from "../constants"

/**
 * Step indicator component (the handle at the top of the drawer)
 */
export const StepIndicator = () => {
  return (
    <div className="flex justify-center pt-0.5">
      <div
        className="rounded bg-gray-300"
        style={{
          height: `${DRAWER_STYLES.HANDLE_HEIGHT}px`,
          width: `${DRAWER_STYLES.HANDLE_WIDTH}px`,
        }}
        aria-hidden="true"
      />
    </div>
  )
}
