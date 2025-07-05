import React, { useId } from 'react' 

const Input = React.forwardRef(function Input({
  placeholder = 'default',
  type = 'text',
  label,
  className = '',
  labelClassName= '',
  ...props

}, ref) {

  const id = useId()
  return (
    <div 
    // className='border-3 border-r-emerald-600 '
    >
      {
        label && <label
        className={ `mr-2 ${labelClassName}`} 
        htmlFor={id}
        >
          {`${label}`}
        </label>
      }

      <input
      type={type} 
      placeholder={placeholder}
      className={`border-1   ${className}`}
      ref={ref}
      id={id} 
      {...props}
      />
    </div>
  )
})

export default Input
// It is also a way to wrap it in forwardRef instead of doing this in first at the time of function declaration
// export default React.forwardRef(Input)

