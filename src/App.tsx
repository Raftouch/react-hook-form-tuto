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
      <input {...register('email')} type="text" placeholder="Email" />
      <input {...register('password')} type="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  )
}

export default App
