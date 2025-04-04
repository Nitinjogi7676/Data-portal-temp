"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ProgramForm } from "@/components/program-form"

// Sample data for programs
const initialPrograms = [
  {
    id: 1,
    name: "Bachelor of Technology",
    code: "B.Tech-CSE",
    department: "Computer Science Engineering",
    parentalDepartment: "Computer Science Engineering",
    sanctionedIntake: 120,
    accreditationStatus: "NBA Accredited",
    accreditationFile: "nba-cse.pdf",
    duration: 4,
    totalCredits: 180,
    status: "active",
  },
  {
    id: 2,
    name: "Master of Technology",
    code: "M.Tech-CSE",
    department: "Computer Science Engineering",
    parentalDepartment: "Computer Science Engineering",
    sanctionedIntake: 30,
    accreditationStatus: "NBA Accredited",
    accreditationFile: "nba-mtech-cse.pdf",
    duration: 2,
    totalCredits: 90,
    status: "active",
  },
  {
    id: 3,
    name: "Bachelor of Technology",
    code: "B.Tech-ISE",
    department: "Information Science Engineering",
    parentalDepartment: "Information Science Engineering",
    sanctionedIntake: 60,
    accreditationStatus: "NAAC Accredited",
    accreditationFile: "naac-ise.pdf",
    duration: 4,
    totalCredits: 180,
    status: "active",
  },
  {
    id: 4,
    name: "Bachelor of Technology",
    code: "B.Tech-ECE",
    department: "Electronics & Communication",
    parentalDepartment: "Electronics & Communication",
    sanctionedIntake: 60,
    accreditationStatus: "NBA Accredited",
    accreditationFile: "nba-ece.pdf",
    duration: 4,
    totalCredits: 180,
    status: "inactive",
  },
]

export default function ProgramsPage() {
  const [programs, setPrograms] = useState(initialPrograms)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProgram, setCurrentProgram] = useState<any>(null)

  // Filter programs based on search term
  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProgram = (newProgram: any) => {
    const programWithId = {
      ...newProgram,
      id: programs.length + 1,
      status: "active",
    }
    setPrograms([...programs, programWithId])
    setIsAddDialogOpen(false)
  }

  const handleEditProgram = (updatedProgram: any) => {
    setPrograms(programs.map((program) => (program.id === updatedProgram.id ? updatedProgram : program)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteProgram = (id: number) => {
    setPrograms(
      programs.map((program) =>
        program.id === id ? { ...program, status: program.status === "active" ? "inactive" : "active" } : program,
      ),
    )
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Management</h1>
          <p className="text-muted-foreground">Manage academic programs, codes, and accreditation status</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Program</DialogTitle>
              <DialogDescription>Fill in the details to add a new academic program.</DialogDescription>
            </DialogHeader>
            <ProgramForm onSubmit={handleAddProgram} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search programs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Duration (Years)</TableHead>
              <TableHead>Intake</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrograms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No programs found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.code}</TableCell>
                  <TableCell>{program.department}</TableCell>
                  <TableCell>{program.duration}</TableCell>
                  <TableCell>{program.sanctionedIntake}</TableCell>
                  <TableCell>
                    <Badge variant={program.status === "active" ? "default" : "secondary"}>
                      {program.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">Open menu</span>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <path
                              d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentProgram(program)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentProgram(program)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentProgram(program)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {program.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Program Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Program Details</DialogTitle>
            <DialogDescription>Detailed information about the program.</DialogDescription>
          </DialogHeader>
          {currentProgram && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Program Name</Label>
                <div className="col-span-3">{currentProgram.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Program Code</Label>
                <div className="col-span-3">{currentProgram.code}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Department</Label>
                <div className="col-span-3">{currentProgram.department}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Parental Department</Label>
                <div className="col-span-3">{currentProgram.parentalDepartment}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Sanctioned Intake</Label>
                <div className="col-span-3">{currentProgram.sanctionedIntake}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Accreditation Status</Label>
                <div className="col-span-3">{currentProgram.accreditationStatus}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Accreditation File</Label>
                <div className="col-span-3 flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  {currentProgram.accreditationFile}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Program Duration</Label>
                <div className="col-span-3">{currentProgram.duration} years</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Total Credits</Label>
                <div className="col-span-3">{currentProgram.totalCredits}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="col-span-3">
                  <Badge variant={currentProgram.status === "active" ? "default" : "secondary"}>
                    {currentProgram.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Program Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
            <DialogDescription>Update the program details.</DialogDescription>
          </DialogHeader>
          {currentProgram && (
            <ProgramForm
              program={currentProgram}
              onSubmit={handleEditProgram}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Program Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentProgram?.status === "active" ? "Deactivate" : "Activate"} Program</DialogTitle>
            <DialogDescription>
              {currentProgram?.status === "active"
                ? "This will deactivate the program. It can be reactivated later."
                : "This will reactivate the program."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentProgram?.status === "active" ? "deactivate" : "activate"}{" "}
              <span className="font-semibold">
                {currentProgram?.name} ({currentProgram?.code})
              </span>
              ?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentProgram?.status === "active" ? "destructive" : "default"}
              onClick={() => handleDeleteProgram(currentProgram?.id)}
            >
              {currentProgram?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

