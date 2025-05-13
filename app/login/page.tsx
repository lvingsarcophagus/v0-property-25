import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Login to PropertyFinder</h1>
      <div className="max-w-md mx-auto">
        <LoginForm />
      </div>
    </div>
  )
}

