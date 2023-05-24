import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'



const BASE_URL = '/debt';


export const getDebt = createAsyncThunk('debt', async (data, thunkAPI) => {
  try {
    const response = await axios.get(`${BASE_URL}/get`,
    {headers: {
     'Authorization': `Bearer ${data}`
    }} ) 
    if (response.data){
      return response.data
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const newDebt = createAsyncThunk('debt/new', async (data, thunkAPI) => {
  try {
  const response = await axios.post(`${BASE_URL}/new`, data.debt,
  {headers: {
   'Authorization': `Bearer ${data.token}`
  }})
  if (response.data){
    return response.data
  }    
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }

})




export const deleteDebt = createAsyncThunk('debt/delete', async (data, thunkAPI) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${data.debt}`, data.debt,
    {headers: {
     'Authorization': `Bearer ${data.token}`
    }})
    if (response.data){
      return response.data
    }
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const updateDebt = createAsyncThunk('debt/update', async (data, thunkAPI) => {
  console.log(data.data.updateDept)
 try {
  const response = await axios.put(`${BASE_URL}/update/${data.data.debt}`, data.data.updateDept,
  {headers: {
   'Authorization': `Bearer ${data.token}`
  }} )
  console.log(response.data, 'heksbfkherbfhjk')
  if (response.data){
    return response.data
  }
 } catch (error) {
  const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
  return thunkAPI.rejectWithValue(message)
 }
})


export const resetDebt = createAsyncThunk('debt/reset', async (data, thunkAPI) => {
 return []
})



export const debtSlice = createSlice({
  name: 'debt',
  initialState: {
    debt: [],
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
    .addCase(newDebt.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(newDebt.fulfilled, (state, action) => {
      state.isLoading = false
      state.debt = action.payload
    })
    .addCase(newDebt.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(deleteDebt.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(deleteDebt.fulfilled, (state, action) => {
      state.isLoading = false
      state.debt = action.payload
    })
    .addCase(deleteDebt.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(getDebt.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(getDebt.fulfilled, (state, action) => {
      state.isLoading = false
      state.debt = action.payload
    })
    .addCase(getDebt.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(updateDebt.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(updateDebt.fulfilled, (state, action) => {
      state.isLoading = false
      state.debt = action.payload
    })
    .addCase(updateDebt.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(resetDebt.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(resetDebt.fulfilled, (state, action) => {
      state.isLoading = false
      state.debt = action.payload
    })
    .addCase(resetDebt.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  }
})



export const {reset} = debtSlice.actions
export default debtSlice.reducer




