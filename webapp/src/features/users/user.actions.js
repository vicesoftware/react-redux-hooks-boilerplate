import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../infrastructure/http'

export const fetchAllUsers = createAsyncThunk('users/getAll', async () => {
	const response = await http.get('users?page=1&per_page=100')
	return response
})
