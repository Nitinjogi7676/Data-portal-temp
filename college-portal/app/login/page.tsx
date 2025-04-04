"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    role: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would validate and authenticate the user here
    console.log("Login data:", formData)

    // For demo purposes, we'll redirect to the admin dashboard if role is admin
    if (formData.role === "admin") {
      router.push("/admin/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="absolute top-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800 dark:text-blue-400">
          Sahyadri College of Engineering and Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Data Portal System</p>
      </div>

      <Card className="w-full max-w-md shadow-lg border-blue-100 dark:border-blue-900">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <GraduationCap className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">Email / User ID</Label>
              <Input
                id="userId"
                name="userId"
                placeholder="Enter your email or user ID"
                required
                value={formData.userId}
                onChange={handleChange}
                className="border-blue-200 dark:border-blue-800 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
                className="border-blue-200 dark:border-blue-800 focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select onValueChange={handleRoleChange} value={formData.role}>
                <SelectTrigger id="role" className="border-blue-200 dark:border-blue-800 focus:border-blue-400">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="academic">Academic/Admission</SelectItem>
                  <SelectItem value="hod">HOD</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

