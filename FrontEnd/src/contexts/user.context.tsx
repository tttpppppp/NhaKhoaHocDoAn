import { useContext, createContext, useState, useEffect } from 'react'
import { extractAccessToken, getAccessTokenToLS } from '../utils/auth'
import { AppContext } from './app.context'

interface User {
  email: string
  role: string
}

interface UserContextInterface {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const initialUserContext: UserContextInterface = {
  user: null,
  setUser: () => {}
}

export const UserContext = createContext<UserContextInterface>(initialUserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(initialUserContext.user)
  const { isAuthenticated } = useContext(AppContext)

  useEffect(() => {
    const token = getAccessTokenToLS()
    if (token) {
      const decodedToken = extractAccessToken(token)
      setUser({
        email: decodedToken.sub || '',
        role: decodedToken.role[0]
      })
    } else {
      setUser(null)
    }
  }, [isAuthenticated])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
