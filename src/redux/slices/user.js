import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'


const BASE_URL = '/user';



export const autoLogin = createAsyncThunk('user/autoLogin', async (data, thunkAPI) => {
 const user = JSON.parse(localStorage.getItem('user'))
 return user
})



export const register = createAsyncThunk('user/new', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/new`, data)
    if (response.data){
      localStorage.setItem('user', JSON.stringify({
        userName: response.data.userName,
        token: response.data.token
      }))
      return({
        userName: response.data.userName,
      })
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const login = createAsyncThunk('user/login', async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data)
    if (response.data){
      localStorage.setItem('user', JSON.stringify({
        userName: response.data.userName,
        token: response.data.token
      }))
      return({
        userName: response.data.userName,
        token: response.data.token
      })
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const logout = createAsyncThunk('user/logout', (data, thunkAPI) => {
  try {
    localStorage.removeItem('user')
    return null   
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isError: false,
    isLoading: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isLoading = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state) => {
      state.isLoading = true
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    })
    .addCase(autoLogin.pending, (state) => {
      state.isLoading = true
    })
    .addCase(autoLogin.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })
    .addCase(autoLogin.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    })
    .addCase(logout.pending, (state) => {
      state.isLoading = true
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })
    .addCase(logout.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    })
    
  }
})


export const {reset} = userSlice.actions
export default userSlice.reducer