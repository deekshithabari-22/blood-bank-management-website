"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BloodDrop } from "@/components/blood-drop"
import { User, LogOut, Bell, AlertCircle, Clock, FileText, Plus } from "lucide-react"

interface RecipientData {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  bloodType: string
  phone: string
  address: string
  dateOfBirth: string
  medicalId: string
  hospital: string
  requests: Array<{
    id: number
    bloodType: string
    quantity: number
    urgency: string
    status: string
    requestDate: string
    approvedDate?: string
    reason: string
    hospital: string
  }>
  notifications: Array<{
    id: number
    message: string
    date: string
    read: boolean
    type: string
  }>
}

export default function RecipientDashboard() {
  const router = useRouter()
  const [recipientData, setRecipientData] = useState<RecipientData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [newRequest, setNewRequest] = useState({
    bloodType: "",
    quantity: "",
    urgency: "",
    reason: "",
    hospital: "",
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
      if (user.role !== "recipient") {
        router.push("/login")
        return
      }
      setRecipientData(user)
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

  const handleNewRequestChange = (field: string, value: string) => {
    setNewRequest((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit this to your backend
    console.log("New request:", newRequest)
    alert("Blood request submitted successfully!")
    setNewRequest({
      bloodType: "",
      quantity: "",
      urgency: "",
      reason: "",
      hospital: "",
    })
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

  if (!recipientData) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-600"
      case "medium":
        return "bg-amber-600"
      case "low":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BloodDrop className="h-6 w-6 text-red-600" />
            <span className="text-lg font-bold">LifeFlow</span>
            <Badge className="ml-2 bg-blue-600">Recipient</Badge>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {recipientData.notifications.some((n) => !n.read) && (
                <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600"></span>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <span className="font-medium">
                {recipientData.firstName} {recipientData.lastName}
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
            <h1 className="text-2xl font-bold">Recipient Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {recipientData.firstName}</p>
          </div>

          <div className="mt-4 flex gap-4 md:mt-0">
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => setActiveTab("new-request")}>
              <Plus className="mr-2 h-4 w-4" />
              New Blood Request
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="new-request">New Request</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Profile Summary */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Type</CardTitle>
                  <BloodDrop className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recipientData.bloodType}</div>
                  <p className="text-xs text-muted-foreground">Your blood type</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recipientData.requests.length}</div>
                  <p className="text-xs text-muted-foreground">Lifetime requests</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                  <Clock className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {recipientData.requests.filter((r) => r.status === "pending").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Awaiting approval</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hospital</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{recipientData.hospital || "Not specified"}</div>
                  <p className="text-xs text-muted-foreground">Primary hospital</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Requests and Personal Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Requests</CardTitle>
                  <CardDescription>Your latest blood requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {recipientData.requests.length > 0 ? (
                    <div className="space-y-4">
                      {recipientData.requests.slice(0, 3).map((request) => (
                        <div key={request.id} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge className={getUrgencyColor(request.urgency)}>{request.urgency} priority</Badge>
                              <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                            </div>
                            <p className="font-medium">
                              {request.bloodType} - {request.quantity} units
                            </p>
                            <p className="text-sm text-muted-foreground">{request.reason}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(request.requestDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-3 py-8">
                      <FileText className="h-12 w-12 text-muted-foreground/50" />
                      <div className="text-center">
                        <p className="text-lg font-medium">No requests yet</p>
                        <p className="text-sm text-muted-foreground">Submit your first blood request</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("requests")}>
                    View All Requests
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{recipientData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{recipientData.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Medical ID</p>
                    <p className="text-sm text-muted-foreground">{recipientData.medicalId || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Primary Hospital</p>
                    <p className="text-sm text-muted-foreground">{recipientData.hospital || "Not specified"}</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>My Blood Requests</CardTitle>
                <CardDescription>Track the status of your blood requests</CardDescription>
              </CardHeader>
              <CardContent>
                {recipientData.requests.length > 0 ? (
                  <div className="space-y-4">
                    {recipientData.requests.map((request) => (
                      <div key={request.id} className="rounded-lg border p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className={getUrgencyColor(request.urgency)}>{request.urgency} priority</Badge>
                              <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                              <div>
                                <p className="text-sm font-medium">Blood Type</p>
                                <p className="text-sm text-muted-foreground">{request.bloodType}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Quantity</p>
                                <p className="text-sm text-muted-foreground">{request.quantity} units</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Request Date</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(request.requestDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Hospital</p>
                                <p className="text-sm text-muted-foreground">{request.hospital}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium">Reason</p>
                              <p className="text-sm text-muted-foreground">{request.reason}</p>
                            </div>

                            {request.status === "approved" && request.approvedDate && (
                              <div className="rounded-md bg-blue-50 p-2">
                                <p className="text-sm text-blue-800">
                                  Approved on {new Date(request.approvedDate).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {request.status === "pending" && (
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3 py-12">
                    <FileText className="h-16 w-16 text-muted-foreground/50" />
                    <div className="text-center">
                      <p className="text-lg font-medium">No blood requests</p>
                      <p className="text-sm text-muted-foreground">Your blood requests will appear here</p>
                    </div>
                    <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setActiveTab("new-request")}>
                      Submit First Request
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new-request">
            <Card>
              <CardHeader>
                <CardTitle>Submit New Blood Request</CardTitle>
                <CardDescription>Request blood units for medical treatment</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmitRequest}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        value={newRequest.bloodType}
                        onValueChange={(value) => handleNewRequestChange("bloodType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (units)</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max="10"
                        value={newRequest.quantity}
                        onChange={(e) => handleNewRequestChange("quantity", e.target.value)}
                        placeholder="Number of units needed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select
                        value={newRequest.urgency}
                        onValueChange={(value) => handleNewRequestChange("urgency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hospital">Hospital</Label>
                      <Select
                        value={newRequest.hospital}
                        onValueChange={(value) => handleNewRequestChange("hospital", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select hospital" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Hospital">General Hospital</SelectItem>
                          <SelectItem value="City Medical Center">City Medical Center</SelectItem>
                          <SelectItem value="Memorial Hospital">Memorial Hospital</SelectItem>
                          <SelectItem value="Community Hospital">Community Hospital</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Medical Reason</Label>
                    <Textarea
                      id="reason"
                      value={newRequest.reason}
                      onChange={(e) => handleNewRequestChange("reason", e.target.value)}
                      placeholder="Please describe the medical reason for this blood request..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="rounded-md bg-amber-50 p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div className="text-sm text-amber-800">
                        <p className="font-medium">Important Information:</p>
                        <ul className="mt-1 list-disc list-inside space-y-1">
                          <li>All requests are subject to blood availability and medical review</li>
                          <li>High priority requests are processed within 2-4 hours</li>
                          <li>You will be notified via email and SMS about request status</li>
                          <li>Please ensure all information is accurate and complete</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-4">
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    Submit Request
                  </Button>
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Stay updated with your request status and important information</CardDescription>
              </CardHeader>
              <CardContent>
                {recipientData.notifications.length > 0 ? (
                  <div className="space-y-4">
                    {recipientData.notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`rounded-lg border p-4 ${notification.read ? "" : "bg-blue-50 border-blue-100"}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className={`${notification.read ? "" : "font-medium"}`}>{notification.message}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(notification.date).toLocaleDateString()}
                            </p>
                          </div>
                          {!notification.read && <Badge className="bg-blue-100 text-blue-800">New</Badge>}
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
                        You'll receive notifications about your requests here
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
