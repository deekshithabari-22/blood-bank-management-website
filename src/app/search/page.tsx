"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BloodDrop } from "@/components/blood-drop"
import { Search, MapPin, Phone, Clock, User, Droplet } from "lucide-react"

// Mock data for search results
const bloodBanks = [
  {
    id: 1,
    name: "Central Blood Bank",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    distance: "0.5 miles",
    hours: "24/7",
    inventory: {
      "A+": 15,
      "A-": 8,
      "B+": 12,
      "B-": 3,
      "AB+": 6,
      "AB-": 2,
      "O+": 20,
      "O-": 10,
    },
  },
  {
    id: 2,
    name: "Community Hospital Blood Center",
    address: "456 Hospital Drive, Midtown",
    phone: "(555) 234-5678",
    distance: "1.2 miles",
    hours: "6:00 AM - 10:00 PM",
    inventory: {
      "A+": 10,
      "A-": 5,
      "B+": 8,
      "B-": 1,
      "AB+": 4,
      "AB-": 1,
      "O+": 15,
      "O-": 7,
    },
  },
  {
    id: 3,
    name: "Memorial Hospital Blood Bank",
    address: "789 Medical Plaza, Uptown",
    phone: "(555) 345-6789",
    distance: "2.1 miles",
    hours: "8:00 AM - 8:00 PM",
    inventory: {
      "A+": 12,
      "A-": 6,
      "B+": 9,
      "B-": 2,
      "AB+": 3,
      "AB-": 1,
      "O+": 18,
      "O-": 8,
    },
  },
]

const donors = [
  {
    id: 1,
    name: "John D.",
    bloodType: "O+",
    location: "Downtown",
    lastDonation: "2023-03-15",
    totalDonations: 8,
    available: true,
  },
  {
    id: 2,
    name: "Sarah M.",
    bloodType: "A-",
    location: "Midtown",
    lastDonation: "2023-04-20",
    totalDonations: 12,
    available: true,
  },
  {
    id: 3,
    name: "Michael R.",
    bloodType: "B+",
    location: "Uptown",
    lastDonation: "2023-02-10",
    totalDonations: 15,
    available: false,
  },
  {
    id: 4,
    name: "Emily K.",
    bloodType: "AB-",
    location: "Downtown",
    lastDonation: "2023-05-05",
    totalDonations: 6,
    available: true,
  },
]

export default function SearchPage() {
  const [searchType, setSearchType] = useState("blood-banks")
  const [filters, setFilters] = useState({
    bloodType: "all",
    location: "",
    availability: "all",
  })

  const [filteredBloodBanks, setFilteredBloodBanks] = useState(bloodBanks)
  const [filteredDonors, setFilteredDonors] = useState(donors)

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)

    // Apply filters
    if (searchType === "blood-banks") {
      let filtered = bloodBanks

      if (newFilters.bloodType !== "all") {
        filtered = filtered.filter((bank) => bank.inventory[newFilters.bloodType as keyof typeof bank.inventory] > 0)
      }

      if (newFilters.location) {
        filtered = filtered.filter((bank) => bank.address.toLowerCase().includes(newFilters.location.toLowerCase()))
      }

      setFilteredBloodBanks(filtered)
    } else {
      let filtered = donors

      if (newFilters.bloodType !== "all") {
        filtered = filtered.filter((donor) => donor.bloodType === newFilters.bloodType)
      }

      if (newFilters.location) {
        filtered = filtered.filter((donor) => donor.location.toLowerCase().includes(newFilters.location.toLowerCase()))
      }

      if (newFilters.availability === "available") {
        filtered = filtered.filter((donor) => donor.available)
      }

      setFilteredDonors(filtered)
    }
  }

  const getInventoryStatus = (quantity: number) => {
    if (quantity === 0) return { status: "out", color: "bg-red-100 text-red-800" }
    if (quantity <= 5) return { status: "low", color: "bg-amber-100 text-amber-800" }
    return { status: "available", color: "bg-green-100 text-green-800" }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <BloodDrop className="h-6 w-6 text-red-600" />
            <span className="text-lg font-bold">LifeFlow</span>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="hover:text-red-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-red-600">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-red-600">
                  Request Blood
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-red-600 font-medium">
                  Search
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-red-600 hover:bg-red-700">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Blood Banks & Donors</h1>
          <p className="text-muted-foreground">Find blood banks near you or search for compatible donors</p>
        </div>

        <Tabs value={searchType} onValueChange={setSearchType} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="blood-banks">Blood Banks</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
          </TabsList>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Filters
              </CardTitle>
              <CardDescription>Use filters to find exactly what you're looking for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Select value={filters.bloodType} onValueChange={(value) => handleFilterChange("bloodType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
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
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter location or zip code"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>

                {searchType === "donors" && (
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      value={filters.availability}
                      onValueChange={(value) => handleFilterChange("availability", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Donors</SelectItem>
                        <SelectItem value="available">Available Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <TabsContent value="blood-banks" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Blood Banks Near You</h2>
              <p className="text-sm text-muted-foreground">{filteredBloodBanks.length} results found</p>
            </div>

            <div className="grid gap-4">
              {filteredBloodBanks.map((bank) => (
                <Card key={bank.id}>
                  <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{bank.name}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{bank.address}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <span>{bank.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{bank.hours}</span>
                          </div>
                          <Badge variant="outline">{bank.distance}</Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MapPin className="mr-2 h-4 w-4" />
                          Directions
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium">Blood Inventory</h4>
                      <div className="grid grid-cols-4 gap-2 md:grid-cols-8">
                        {Object.entries(bank.inventory).map(([type, quantity]) => {
                          const { status, color } = getInventoryStatus(quantity)
                          return (
                            <div key={type} className="text-center">
                              <div className="mb-1 font-medium text-sm">{type}</div>
                              <Badge className={color}>{quantity} units</Badge>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="donors" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Compatible Donors</h2>
              <p className="text-sm text-muted-foreground">{filteredDonors.length} donors found</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredDonors.map((donor) => (
                <Card key={donor.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{donor.name}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-red-600">{donor.bloodType}</Badge>
                              <Badge
                                className={
                                  donor.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }
                              >
                                {donor.available ? "Available" : "Not Available"}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Location</p>
                            <p className="text-muted-foreground">{donor.location}</p>
                          </div>
                          <div>
                            <p className="font-medium">Total Donations</p>
                            <p className="text-muted-foreground">{donor.totalDonations}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="font-medium">Last Donation</p>
                            <p className="text-muted-foreground">{new Date(donor.lastDonation).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled={!donor.available} className="flex-1">
                        Contact Donor
                      </Button>
                      <Button size="sm" disabled={!donor.available} className="flex-1 bg-red-600 hover:bg-red-700">
                        Request Donation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Emergency Contact */}
        <Card className="mt-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Droplet className="h-5 w-5" />
              Emergency Blood Request
            </CardTitle>
            <CardDescription className="text-red-700">
              For urgent blood needs, contact our 24/7 emergency hotline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium text-red-800">Emergency Hotline: (555) 911-BLOOD</p>
                <p className="text-sm text-red-700">Available 24/7 for critical blood requests</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">Call Emergency Line</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
