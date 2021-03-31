import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('creating a new blog with the right details', () => {
	const createBlog = jest.fn()

	const component = render(
		<BlogForm createBlog={createBlog} />
	)

	const form = component.container.querySelector('form')

	const title = component.container.querySelector('#title')
	const author = component.container.querySelector('#author')
	const url = component.container.querySelector('#url')

	fireEvent.change(title, {
		target: { value: 'testing the form' }
	})

	fireEvent.change(author, {
		target: { value: 'Didzis Zvaigzne' }
	})

	fireEvent.change(url, {
		target: { value: 'didzis.net' }
	})
	fireEvent.submit(form)
	const result = createBlog.mock.calls[0][0]
	expect(createBlog.mock.calls).toHaveLength(1)
	expect(result.title).toBe('testing the form')
	expect(result.author).toBe('Didzis Zvaigzne')
	expect(result.url).toBe('didzis.net')
})