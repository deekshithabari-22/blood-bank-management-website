"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BloodDrop } from "@/components/blood-drop"
import { CalendarIcon, Clock, MapPin, ArrowLeft, User, LogOut } from "lucide-react"
import { format } from "date-fns"

export default function ScheduleDonationPage() {
  const router = useRouter()
  const [donorData, setDonorData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    location: "",
    time: "",
    notes: "",
  })

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("currentUser")
    if (!userData) {
      router.push("/login")
      return
    }

    try {
      const user = JSON.parse(userData)
      if (user.role !== "donor") {
        router.push("/login")
        return
      }
      setDonorData(user)
    } catch (error) {
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !formData.location || !formData.time) {
      alert("Please fill in all required fields")
      return
    }

    // In a real app, you would submit this to your backend
    alert(`Appointment scheduled successfully for ${format(date, "PPP")} at ${formData.time}`)
    router.push("/donor/dashboard")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BloodDrop className="h-12 w-12 text-red-600 mx-auto mb-4 animate-pulse" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!donorData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BloodDrop className="h-6 w-6 text-red-600" />
            <span className="text-lg font-bold">LifeFlow</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <User className="h-5 w-5 text-red-600" />
              </div>
              <span className="font-medium">
                {donorData.firstName} {donorData.lastName}
              </span>
            </div>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/donor/dashboard" className="inline-flex items-center gap-2 text-red-600 hover:underline mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">Schedule Blood Donation</h1>
          <p className="text-muted-foreground">
            Book your next blood donation appointment at a convenient time and location.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Scheduling Form */}
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Select your preferred date, time, and location for your blood donation.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Donation Center</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a donation center" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central">Central Blood Bank - 123 Main Street</SelectItem>
                      <SelectItem value="community">Community Hospital - 456 Hospital Drive</SelectItem>
                      <SelectItem value="memorial">Memorial Hospital - 789 Medical Plaza</SelectItem>
                      <SelectItem value="mobile">Mobile Drive - City Hall</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, time: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="09:30">9:30 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="10:30">10:30 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="11:30">11:30 AM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="14:30">2:30 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="15:30">3:30 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                      <SelectItem value="16:30">4:30 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special requirements or notes..."
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Information Panel */}
          <div className="space-y-6">
            {/* Donor Information */}
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Confirm your details for the appointment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">
                    {donorData.firstName} {donorData.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Blood Type</p>
                  <p className="text-sm text-muted-foreground">{donorData.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{donorData.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{donorData.phone || "Not provided"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Preparation Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Preparation Guidelines</CardTitle>
                <CardDescription>How to prepare for your donation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Before Donation:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Get a good night's sleep</li>
                      <li>Eat a healthy meal</li>
                      <li>Drink plenty of water</li>
                      <li>Avoid alcohol for 24 hours</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">What to Bring:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Valid photo ID</li>
                      <li>List of current medications</li>
                      <li>Comfortable clothing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Duration:</p>
                    <p className="text-muted-foreground">The entire process takes about 45-60 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Contact us if you have any questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Find locations near you</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Reschedule anytime before 24 hours</span>
                  </div>
                  <div className="mt-4">
                    <p className="font-medium">Contact Support:</p>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                    <p className="text-muted-foreground">support@lifeflow.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
