import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)

	useEffect(() => {
		const getBlogs = async () => {
			const response = await blogService.getAll()
			setBlogs(response)
		}
		getBlogs()
	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedBloglistUser')
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const blogFormRef = useRef()

	const addBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility()
			const response = await blogService.create(blogObject)
			console.log('RESPONSE: ',response)
			setBlogs(blogs.concat(response))
			setMessage({ message: `A new blog called ${blogObject.title} by ${blogObject.author} has been added.`, isError: false })
			setTimeout(() => {
				setMessage(null)
			}, 3000)
		} catch (exception) {
			setMessage({ message: 'Error while creating the blog', isError: true })
			setTimeout(() => {
				setMessage(null)
			}, 3000)
		}
	}

	const updateBlog = async (blogObject) => {
		try {
			const response = await blogService.update(blogObject)
			setBlogs(blogs.map(blog => blog.id !== response.id ? blog : response))
			setMessage({ message: `A blog called ${blogObject.title} by ${blogObject.author} has been updated.`, isError: false })
			setTimeout(() => {
				setMessage(null)
			}, 3000)
		} catch (exception) {
			console.log(exception)
		}
	}

	const removeBlog = async (blogObject) => {
		try {
			if (window.confirm(`Remove ${blogObject.title}?`)) {
				await blogService.remove(blogObject)
				setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
				setMessage({ message: `A blog called ${blogObject.title} by ${blogObject.author} has been removed.`, isError: false })
				setTimeout(() => {
					setMessage(null)
				}, 3000)
			}
		} catch (exception) {
			console.log(exception)
		}
	}
	return (
		<div>
			<h2>Bloglist</h2>

			<Notification message={message} />

			{user === null ?
				<LoginForm
					password={password}
					setPassword={setPassword}
					username={username}
					setUsername={setUsername}
					setUser={setUser}
					setMessage={setMessage}
				/>
				:
				<div>
					<p>{user.name} logged in</p>
					<Logout setUser={setUser}/>

					<Togglable buttonLabel='Show blog form' ref={blogFormRef}>
						<BlogForm
							createBlog={addBlog}
						/>
					</Togglable>

					<h3>All blogs</h3>
					{blogs.sort((a, b) => b.likes - a.likes)
						.map(blog =>
							<Blog
								key={blog.id}
								blog={blog}
								updateBlog={updateBlog}
								removeBlog={removeBlog}
								user={user}
							/>
						)
					}
				</div>
			}
		</div>
	)
}

export default App