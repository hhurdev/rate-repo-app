import { createContext } from 'react'

/* 
By providing an instance of AuthStorage through
context, any component can access the user's access
token without having to create its own instance of AuthStorage
*/
const AuthStorageContext = createContext()

export default AuthStorageContext
