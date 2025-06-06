import { type NextRequest, NextResponse } from "next/server"
import { userStorage, appointments, donationHistory, bloodRequests, notifications } from "@/lib/user-storage"

// This should match the users array from register route
// In production, this would be a database query
const getUsers = () => [
  {
    id: 1,
    email: "admin@lifeflow.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    bloodType: null,
    phone: "(555) 000-0001",
    address: "100 Admin Street, City",
    dateOfBirth: "1980-01-01",
    createdAt: "2023-01-01",
  },
  {
    id: 2,
    email: "john.doe@email.com",
    password: "donor123",
    firstName: "John",
    lastName: "Doe",
    role: "donor",
    bloodType: "O+",
    phone: "(555) 111-0001",
    address: "123 Donor Lane, City",
    dateOfBirth: "1985-03-15",
    lastDonation: "2023-05-15",
    totalDonations: 8,
    eligibleToDonateDays: 0,
    createdAt: "2023-02-01",
  },
  {
    id: 3,
    email: "jane.smith@email.com",
    password: "donor123",
    firstName: "Jane",
    lastName: "Smith",
    role: "donor",
    bloodType: "A-",
    phone: "(555) 111-0002",
    address: "456 Blood Street, City",
    dateOfBirth: "1990-07-22",
    lastDonation: "2023-04-20",
    totalDonations: 12,
    eligibleToDonateDays: 25,
    createdAt: "2023-01-15",
  },
  {
    id: 4,
    email: "sarah.johnson@email.com",
    password: "recipient123",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "recipient",
    bloodType: "B-",
    phone: "(555) 222-0001",
    address: "111 Patient Street, City",
    dateOfBirth: "1995-12-08",
    medicalId: "MED-2023-001",
    hospital: "General Hospital",
    createdAt: "2023-03-01",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = userStorage.findUserByEmail(email)

    if (!user) {
      return NextResponse.json(
        { message: "User not found. Please check your email or register first." },
        { status: 401 },
      )
    }

    // Check password
    if (user.password !== password) {
      return NextResponse.json({ message: "Invalid password. Please try again." }, { status: 401 })
    }

    // Get user-specific data
    const userAppointments = appointments.filter((apt) => apt.userId === user.id)
    const userDonationHistory = donationHistory.filter((donation) => donation.userId === user.id)
    const userRequests = bloodRequests.filter((req) => req.userId === user.id)
    const userNotifications = notifications.filter((notif) => notif.userId === user.id)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // Return user data with personalized information
    return NextResponse.json({
      ...userWithoutPassword,
      appointments: userAppointments,
      donationHistory: userDonationHistory,
      requests: userRequests,
      notifications: userNotifications,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
