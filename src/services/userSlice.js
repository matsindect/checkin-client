import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const signupUser = createAsyncThunk(
    "users/signup",
    async ({ user_name, user_phone,user_email_address, user_password, user_Confirmpassword,visitor, newsletter }, thunkAPI) => {
      try {
        const response = await fetch(
          "http://localhost:8086/api/v1/users/signup",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_name, user_phone,user_email_address, user_password, user_Confirmpassword,visitor, newsletter }),
          }
        )
        let data = await response.json()
        console.log("data", data)
        if (data.status === 'success') {
          localStorage.setItem("token", data.token)
          return { ...data, username: user_name, user_email_address: user_email_address }
        } else {
          return thunkAPI.rejectWithValue(data)
        }
      } catch (e) {
        console.log("Error", e.response.data)
        return thunkAPI.rejectWithValue(e.response.data)
      }
    }
  )

  export const loginUser = createAsyncThunk(
    "users/login",
    async ({ user_email_address, user_password }, thunkAPI) => {
      try {
        const response = await fetch(
          "http://localhost:8086/api/v1/users/login",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_email_address,
              user_password,
            }),
          }
        )
        let data = await response.json()
        console.log("response", data)
        if (data.status === 'success') {
          localStorage.setItem("token", data.token)
          return data
        } else {
          return thunkAPI.rejectWithValue(data)
        }
      } catch (e) {
        console.log("Error", e.response.data)
        thunkAPI.rejectWithValue(e.response.data)
      }
    }
  )

  export const fetchUserBytoken = createAsyncThunk(
    'users/fetchUserByToken',
    async ({ token }, thunkAPI) => {
      try {
        const response = await fetch(
          'http://localhost:8086/api/v1/users/verify-user',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: "Bearer "+token,
              'Content-Type': 'application/json',
            },
          }
        );
        let data = await response.json();
        console.log('data', data, response.status);
  
        if (data.status === 'success') {
          return { ...data };
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e) {
        console.log('Error', e.response.data);
        return thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );
  
export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    user_email_address: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    // Reducer comes here
    clearState: (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = false;
  
        return state;
      },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
          state.isFetching = false;
          state.isSuccess = true;
          state.user_email_address = payload.user.user_email_address;
          state.username = payload.user.user_name;
        },
        [signupUser.pending]: (state) => {
          state.isFetching = true;
        },
        [signupUser.rejected]: (state, { payload }) => {
          state.isFetching = false;
          state.isError = true;
          state.errorMessage = payload.message;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.user_email_address = payload.user.user_email_address;
            state.username = payload.user.user_name;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
          },
          [loginUser.rejected]: (state, { payload }) => {
            console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
          },
          [loginUser.pending]: (state) => {
            state.isFetching = true;
          },
          [fetchUserBytoken.pending]: (state) => {
            state.isFetching = true;
          },
          [fetchUserBytoken.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
      
            state.user_email_address = payload.user.user_email_address;
            state.username = payload.user.user_name;
          },
          [fetchUserBytoken.rejected]: (state) => {
            console.log('fetchUserBytoken');
            state.isFetching = false;
            state.isError = true;
          },
    },
})
export const { clearState } = userSlice.actions;
export const userSelector = state => state.user