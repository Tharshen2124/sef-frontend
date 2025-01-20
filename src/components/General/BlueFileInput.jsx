import React, { useState, useRef } from 'react'
import { Upload } from 'lucide-react'

export function BlueFileInput({ onChange }) {
  const [fileName, setFileName] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null
    setFileName(file ? file.name : null)
    if (onChange) {
      onChange(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div 
      className="relative w-full h-20 border-2 border-blue-300 rounded-lg 
               bg-blue-50 hover:bg-blue-100 transition-colors duration-200 ease-in-out
               flex items-center justify-center cursor-pointer overflow-hidden
               shadow-sm hover:shadow-md"
      onClick={handleClick}
    >
      <input
        type="file"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {fileName ? (
        <div className="text-blue-600 text-center px-4">
          <p className="font-medium text-sm">{fileName}</p>
          <p className="text-xs text-blue-500 mt-0.5">Click to change file</p>
        </div>
      ) : (
        <div className="text-blue-600 text-center flex items-center">
          <Upload className="mr-2" size={20} />
          <div>
            <p className="font-medium text-sm">Choose a file</p>
            <p className="text-xs text-blue-500">or drag and drop it here</p>
          </div>
        </div>
      )}
    </div>
  )
}
