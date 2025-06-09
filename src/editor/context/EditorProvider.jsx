/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'

const EditorContext = createContext(null)

export const useEditorInstance = () => useContext(EditorContext)

export const EditorProvider = ({ children }) => {
  const [editor, setEditor] = useState(null)

  return (
    <EditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </EditorContext.Provider>
  )
}
