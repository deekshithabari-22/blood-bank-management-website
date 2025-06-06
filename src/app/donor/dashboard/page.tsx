"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BloodDrop } from "@/components/blood-drop"
import { CalendarIcon, User, LogOut, Bell, Clock, CheckCircle, AlertCircle, BarChart3 } from "lucide-react"

interface DonorData {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  bloodType: string
  phone: string
  address: string
  dateOfBirth: string
  lastDonation: string
  totalDonations: number
  eligibleToDonateDays: number
  appointments: Array<{
    id: number
    date: string
    time: string
    location: string
    status: string
  }>
  donationHistory: Array<{
    id: number
    date: string
    location: string
    status: string
  }>
  notifications: Array<{
    id: number
    message: string
    date: string
    read: boolean
    type: string
  }>
}

export default function DonorDashboard() {
  const router = useRouter()
  const [donorData, setDonorData] = useState<DonorData | null>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Get user data from localStorage (in production, use secure session management)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BloodDrop className="h-12 w-12 text-red-600 mx-auto mb-4 animate-pulse" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!donorData) {
    return null
  }

  // Calculate if donor is eligible to donate
  const isEligible = donorData.eligibleToDonateDays <= 0
  const upcomingAppointment = donorData.appointments.find(
    (apt) => apt.status === "scheduled" || apt.status === "confirmed",
  )

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
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {donorData.notifications.some((n) => !n.read) && (
                <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600"></span>
              )}
            </Button>

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
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Donor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {donorData.firstName}</p>
          </div>

          <div className="mt-4 flex gap-4 md:mt-0">
            <Link href="/donor/schedule">
              <Button className="bg-red-600 hover:bg-red-700">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule Donation
              </Button>
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="history">Donation History</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Type</CardTitle>
                  <BloodDrop className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{donorData.bloodType}</div>
                  <p className="text-xs text-muted-foreground">Your blood type</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{donorData.totalDonations}</div>
                  <p className="text-xs text-muted-foreground">Lifetime donations</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Donation</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {donorData.lastDonation ? new Date(donorData.lastDonation).toLocaleDateString() : "Never"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {donorData.lastDonation
                      ? `${Math.floor((new Date().getTime() - new Date(donorData.lastDonation).getTime()) / (1000 * 60 * 60 * 24))} days ago`
                      : "First time donor"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Donation Status</CardTitle>
                  {isEligible ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isEligible ? "Eligible" : `${donorData.eligibleToDonateDays} days`}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isEligible ? "You can donate now" : "Until next eligible donation"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Upcoming Appointment</CardTitle>
                  <CardDescription>Your next scheduled blood donation</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingAppointment ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="font-medium">{new Date(upcomingAppointment.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">{upcomingAppointment.time}</p>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium">{upcomingAppointment.location}</p>
                        <p className="text-sm text-muted-foreground">Blood donation center</p>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-3 py-8">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground/50" />
                      <div className="text-center">
                        <p className="text-lg font-medium">No upcoming appointments</p>
                        <p className="text-sm text-muted-foreground">Schedule your next donation</p>
                      </div>
                      <Link href="/donor/schedule">
                        <Button className="mt-2 bg-red-600 hover:bg-red-700">Schedule Now</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{donorData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{donorData.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{donorData.address || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date of Birth</p>
                    <p className="text-sm text-muted-foreground">
                      {donorData.dateOfBirth ? new Date(donorData.dateOfBirth).toLocaleDateString() : "Not provided"}
                    </p>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Manage Appointments</CardTitle>
                <CardDescription>View and manage your upcoming blood donation appointments</CardDescription>
              </CardHeader>
              <CardContent>
                {donorData.appointments.length > 0 ? (
                  <div className="space-y-4">
                    {donorData.appointments.map((appointment) => (
                      <div key={appointment.id} className="rounded-lg border p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  appointment.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : appointment.status === "scheduled"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                }
                              >
                                {appointment.status}
                              </Badge>
                              <span className="font-medium">{new Date(appointment.date).toLocaleDateString()}</span>
                              <span className="text-muted-foreground">at {appointment.time}</span>
                            </div>
                            <p className="font-medium">{appointment.location}</p>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-center">
                      <Link href="/donor/schedule">
                        <Button className="bg-red-600 hover:bg-red-700">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Schedule Another Donation
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3 py-12">
                    <CalendarIcon className="h-16 w-16 text-muted-foreground/50" />
                    <div className="text-center">
                      <p className="text-lg font-medium">No upcoming appointments</p>
                      <p className="text-sm text-muted-foreground">Schedule your next donation to help save lives</p>
                    </div>
                    <Link href="/donor/schedule">
                      <Button className="mt-4 bg-red-600 hover:bg-red-700">Schedule Now</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>Your blood donation records</CardDescription>
              </CardHeader>
              <CardContent>
                {donorData.donationHistory.length > 0 ? (
                  <div className="space-y-4">
                    {donorData.donationHistory.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                            <span className="font-medium">{new Date(donation.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm">{donation.location}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3 py-12">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                    <div className="text-center">
                      <p className="text-lg font-medium">No donation history</p>
                      <p className="text-sm text-muted-foreground">
                        Your donation history will appear here after your first donation
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <Button variant="outline">View All History</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Stay updated with important information</CardDescription>
              </CardHeader>
              <CardContent>
                {donorData.notifications.length > 0 ? (
                  <div className="space-y-4">
                    {donorData.notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`rounded-lg border p-4 ${notification.read ? "" : "bg-red-50 border-red-100"}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className={`${notification.read ? "" : "font-medium"}`}>{notification.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(notification.date).toLocaleDateString()}
                            </p>
                          </div>
                          {!notification.read && <Badge className="bg-red-100 text-red-800">New</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3 py-12">
                    <Bell className="h-16 w-16 text-muted-foreground/50" />
                    <div className="text-center">
                      <p className="text-lg font-medium">No notifications</p>
                      <p className="text-sm text-muted-foreground">
                        You'll receive notifications about appointments and updates here
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
