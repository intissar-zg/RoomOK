import '../App.css';
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import UserList from '../components/UserList'
import { useDispatch } from 'react-redux'
import {getUsers} from '../actions/userAction'
import {Link} from 'react-router-dom';
import {logout} from '../actions/authAction'
import Button from '@material-ui/core/Button';

import Filter from '../components/Filter';

const Users = ({history}) => {
    const dispatch = useDispatch()
    const role = useSelector(state => state.authReducer.user.role)
useEffect(() => {
    dispatch(getUsers())
}, [])

const users = useSelector(state => state.adminReducer.users)
const isAuth = useSelector(state => state.authReducer.isAuth)
//const users = useSelector(state => state.authReducer.user)

const [search, setsearch] = useState("")
  const searchhandle=(search)=>{
    setsearch(search)

  } 
    return (
        <div>
            <h1>LIST OF ALL USERS</h1>
            { isAuth ?
                        <Button color="inherit" onClick={()=>dispatch(logout(history))}><Link to='/Register'>Logout</Link></Button>

            : (<><Button color="inherit"><Link to='/Login'>Login</Link></Button>
            <Button color="inherit"><Link to='/Register/instructor'>Register as instructor</Link></Button>
            <Button color="inherit"><Link to='/Register/student'>Register as student</Link></Button></>)
            }
             <Filter search={search}   searchkey={searchhandle} ></Filter> 
            <table>
 <tr >
    <th>Firstname</th>
    <th>Lastname</th>
    <th>email</th>
    <th>role</th>
  </tr>
         {users.filter(el=>el.role.toLowerCase().includes(search.toLowerCase())).map(user=><UserList key={user._id} user={user}></UserList>)}  
         </table>
        </div>
    )
}


export default Users
