import { createSlice } from "@reduxjs/toolkit";

const mapInitialState = {
    epoque: [1781,2024],
    selectedBuilding: null,
    adress: '',
    zoom: 11,
    description: true,
    volume: false
  };

const mapSlice = createSlice({
    name: 'map',
    initialState: mapInitialState,
    reducers: {
        setEpoque(state, action) {
            state.epoque = action.payload
        },
        selectBuilding(state, action) {
            state.selectedBuilding = action.payload
        },
        showDescription(state, action) {
            state.description = action.payload
        },
        setVolume(state, action) {
            state.volume = action.payload
        }
    }
})

export const {
    setEpoque,
    selectBuilding,
    showDescription,
    setVolume
} = mapSlice.actions

export default mapSlice.reducer