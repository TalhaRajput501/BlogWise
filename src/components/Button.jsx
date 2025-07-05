import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = '',
    textColor = 'text-white',
    className = '',
    onclick,
    ...props

}) {
  return (
    <button
    type={type}
    className={` ${bgColor} ${textColor} ${className}`}
    {...props}
    onClick={onclick}
    >
      {children}
    </button>
  )
}

export default Button
