import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//Stores the URL we're accessing. If you change the port in Part 1, be sure to change it here as well.
const fetchURL = "http://localhost:7777/users"


export const fetchUsers = createAsyncThunk( 
  "users/getUsers" , 
  async() => {
     return await fetch(fetchURL)
    .then(data => data.json())
    .catch( err => console.log(err))
    
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    isPending: true,
  },
  reducers: {

    //Handles the sort logic and returns a new state instead of modifying it
    sortBy: (state, action) =>{
      state.data = state.data.slice().sort((valueA, valueB)=>{
        //This maintains the sort for numbers
        if(action.payload === "id" || action.payload === "postal" ||action.payload === "phone"){
          return Number(valueA[`${action.payload}`]) - Number(valueB[`${action.payload}`])
        }
        //this maintains the sort for strings
        if (valueA[`${action.payload}`] <  valueB[`${action.payload}`]) {
          return -1;
        }
        if (valueA[`${action.payload}`] >  valueB[`${action.payload}`]) {
          return 1;
        }
      
        return 0;
      })
    },
    reverseSortBy: (state, action) =>{
      state.data = state.data.slice().sort((valueA, valueB)=>{
        console.log(action.payload)
        if(action.payload === "id" || action.payload === "postal" ||action.payload === "phone"){
          return Number(valueB[`${action.payload}`]) - Number(valueA[`${action.payload}`])
        }
        if (valueA[`${action.payload}`] <  valueB[`${action.payload}`]) {
          return 1;
        }
        if (valueA[`${action.payload}`] >  valueB[`${action.payload}`]) {
          return -1;
        }
      
        return 0;
      })
    }

  },
  extraReducers: builder => {
    builder
    //Maintains the state of the async calls made by the fetchUsers function
    .addCase(fetchUsers.fulfilled, (state, action) =>{
      console.log("fulfilled")
      state.data = (action.payload.slice().sort((a,b) => Number(a[`id`]) - Number(b[`id`])))
      state.isPending = false
    })
    .addCase(fetchUsers.pending, (state) => {
      state.isPending = true
    })
    .addCase(fetchUsers.rejected, (state) => {
      console.log("Rejected")
    })


  }

  
})


export const selectUserData = (state) => state.users.data
export const selectUserPendingStatus = (state) => state.users.isPending

export const {sortBy, reverseSortBy} = usersSlice.actions

export default usersSlice.reducer
