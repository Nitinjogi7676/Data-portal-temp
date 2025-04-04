"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FacultyQualificationFormProps {
  faculty?: any
  onSubmit: (data: any) => void
}

export function FacultyQualificationForm({ faculty, onSubmit }: FacultyQualificationFormProps) {
  const [qualifications, setQualifications] = useState<any[]>(
    faculty?.qualifications || [
      {
        qualification: "",
        state: "",
        university: "",
        institution: "",
        graduationYear: "",
        percentage: "",
        specialization: "",
        certificate: null,
      },
    ],
  )

  const [competitiveExams, setCompetitiveExams] = useState<any[]>(
    faculty?.competitiveExams || [
      {
        examName: "",
        passingYear: "",
        specialization: "",
        certificate: null,
      },
    ],
  )

  const qualificationTypes = [
    "Post Doc",
    "Ph.D.",
    "M.Tech",
    "MS",
    "MBA",
    "M.Com",
    "M.Sc.",
    "BBM",
    "B.Tech.",
    "B.E.",
    "PUC",
    "SSLC",
    "Others",
  ]

  const states = ["Karnataka", "Tamil Nadu", "Maharashtra", "Delhi", "Uttar Pradesh", "Kerala", "Andhra Pradesh"]

  const universities = {
    Karnataka: ["VTU", "Bangalore University", "Mysore University", "Mangalore University"],
    "Tamil Nadu": ["Anna University", "Madras University", "Bharathiar University"],
    Maharashtra: ["Mumbai University", "Pune University", "SNDT Women's University"],
    Delhi: ["Delhi University", "JNU", "Jamia Millia Islamia"],
    "Uttar Pradesh": ["Lucknow University", "Allahabad University", "BHU"],
    Kerala: ["Kerala University", "Calicut University", "Cochin University"],
    "Andhra Pradesh": ["Andhra University", "Osmania University", "JNTU"],
  }

  const examTypes = ["GATE", "K-SET", "UGC-NET", "Others"]

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      {
        qualification: "",
        state: "",
        university: "",
        institution: "",
        graduationYear: "",
        percentage: "",
        specialization: "",
        certificate: null,
      },
    ])
  }

  const removeQualification = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index))
  }

  const updateQualification = (index: number, field: string, value: any) => {
    const updatedQualifications = [...qualifications]
    updatedQualifications[index] = {
      ...updatedQualifications[index],
      [field]: value,
    }
    setQualifications(updatedQualifications)
  }

  const addCompetitiveExam = () => {
    setCompetitiveExams([
      ...competitiveExams,
      {
        examName: "",
        passingYear: "",
        specialization: "",
        certificate: null,
      },
    ])
  }

  const removeCompetitiveExam = (index: number) => {
    setCompetitiveExams(competitiveExams.filter((_, i) => i !== index))
  }

  const updateCompetitiveExam = (index: number, field: string, value: any) => {
    const updatedExams = [...competitiveExams]
    updatedExams[index] = {
      ...updatedExams[index],
      [field]: value,
    }
    setCompetitiveExams(updatedExams)
  }

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>, type: "qualification" | "exam") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (type === "qualification") {
        updateQualification(index, "certificate", file)
      } else {
        updateCompetitiveExam(index, "certificate", file)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      qualifications,
      competitiveExams,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Educational Qualifications</h3>
          <Button type="button" variant="outline" size="sm" onClick={addQualification}>
            <Plus className="mr-2 h-4 w-4" />
            Add Qualification
          </Button>
        </div>

        <div className="space-y-4">
          {qualifications.map((qualification, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Qualification {index + 1}</h4>
                  {qualifications.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeQualification(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Qualification Type</Label>
                    <Select
                      value={qualification.qualification}
                      onValueChange={(value) => updateQualification(index, "qualification", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualificationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Select
                      value={qualification.state}
                      onValueChange={(value) => updateQualification(index, "state", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>University</Label>
                    <Select
                      value={qualification.university}
                      onValueChange={(value) => updateQualification(index, "university", value)}
                      required
                      disabled={!qualification.state}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select university" />
                      </SelectTrigger>
                      <SelectContent>
                        {qualification.state &&
                          universities[qualification.state as keyof typeof universities]?.map((university) => (
                            <SelectItem key={university} value={university}>
                              {university}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Institution Name</Label>
                    <Input
                      value={qualification.institution}
                      onChange={(e) => updateQualification(index, "institution", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Year of Graduation</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {qualification.graduationYear ? qualification.graduationYear : <span>Select year</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          onSelect={(date) =>
                            date && updateQualification(index, "graduationYear", format(date, "yyyy"))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Percentage/Grade</Label>
                    <Input
                      value={qualification.percentage}
                      onChange={(e) => updateQualification(index, "percentage", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Specialization</Label>
                    <Input
                      value={qualification.specialization}
                      onChange={(e) => updateQualification(index, "specialization", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Certificate</Label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(index, e, "qualification")}
                    />
                    {qualification.certificate && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {typeof qualification.certificate === "string"
                          ? qualification.certificate
                          : qualification.certificate.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Competitive Exams Cleared</h3>
          <Button type="button" variant="outline" size="sm" onClick={addCompetitiveExam}>
            <Plus className="mr-2 h-4 w-4" />
            Add Exam
          </Button>
        </div>

        <div className="space-y-4">
          {competitiveExams.map((exam, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Exam {index + 1}</h4>
                  {competitiveExams.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeCompetitiveExam(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Exam Name</Label>
                    <Select
                      value={exam.examName}
                      onValueChange={(value) => updateCompetitiveExam(index, "examName", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam" />
                      </SelectTrigger>
                      <SelectContent>
                        {examTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Year of Passing</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {exam.passingYear ? exam.passingYear : <span>Select year</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          onSelect={(date) => date && updateCompetitiveExam(index, "passingYear", format(date, "yyyy"))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Specialization</Label>
                    <Input
                      value={exam.specialization}
                      onChange={(e) => updateCompetitiveExam(index, "specialization", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Certificate</Label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(index, e, "exam")}
                    />
                    {exam.certificate && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {typeof exam.certificate === "string" ? exam.certificate : exam.certificate.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Next: Additional Details</Button>
      </div>
    </form>
  )
}

