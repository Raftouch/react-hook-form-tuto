import { SubmitHandler, useForm } from 'react-hook-form'

type FormFields = {
  email: string
  password: string
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          // required: true,
          required: 'Email is required',
          // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          // validate: (value) => value.includes('@'),
          validate: (value) => {
            if (!value.includes('@')) {
              return 'Email must include @'
            }
            return true
          },
        })}
        type="text"
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        {...register('password', {
          // required: true,
          required: 'Password is required',
          // minLength: 8,
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Loading...' : 'Submit'}
      </button>
    </form>
  )
}

export default App
