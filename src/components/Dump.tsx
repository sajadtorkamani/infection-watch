import React, { useState } from 'react'

interface Props {
  title: string
  value: any
  expanded?: boolean
}

const Dump: React.FC<Props> = ({ title, value, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded)
  const toggleValues = () => setIsExpanded(!isExpanded)

  return (
    <div className="bg-gray-100 text-sm mt-4 p-3">
      <div className="flex items-center cursor-pointer" onClick={toggleValues}>
        {title}
        <span className="text-gray-700 font-[10px] ml-1.5">
          {isExpanded ? '▲' : '▼'}
        </span>
      </div>

      {isExpanded && (
        <pre className="mt-2.5">{JSON.stringify(value, null, 2)}</pre>
      )}
    </div>
  )
}

export default Dump
