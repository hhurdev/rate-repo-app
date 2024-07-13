import { SignInContainer } from '../../components/SignIn'
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button

      const onSubmit = jest.fn()
      render(<SignInContainer onSubmit={onSubmit} />)
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'Kalle')
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')
      //React Native Testing Library returns the smallest, closest element that contains this text (Text element)
      //The event bubbles up to the nearest pressable ancestor
      fireEvent.press(screen.getByText('Sign in'))

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'Kalle',
          password: 'password',
        })
      })
    })
  })
})
