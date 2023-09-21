import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import data from "./data.json"
import usdata from "./us_data.json"

interface CounterState {
    modalTitle: string
    contacts: any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    contact: any | undefined,
    contactsId: number[],
    totalContacts: number
    pagination: {
        totalPage: number,
        activePage: number
    }
}


const initialState: CounterState = {
    modalTitle: 'All Contacts',
    contacts: 0,
    loading: 'idle',
    totalContacts: 0,
    contact: undefined,
    contactsId: [],
    pagination: {
        totalPage: 0,
        activePage: 1
    }
}

const token = import.meta.env.VITE_AUTH_TOKEN

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (args: {
        page: number
        countryId?: number | undefined,
    }) => {
        const { page, countryId } = args
        console.log(token)
        const response = await axios.get(
            'https://api.dev.pastorsline.com/api/contacts.json',
            {
                // timeout: 2000,
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    companyId: 171,
                    page: page || 1,
                    countryId: countryId || null
                }
            })
        // const response = countryId ? { data: usdata } : { data }
        return response.data
    }
)

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setModalTitle: (state, action) => {
            state.modalTitle = action.payload
        },
        resetContacts: (state) => {
            state.totalContacts = 0
            state.pagination.totalPage = 1
            state.pagination.activePage = 1
            state.contactsId = []
        },
        setContactById: (state, action) => {
            state.contact = action.payload
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchContacts.pending, (state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchContacts.rejected, (state) => {
            state.loading = 'failed'
            state.contacts = {}
        })
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.contacts = { ...state.contacts, ...action.payload }
            state.contactsId = state.contactsId.concat(action.payload.contacts_ids)
            state.totalContacts = action.payload.total
            state.pagination.totalPage = Math.ceil(action.payload.total / 20)
            state.pagination.activePage = 1
        })
    },
})

export const { resetContacts, setModalTitle, setContactById } = contactsSlice.actions

export default contactsSlice.reducer