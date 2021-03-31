import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import Home from './components/Home'
import NavBar from './components/NavBar'
import UserBlogs from './components/UserBlogs'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router,
	Switch, Route, Redirect } from 'react-router-dom'

const App = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
		dispatch(initializeBlogs())
	}, [dispatch])


	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedBloglistUser')
		if (loggedUser) {
			dispatch(setLoggedUser(loggedUser))
		}
	}, [dispatch])

	const login = useSelector(state => state.login)

	return (
		<Router>
			<div>
				<NavBar login={login}/>
				<h2 className='text-4xl mt-3 ml-5'>Bloglist</h2>
				<Notification />
				<Switch>
					<Route path='/blogs/:id'>
						<Blog user={login}/>
					</Route>
					<Route path='/login'>
						<LoginForm />
					</Route>
					<Route path='/users/:id'>
						<UserBlogs />
					</Route>
					<Route path='/users'>
						<Users />
					</Route>
					<Route path='/'>
						{login ? <Home /> : <Redirect to='/login'/>}
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App