import type { SVGProps } from "react"

export function BloodDrop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L8 10C4 12 4 18 8 20C16 24 20 12 12 2Z" />
      <path fill="none" stroke="currentColor" strokeWidth="1" d="M12 8C10 12 10 14 12 16C14 14 14 12 12 8Z" />
    </svg>
  )
}
