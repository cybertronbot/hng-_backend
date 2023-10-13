import { createContext, useReducer } from 'react'

export const ResourcesContext = createContext()

export const resourcesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESOURCES':
      return { 
        resources: action.payload 
      }
    case 'CREATE_RESOURCES':
      return { 
        resources: [action.payload, ...state.resources] 
      }
    case 'DELETE_RESOURCES':
      return { 
        resources: state.resources.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const ResourcesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resourcesReducer, { 
    resources: null
  })
  
  return (
    <ResourcesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ResourcesContext.Provider>
  )
}