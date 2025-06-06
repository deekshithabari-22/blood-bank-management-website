// Simulated database storage for users
// In production, this would be a real database

interface User {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  role: string
  bloodType?: string
  phone?: string
  address?: string
  dateOfBirth?: string
  medicalId?: string
  hospital?: string
  lastDonation?: string
  totalDonations?: number
  eligibleToDonateDays?: number
  createdAt: string
}

// Initial users
const users: User[] = [
  {
    id: 1,
    email: "admin@lifeflow.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
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

export const userStorage = {
  // Get all users
  getUsers: (): User[] => {
    return users
  },

  // Find user by email
  findUserByEmail: (email: string): User | undefined => {
    return users.find((user) => user.email === email)
  },

  // Find user by ID
  findUserById: (id: number): User | undefined => {
    return users.find((user) => user.id === id)
  },

  // Add new user
  addUser: (userData: Omit<User, "id">): User => {
    const newUser: User = {
      ...userData,
      id: Math.max(...users.map((u) => u.id), 0) + 1,
    }
    users.push(newUser)
    return newUser
  },

  // Update user
  updateUser: (id: number, updates: Partial<User>): User | null => {
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex === -1) return null

    users[userIndex] = { ...users[userIndex], ...updates }
    return users[userIndex]
  },

  // Delete user
  deleteUser: (id: number): boolean => {
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex === -1) return false

    users.splice(userIndex, 1)
    return true
  },
}

// Mock data for other entities
export const appointments = [
  {
    id: 1,
    userId: 2,
    date: "2023-06-20",
    time: "10:30 AM",
    location: "Central Blood Bank",
    status: "scheduled",
  },
  {
    id: 2,
    userId: 3,
    date: "2023-06-21",
    time: "2:00 PM",
    location: "Community Hospital",
    status: "confirmed",
  },
]

export const donationHistory = [
  {
    id: 1,
    userId: 2,
    date: "2023-05-15",
    location: "Central Blood Bank",
    status: "completed",
  },
  {
    id: 2,
    userId: 2,
    date: "2023-02-10",
    location: "Mobile Drive - City Hall",
    status: "completed",
  },
  {
    id: 3,
    userId: 3,
    date: "2023-04-20",
    location: "Memorial Hospital",
    status: "completed",
  },
]

export const bloodRequests = [
  {
    id: 1,
    userId: 4,
    bloodType: "B-",
    quantity: 2,
    urgency: "high",
    status: "pending",
    requestDate: "2023-06-05",
    reason: "Surgery preparation",
    hospital: "General Hospital",
  },
  {
    id: 2,
    userId: 4,
    bloodType: "B-",
    quantity: 1,
    urgency: "medium",
    status: "approved",
    requestDate: "2023-05-20",
    approvedDate: "2023-05-21",
    reason: "Emergency treatment",
    hospital: "General Hospital",
  },
]

export const notifications = [
  {
    id: 1,
    userId: 2,
    message: "Your blood donation appointment is tomorrow at 10:30 AM",
    date: "2023-06-19",
    read: false,
    type: "appointment",
  },
  {
    id: 2,
    userId: 2,
    message: "Thank you for your recent donation! Your blood has helped save 3 lives.",
    date: "2023-05-16",
    read: true,
    type: "general",
  },
  {
    id: 3,
    userId: 3,
    message: "You are eligible to donate blood again. Schedule your next appointment.",
    date: "2023-06-01",
    read: false,
    type: "general",
  },
  {
    id: 4,
    userId: 4,
    message: "Your blood request has been approved and is being processed",
    date: "2023-06-05",
    read: false,
    type: "request",
  },
]
