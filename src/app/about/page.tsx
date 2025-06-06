import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BloodDrop } from "@/components/blood-drop"
import { Heart, Users, Award, Globe, ArrowLeft } from "lucide-react"

export default function AboutPage() {
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
                <Link href="/about" className="text-red-600 font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-red-600">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-600">
                  Contact
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
          <Link href="/" className="inline-flex items-center gap-2 text-red-600 hover:underline mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-2">About LifeFlow</h1>
          <p className="text-muted-foreground text-lg">
            Connecting donors with those in need, saving lives one donation at a time.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-12">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <Heart className="h-6 w-6" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 text-lg leading-relaxed">
                At LifeFlow, we believe that every drop of blood donated has the power to save lives. Our mission is to
                create a seamless, efficient, and accessible platform that connects voluntary blood donors with those in
                urgent need, ensuring that no life is lost due to blood shortage.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <div className="mb-2 rounded-full bg-red-100 p-2 w-10 h-10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <CardTitle>Compassion</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We approach every interaction with empathy and understanding, recognizing the human stories behind
                  every donation and request.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 rounded-full bg-blue-100 p-2 w-10 h-10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We foster a strong community of donors, recipients, and healthcare professionals working together for
                  a common cause.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 rounded-full bg-green-100 p-2 w-10 h-10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We strive for the highest standards in blood bank management, ensuring safety, quality, and efficiency
                  in all our processes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-2 rounded-full bg-purple-100 p-2 w-10 h-10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We make blood donation and requests accessible to everyone, breaking down barriers and simplifying the
                  process.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  LifeFlow was founded in 2023 with a simple yet powerful vision: to revolutionize blood bank management
                  and make blood donation more accessible and efficient than ever before.
                </p>
                <p>
                  Our founders, a team of healthcare professionals and technology experts, witnessed firsthand the
                  challenges faced by blood banks, hospitals, and patients in managing blood inventory and coordinating
                  donations. They saw an opportunity to leverage technology to save more lives.
                </p>
                <p>
                  Today, LifeFlow serves as a bridge between generous donors and those in critical need, facilitating
                  thousands of life-saving connections every month.
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Impact by Numbers</CardTitle>
                <CardDescription>Our achievements since launch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">2,500+</div>
                    <div className="text-sm text-muted-foreground">Lives Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">5,000+</div>
                    <div className="text-sm text-muted-foreground">Registered Donors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">150+</div>
                    <div className="text-sm text-muted-foreground">Partner Hospitals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">50+</div>
                    <div className="text-sm text-muted-foreground">Blood Banks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Leadership Team</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-center">Dr. Sarah Mitchell</CardTitle>
                <CardDescription className="text-center">Chief Executive Officer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-muted-foreground">
                  Former head of hematology with 15+ years of experience in blood bank management and patient care.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-center">Michael Chen</CardTitle>
                <CardDescription className="text-center">Chief Technology Officer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-muted-foreground">
                  Technology leader with expertise in healthcare systems and a passion for using tech to save lives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-center">Dr. James Rodriguez</CardTitle>
                <CardDescription className="text-center">Chief Medical Officer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-muted-foreground">
                  Renowned transfusion medicine specialist ensuring the highest medical standards in our operations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Join Our Mission</CardTitle>
              <CardDescription className="text-red-700">
                Be part of a community that saves lives every day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button className="bg-red-600 hover:bg-red-700">Become a Donor</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
