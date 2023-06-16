import React, { useContext } from 'react'
import {Context} from '../Context'

export default function Lobby() {
    const {IsAuth} = useContext(Context)
    const [user] = IsAuth
  return (
    <h1>Привет{user.person && ', '+ user.person} :)</h1>
  )
}
