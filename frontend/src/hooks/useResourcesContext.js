import { ResourcesContext } from "../context/ResourcesContext"
import { useContext } from "react"

export const useResourcesContext = () => {
  const context = useContext(ResourcesContext)

  if(!context) {
    throw Error('useResourcesContext must be used inside a ResourcesContextProvider')
  }

  return context
}