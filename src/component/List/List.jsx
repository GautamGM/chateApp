import React from 'react'
import UserInfo from './UserInfo/UserInfo'
import ChateList from './ChateList/ChateList'

function User() {
  return (
    <div className='w-[25%] p-2  '>
      <UserInfo/>
      <ChateList/>
    </div>
  )
}

export default User