"use client"
import { ComponentRef, ReactNode, useRef } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { TRANSITION_TIMEOUT } from "../constants"

interface StepTransitionProps {
  step: number
  children: ReactNode
}

/**
 * Wrapper component for step transitions
 */
export const StepTransition = ({ step, children }: StepTransitionProps) => {
  const nodeRef = useRef<ComponentRef<"div">>(null)

  return (
    <SwitchTransition>
      <CSSTransition
        key={step}
        nodeRef={nodeRef}
        addEndListener={(done: () => void) => {
          nodeRef.current?.addEventListener("transitionend", done, false)
        }}
        timeout={TRANSITION_TIMEOUT}
        classNames="fade-slide"
      >
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    </SwitchTransition>
  )
}
