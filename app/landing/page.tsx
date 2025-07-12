"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Shield,
  Users,
  Brain,
  MapPin,
  CheckCircle,
  ArrowRight,
  Star,
  Heart,
  Smartphone,
  BarChart3,
  Clock,
  Globe,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Risk Assessment",
      description:
        "Advanced machine learning algorithms trained on local datasets provide accurate cervical cancer risk predictions.",
      color: "text-blue-600",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description:
        "Optimized for Community Health Volunteers working in remote areas with offline-first functionality.",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "HIPAA-compliant data handling with end-to-end encryption to protect patient information.",
      color: "text-blue-700",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Comprehensive dashboards and reporting tools for healthcare administrators and policymakers.",
      color: "text-blue-600",
    },
    {
      icon: Clock,
      title: "Offline Capability",
      description: "Works seamlessly without internet connection, syncing data when connectivity is restored.",
      color: "text-blue-500",
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Designed for CHVs, clinicians, and specialists with role-based access and workflows.",
      color: "text-blue-700",
    },
  ]

  const stats = [
    { number: "2,847", label: "Patients Screened", icon: Users },
    { number: "94.7%", label: "AI Accuracy Rate", icon: Brain },
    { number: "47", label: "Counties Covered", icon: MapPin },
    { number: "156", label: "Healthcare Workers", icon: Heart },
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Mwangi",
      role: "Lead Gynecologist, Kenyatta National Hospital",
      content:
        "MAMA-SCAN has revolutionized our screening process. The AI predictions are remarkably accurate and help us prioritize high-risk cases.",
      rating: 5,
    },
    {
      name: "Grace Akinyi",
      role: "Community Health Volunteer, Kisumu",
      content:
        "The offline functionality is a game-changer. I can screen patients in remote villages and sync data when I return to town.",
      rating: 5,
    },
    {
      name: "Dr. James Kiprotich",
      role: "Public Health Director, Nakuru County",
      content:
        "The analytics dashboard provides invaluable insights for our county-wide screening programs. Highly recommended.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 dark:bg-slate-900/95 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">MAMA-SCAN</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                About
              </a>
              <a
                href="#testimonials"
                className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                Contact
              </a>
              <ThemeToggle />
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-100 dark:border-slate-700">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  About
                </a>
                <a
                  href="#testimonials"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  Testimonials
                </a>
                <a
                  href="#contact"
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  Contact
                </a>
                <div className="flex space-x-2 pt-2">
                  <Link href="/login">
                    <Button variant="outline" className="flex-1">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-700 flex-1">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              AI-Powered Healthcare Solution
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in">
              Revolutionizing Cervical Cancer Screening in{" "}
              <span className="text-blue-600 dark:text-blue-400">Kenya</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in">
              MAMA-SCAN empowers Community Health Volunteers and clinicians with AI-powered risk assessment tools,
              enabling early detection and saving lives across Kenya's communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link href="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                  Start Screening
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="stat-card text-center">
                  <CardContent className="pt-6">
                    <Icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.number}</div>
                    <div className="text-slate-600 dark:text-slate-300">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Features for Better Healthcare
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Built specifically for Kenya's healthcare landscape with cutting-edge AI technology
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="feature-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className={`h-12 w-12 ${feature.color} mb-4`} />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Addressing Kenya's Healthcare Challenges
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                Cervical cancer is the leading cause of cancer death among women in Kenya. MAMA-SCAN bridges the gap
                between high disease burden and limited screening capabilities through innovative AI technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Offline-First Design</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Works in remote areas without internet connectivity
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Locally Trained AI</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Machine learning models trained on Kenyan population data
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">CHV Empowerment</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Designed for Community Health Volunteers with minimal training
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl p-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Risk Assessment</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">AI-Powered Analysis</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-300">Risk Level</span>
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">High</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-300">Confidence</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">94.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-300">Recommendation</span>
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        Refer to Specialist
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              See what healthcare workers across Kenya are saying about MAMA-SCAN
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="feature-card">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Healthcare in Your Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare workers already using MAMA-SCAN to save lives through early detection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 text-white border-white hover:bg-white hover:text-blue-600"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">MAMA-SCAN</span>
              </div>
              <p className="text-slate-400 mb-4">AI-powered cervical cancer screening for Kenya's healthcare system.</p>
              <div className="flex space-x-4">
                <Globe className="h-5 w-5 text-slate-400" />
                <span className="text-slate-400">Kenya & East Africa</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 MAMA-SCAN. All rights reserved. Built for Kenya's healthcare transformation.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
