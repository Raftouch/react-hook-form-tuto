import { SubmitHandler, useForm } from 'react-hook-form'

type FormFields = {
  email: string
  password: string
}

function App() {
  const { register, handleSubmit } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: true,
          // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          validate: (value) => value.includes('@'),
        })}
        type="text"
        placeholder="Email"
      />
      <input
        {...register('password', {
          required: true,
          minLength: 8,
        })}
        type="password"
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default App
