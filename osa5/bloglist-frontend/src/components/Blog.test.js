import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'

describe('Blog functionality', () => {
	let component
	const mockHandler = jest.fn()

	beforeEach(() => {
		const blog = {
			title: 'This is ran before each individual test',
			author: 'Didzis Zvaigzne',
			url: 'didzis.net',
			likes: 122,
			user: {
				username: 'didzis1'
			}
		}

		const user = {
			username: 'didzis1'
		}

		component = render(
			<Blog blog={blog} user={user} updateBlog={mockHandler}/>
		)
	})

	test('rendered blog shows title and author', () => {
		expect(component.container).toHaveTextContent(
			'This is ran before each individual test'
		)

		expect(component.container).not.toHaveTextContent(
			'didzis.net'
		)

		expect(component.container).not.toHaveTextContent(
			'122 likes'
		)

		// component.debug()
	})


	test('blog renders also url and likes when show button is clicked', () => {
		// component.debug()

		const showButton = component.container.querySelector('.showMore')
		fireEvent.click(showButton)

		expect(component.container).toHaveTextContent(
			'didzis.net'
		)

		expect(component.container).toHaveTextContent(
			'122 likes'
		)
		// component.debug()
	})

	test('clicking like button two times, calls event handler twice', () => {
		const showButton = component.container.querySelector('.showMore')
		fireEvent.click(showButton)

		const likeButton = component.container.querySelector('.likeButton')
		fireEvent.click(likeButton)
		fireEvent.click(likeButton)

		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})
