"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../context/AuthContext"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

const plans = [
  {
    name: "Basic",
    price: "€9.99",
    interval: "month",
    description: "Perfect for individual agents",
    features: [
      "Up to 10 listings",
      "Basic analytics",
      "Email support",
      "Standard visibility",
    ],
  },
  {
    name: "Professional",
    price: "€24.99",
    interval: "month",
    description: "For growing real estate businesses",
    features: [
      "Up to 50 listings",
      "Advanced analytics",
      "Priority support",
      "Featured listings",
      "Property insights",
      "Client management",
    ],
  },
  {
    name: "Enterprise",
    price: "€99.99",
    interval: "month",
    description: "For large agencies and teams",
    features: [
      "Unlimited listings",
      "Real-time analytics",
      "24/7 phone support",
      "Premium visibility",
      "Market analytics",
      "Team management",
      "API access",
      "Custom branding",
    ],
  },
]

export default function SubscriptionsPage() {
  const { isAuthenticated } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSubscribe = (planName: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to subscribe to a plan",
        variant: "destructive",
      })
      return
    }

    setSelectedPlan(planName)
    toast({
      title: "Subscription activated",
      description: `You are now subscribed to the ${planName} plan`,
    })
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Toaster />
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan for your real estate business. All plans include access to our core features.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.name === "Professional" ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.interval}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-6"
                variant={plan.name === "Professional" ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.name)}
              >
                {selectedPlan === plan.name ? "Current Plan" : "Subscribe"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          All plans include a 14-day free trial. Cancel anytime.
          <br />
          Need a custom plan? <Button variant="link">Contact our sales team</Button>
        </p>
      </div>
    </div>
  )
}
