"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BloodDrop } from "@/components/blood-drop"
import { CalendarIcon, ClipboardList, Users, BarChart3, MapPin, Bell, User, LogOut } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      try {
        setCurrentUser(JSON.parse(userData))
      } catch (error) {
        localStorage.removeItem("currentUser")
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
  }

  const handleDonateClick = () => {
    if (currentUser) {
      // If logged in, redirect to appropriate dashboard
      if (currentUser.role === "donor") {
        router.push("/donor/dashboard")
      } else if (currentUser.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        // Recipients can't donate, show message or redirect to their dashboard
        router.push("/recipient/dashboard")
      }
    } else {
      // If not logged in, redirect to login
      router.push("/login")
    }
  }

  const handleRequestBloodClick = () => {
    if (currentUser) {
      // If logged in, redirect to appropriate dashboard
      if (currentUser.role === "recipient") {
        router.push("/recipient/dashboard")
      } else if (currentUser.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        // Donors can't request blood, show message or redirect to their dashboard
        router.push("/donor/dashboard")
      }
    } else {
      // If not logged in, redirect to login
      router.push("/login")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-red-600 text-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BloodDrop className="h-8 w-8" />
            <span className="text-xl font-bold">LifeFlow</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <button onClick={handleDonateClick} className="hover:underline">
                  Donate
                </button>
              </li>
              <li>
                <button onClick={handleRequestBloodClick} className="hover:underline">
                  Request Blood
                </button>
              </li>
              <li>
                <Link href="/search" className="hover:underline">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="font-medium">
                    {currentUser.firstName} {currentUser.lastName}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-white text-red-600 hover:bg-gray-100">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-red-600 to-red-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">Donate Blood, Save Lives</h1>
                <p className="text-lg md:text-xl">
                  Your donation can make a difference. Join our community of donors and help save lives today.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100" onClick={handleDonateClick}>
                    Donate Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-red-600"
                    onClick={handleRequestBloodClick}
                  >
                    Request Blood
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative h-64 w-64 md:h-80 md:w-80">
                  <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm"></div>
                  <BloodDrop className="absolute inset-0 h-full w-full p-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Services</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="mb-2 rounded-full bg-red-100 p-2 w-10 h-10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Register as a donor, recipient, or administrator with role-based access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Create and manage your profile, update your information, and track your donation history.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 rounded-full bg-red-100 p-2 w-10 h-10 flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle>Blood Inventory</CardTitle>
                  <CardDescription>Track blood inventory by type, quantity, and expiration date</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Real-time inventory management system to ensure blood supply meets demand.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 rounded-full bg-red-100 p-2 w-10 h-10 flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle>Donation Scheduling</CardTitle>
                  <CardDescription>Schedule blood donations at your convenience</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Easy appointment booking system with reminders to ensure you never miss a donation.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 rounded-full bg-red-100 p-2 w-10 h-10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Receive alerts for appointments and urgent blood needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Stay informed with timely notifications about appointments, blood requests, and more.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 rounded-full bg-red-100 p-2 w-10 h-10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle>Reports & Analytics</CardTitle>
                  <CardDescription>Comprehensive reports on donations and inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Access detailed reports and analytics to track donation patterns and inventory levels.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-2 rounded-full bg-red-100 p-2 w-10 h-10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle>Blood Bank Locator</CardTitle>
                  <CardDescription>Find nearby blood banks and donation centers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Interactive map to locate the nearest blood banks and donation centers in your area.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Blood Types Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Blood Types & Compatibility</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th className="border border-red-700 p-3 text-left">Blood Type</th>
                    <th className="border border-red-700 p-3 text-left">Can Donate To</th>
                    <th className="border border-red-700 p-3 text-left">Can Receive From</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">A+</td>
                    <td className="border border-gray-200 p-3">A+, AB+</td>
                    <td className="border border-gray-200 p-3">A+, A-, O+, O-</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-200 p-3 font-medium">A-</td>
                    <td className="border border-gray-200 p-3">A+, A-, AB+, AB-</td>
                    <td className="border border-gray-200 p-3">A-, O-</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">B+</td>
                    <td className="border border-gray-200 p-3">B+, AB+</td>
                    <td className="border border-gray-200 p-3">B+, B-, O+, O-</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-200 p-3 font-medium">B-</td>
                    <td className="border border-gray-200 p-3">B+, B-, AB+, AB-</td>
                    <td className="border border-gray-200 p-3">B-, O-</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">AB+</td>
                    <td className="border border-gray-200 p-3">AB+</td>
                    <td className="border border-gray-200 p-3">All Blood Types</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-200 p-3 font-medium">AB-</td>
                    <td className="border border-gray-200 p-3">AB+, AB-</td>
                    <td className="border border-gray-200 p-3">A-, B-, AB-, O-</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">O+</td>
                    <td className="border border-gray-200 p-3">A+, B+, AB+, O+</td>
                    <td className="border border-gray-200 p-3">O+, O-</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-200 p-3 font-medium">O-</td>
                    <td className="border border-gray-200 p-3">All Blood Types</td>
                    <td className="border border-gray-200 p-3">O-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-red-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Save Lives?</h2>
            <p className="mb-8 text-lg">Join our community of donors and make a difference today.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {!currentUser && (
                <>
                  <Link href="/register">
                    <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                      Register Now
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-red-600"
                    >
                      Learn More
                    </Button>
                  </Link>
                </>
              )}
              {currentUser && (
                <>
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100" onClick={handleDonateClick}>
                    Go to Dashboard
                  </Button>
                  <Link href="/search">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-red-600"
                    >
                      Find Blood Banks
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">LifeFlow</h3>
              <p className="mb-4">Connecting donors with those in need since 2023.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <button onClick={handleDonateClick} className="hover:text-white">
                    Donate Blood
                  </button>
                </li>
                <li>
                  <button onClick={handleRequestBloodClick} className="hover:text-white">
                    Request Blood
                  </button>
                </li>
                <li>
                  <Link href="/search" className="hover:text-white">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/education" className="hover:text-white">
                    Educational Resources
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/volunteer" className="hover:text-white">
                    Volunteer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">Contact Us</h3>
              <address className="not-italic">
                <p>123 Blood Bank Street</p>
                <p>City, State 12345</p>
                <p className="mt-2">Email: info@lifeflow.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} LifeFlow Blood Bank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
