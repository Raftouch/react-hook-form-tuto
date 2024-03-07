import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { schema } from './lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'

type FormFields = z.infer<typeof schema>

// type FormFields = {
//   email: string
//   password: string
// }

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: 'email@test.com',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      throw new Error()
      console.log(data)
    } catch (error) {
      setError('root', { message: 'This email is already taken' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email')}
        // {...register('email', {
        //   // required: true,
        //   required: 'Email is required',
        //   // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        //   // validate: (value) => value.includes('@'),
        //   validate: (value) => {
        //     if (!value.includes('@')) {
        //       return 'Email must include @'
        //     }
        //     return true
        //   },
        // })}
        type="text"
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        {...register('password')}
        // {...register('password', {
        //   // required: true,
        //   required: 'Password is required',
        //   // minLength: 8,
        //   minLength: {
        //     value: 8,
        //     message: 'Password must have at least 8 characters',
        //   },
        // })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Loading...' : 'Submit'}
      </button>
      {errors.root && <p>{errors.root.message}</p>}
    </form>
  )
}

export default App
