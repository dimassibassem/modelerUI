import React from 'react'

const ParallelogramShape = ({ width, height }: { width: number, height: number }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
    <path fill='none' stroke='currentColor' strokeWidth='2'
          d='M5.586 6.45A2 2 0 0 1 7.509 5h11.84a2 2 0 0 1 1.923 2.55l-2.858 10A2 2 0 0 1 16.491 19H4.651a2 2 0 0 1-1.923-2.55l2.858-10Z' />
  </svg>
)
const DiamondShape = ({ width, height }: { width: number, height: number }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 256 256'>
    <path fill='currentColor'
          d='m238.8 113.9l-96.7-96.7a19.8 19.8 0 0 0-28.2 0l-96.7 96.7a19.8 19.8 0 0 0 0 28.2l96.7 96.7a19.8 19.8 0 0 0 28.2 0l96.7-96.7a19.8 19.8 0 0 0 0-28.2ZM128 219l-91-91l91-91l91 91Z' />
  </svg>
)
const TrapezoidShape = ({ width, height }: { width: number, height: number }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 48 48'>
    <path fill='none' stroke='currentColor' strokeWidth='4'
          d='M31.794 8H16.206a3 3 0 0 0-2.864 2.105l-8.125 26A3 3 0 0 0 8.081 40h31.838a3 3 0 0 0 2.864-3.895l-8.125-26A3 3 0 0 0 31.794 8Z' />
  </svg>
)
const CircleShape = ({ width, height }: { width: number, height: number }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
    <path fill='currentColor'
          d='M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z' />
  </svg>
)
const OvalShape = ({ width, height }: { width: number, height: number }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 48 48'>
    <g transform='rotate(90 24 24)'>
      <ellipse cx='24' cy='24' fill='none' stroke='currentColor' strokeWidth='4' rx='14' ry='20' />
    </g>
  </svg>
)
const SquareShape = ({ width, height }: { width: number, height: number }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24'>
    <g transform='rotate(90 12 12)'>
      <path fill='currentColor' d='M3 21V3h18v18H3Zm2-2h14V5H5v14Zm0 0V5v14Z' />
    </g>
  </svg>
)

export { ParallelogramShape, DiamondShape, TrapezoidShape, CircleShape, OvalShape, SquareShape }
