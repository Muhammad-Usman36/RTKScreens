// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
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
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
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
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useUpdateUserMutation, useGetUserQuery,useAddUserMutation,useDeleteUserMutation } = cdkCrudApi