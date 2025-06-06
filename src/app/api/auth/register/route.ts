import { type NextRequest, NextResponse } from "next/server"
import { userStorage } from "@/lib/user-storage"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, bloodType, role } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = userStorage.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 })
    }

    // Create new user
    const userData = {
      email,
      password, // In production, hash this password
      firstName,
      lastName,
      role,
      bloodType: role === "donor" ? bloodType : undefined,
      phone: undefined,
      address: undefined,
      dateOfBirth: undefined,
      ...(role === "donor" && {
        lastDonation: undefined,
        totalDonations: 0,
        eligibleToDonateDays: 0,
      }),
      ...(role === "recipient" && {
        medicalId: undefined,
        hospital: undefined,
      }),
      createdAt: new Date().toISOString(),
    }

    const newUser = userStorage.addUser(userData)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      message: "User registered successfully",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
