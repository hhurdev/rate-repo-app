import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log('Error in creating user useMutation', error)
    },
  })

  const createUser = async (createUserInput) => {
    try {
      const { data } = await mutate({
        variables: {
          user: createUserInput,
        },
      })
      return data
    } catch (error) {
      console.error('Error creating user:', error)
      return { error }
    }
  }

  return [createUser, result]
}

export default useCreateUser
