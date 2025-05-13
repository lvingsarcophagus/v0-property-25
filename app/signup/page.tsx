import SignupForm from '../components/SignupForm'

export default function SignupPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Sign Up for PropertyFinder</h1>
      <div className="max-w-md mx-auto">
        <SignupForm />
      </div>
    </div>
  )
}

