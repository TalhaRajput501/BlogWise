import React from 'react'

function Select({
    className = '',
    options, 
    optionClassName,
    ...props
    
} , ref) {

    return (
        <div className='w-full'>
             
            <select 
            className={` ${className}`}
            {...props}
            >
                {options?.map((option) => (
                    <option 
                    value={option} 
                    key={option}
                    className={`${optionClassName}`}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
