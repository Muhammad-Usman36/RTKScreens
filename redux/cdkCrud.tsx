import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

export const cdkCrudApi = createApi({
  reducerPath: 'cdkCrudApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cdk-crud-test.onrender.com/' }),
  endpoints: (builder) => ({
    getUser: builder.query<Pokemon, string>({
      query: () => `users`,
    }),
    addUser: builder.mutation<any, any>({
      query(body) {
        return {
          url: `users`,
          method: 'POST',
          body,
        }
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation<any, any>({
      query(body) {         
        return {
          url: `/users/${body.id}`,
          method: 'PUT',
         body:body
        }
      },
    }),
  }),
})

export const {useUpdateUserMutation, useGetUserQuery,useAddUserMutation,useDeleteUserMutation } = cdkCrudApi