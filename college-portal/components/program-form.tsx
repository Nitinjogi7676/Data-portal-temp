"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProgramFormProps {
  program?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ProgramForm({ program, onSubmit, onCancel }: ProgramFormProps) {
  const [formData, setFormData] = useState({
    id: program?.id || null,
    name: program?.name || "",
    code: program?.code || "",
    department: program?.department || "",
    parentalDepartment: program?.parentalDepartment || "",
    sanctionedIntake: program?.sanctionedIntake || "",
    accreditationStatus: program?.accreditationStatus || "",
    accreditationFile: program?.accreditationFile || "",
    duration: program?.duration || "",
    totalCredits: program?.totalCredits || "",
    status: program?.status || "active",
  })

  const [file, setFile] = useState<File | null>(null)

  const departments = [
    "Computer Science Engineering",
    "Information Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Robotics & Automation",
  ]

  const accreditationTypes = ["NBA Accredited", "NAAC Accredited", "Not Accredited", "In Process"]

  const programTypes = ["Bachelor of Technology", "Master of Technology", "PhD", "MBA", "MCA"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFormData((prev) => ({ ...prev, accreditationFile: selectedFile.name }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Program Name
          </Label>
          <div className="col-span-3">
            <Select value={formData.name} onValueChange={(value) => handleSelectChange("name", value)} required>
              <SelectTrigger id="name">
                <SelectValue placeholder="Select program type" />
              </SelectTrigger>
              <SelectContent>
                {programTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="code" className="text-right">
            Program Code
          </Label>
          <Input id="code" name="code" value={formData.code} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="department" className="text-right">
            Department
          </Label>
          <div className="col-span-3">
            <Select
              value={formData.department}
              onValueChange={(value) => handleSelectChange("department", value)}
              required
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="parentalDepartment" className="text-right">
            Parental Department
          </Label>
          <div className="col-span-3">
            <Select
              value={formData.parentalDepartment}
              onValueChange={(value) => handleSelectChange("parentalDepartment", value)}
              required
            >
              <SelectTrigger id="parentalDepartment">
                <SelectValue placeholder="Select parental department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="sanctionedIntake" className="text-right">
            Sanctioned Intake
          </Label>
          <Input
            id="sanctionedIntake"
            name="sanctionedIntake"
            type="number"
            min="1"
            value={formData.sanctionedIntake}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="accreditationStatus" className="text-right">
            Accreditation Status
          </Label>
          <div className="col-span-3">
            <Select
              value={formData.accreditationStatus}
              onValueChange={(value) => handleSelectChange("accreditationStatus", value)}
              required
            >
              <SelectTrigger id="accreditationStatus">
                <SelectValue placeholder="Select accreditation status" />
              </SelectTrigger>
              <SelectContent>
                {accreditationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="accreditationFile" className="text-right">
            Accreditation File
          </Label>
          <Input
            id="accreditationFile"
            name="accreditationFile"
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileChange}
            className="col-span-3"
          />
          {formData.accreditationFile && !file && (
            <div className="col-span-3 col-start-2 text-sm text-muted-foreground">
              Current file: {formData.accreditationFile}
            </div>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="duration" className="text-right">
            Program Duration (Years)
          </Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            min="1"
            max="10"
            value={formData.duration}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="totalCredits" className="text-right">
            Total Credits
          </Label>
          <Input
            id="totalCredits"
            name="totalCredits"
            type="number"
            min="1"
            value={formData.totalCredits}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  )
}

