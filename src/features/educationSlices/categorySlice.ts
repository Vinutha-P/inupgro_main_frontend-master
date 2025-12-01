import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
interface PathState {
  categoryPath: string;
}

const initialState: PathState = {
    categoryPath: ''
};

// Create the slice
const pathSlice = createSlice({
  name: 'categoryPath',
  initialState,
  reducers: {
    // Reducer to update the path
    setCategoryPath: (state, action: PayloadAction<string>) => {
      state.categoryPath = action.payload;
    }
  }
});

// Export the action to set the path
export const { setCategoryPath } = pathSlice.actions;

// Export the reducer to be added to the store
export default pathSlice.reducer;
