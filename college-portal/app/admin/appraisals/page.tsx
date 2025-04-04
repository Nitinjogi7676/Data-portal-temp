"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
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
import { AppraisalForm } from "@/components/appraisal-form"

// Sample data for appraisals
const initialAppraisals = [
  {
    id: 1,
    name: "Annual Faculty Performance Review",
    type: "Annual",
    year: "2023",
    description: "Comprehensive annual review of faculty performance across teaching, research, and service.",
    createdBy: "Admin User",
    createdDate: "2023-01-15",
    status: "active",
    sections: [
      {
        name: "Teaching Performance",
        weightage: 40,
        subsections: [
          { name: "Course Delivery", criteria: "Student Feedback" },
          { name: "Course Materials", criteria: "Quality Assessment" },
        ],
      },
      {
        name: "Research Output",
        weightage: 30,
        subsections: [
          { name: "Publications", criteria: "Journal Impact Factor" },
          { name: "Research Grants", criteria: "Funding Amount" },
        ],
      },
      {
        name: "Service & Administration",
        weightage: 30,
        subsections: [
          { name: "Committee Work", criteria: "Contribution Assessment" },
          { name: "Student Mentoring", criteria: "Feedback" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Mid-Year Progress Review",
    type: "Mid-Year",
    year: "2023",
    description: "Mid-year check-in to assess progress towards annual goals.",
    createdBy: "Admin User",
    createdDate: "2023-06-10",
    status: "active",
    sections: [
      {
        name: "Goal Progress",
        weightage: 60,
        subsections: [
          { name: "Teaching Goals", criteria: "Progress Percentage" },
          { name: "Research Goals", criteria: "Progress Percentage" },
        ],
      },
      {
        name: "Professional Development",
        weightage: 40,
        subsections: [
          { name: "Workshops Attended", criteria: "Quantity & Quality" },
          { name: "Skills Acquired", criteria: "Self-Assessment" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "New Faculty Onboarding Assessment",
    type: "Special",
    year: "2023",
    description: "Assessment for newly joined faculty members after their first semester.",
    createdBy: "Admin User",
    createdDate: "2023-03-22",
    status: "inactive",
    sections: [
      {
        name: "Teaching Readiness",
        weightage: 50,
        subsections: [
          { name: "Classroom Management", criteria: "Observation" },
          { name: "Student Engagement", criteria: "Feedback" },
        ],
      },
      {
        name: "Department Integration",
        weightage: 50,
        subsections: [
          { name: "Collaboration", criteria: "Peer Feedback" },
          { name: "Contribution", criteria: "HOD Assessment" },
        ],
      },
    ],
  },
]

export default function AppraisalsPage() {
  const [appraisals, setAppraisals] = useState(initialAppraisals)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAppraisal, setCurrentAppraisal] = useState<any>(null)

  // Filter appraisals based on search term
  const filteredAppraisals = appraisals.filter(
    (appraisal) =>
      appraisal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appraisal.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appraisal.year.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddAppraisal = (newAppraisal: any) => {
    const appraisalWithId = {
      ...newAppraisal,
      id: appraisals.length + 1,
      createdBy: "Admin User",
      createdDate: new Date().toISOString().split("T")[0],
      status: "active",
    }
    setAppraisals([...appraisals, appraisalWithId])
    setIsAddDialogOpen(false)
  }

  const handleEditAppraisal = (updatedAppraisal: any) => {
    setAppraisals(appraisals.map((appraisal) => (appraisal.id === updatedAppraisal.id ? updatedAppraisal : appraisal)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteAppraisal = (id: number) => {
    setAppraisals(
      appraisals.map((appraisal) =>
        appraisal.id === id
          ? { ...appraisal, status: appraisal.status === "active" ? "inactive" : "active" }
          : appraisal,
      ),
    )
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appraisal Structure Management</h1>
          <p className="text-muted-foreground">Configure and manage faculty appraisal structures</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Appraisal Structure
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Add New Appraisal Structure</DialogTitle>
              <DialogDescription>
                Create a new appraisal structure with sections and evaluation criteria.
              </DialogDescription>
            </DialogHeader>
            <AppraisalForm onSubmit={handleAddAppraisal} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search appraisals..."
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
              <TableHead>Appraisal Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppraisals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No appraisals found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAppraisals.map((appraisal) => (
                <TableRow key={appraisal.id}>
                  <TableCell className="font-medium">{appraisal.name}</TableCell>
                  <TableCell>{appraisal.type}</TableCell>
                  <TableCell>{appraisal.year}</TableCell>
                  <TableCell>{appraisal.createdBy}</TableCell>
                  <TableCell>{new Date(appraisal.createdDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={appraisal.status === "active" ? "default" : "secondary"}>
                      {appraisal.status === "active" ? "Active" : "Inactive"}
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
                            setCurrentAppraisal(appraisal)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentAppraisal(appraisal)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentAppraisal(appraisal)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {appraisal.status === "active" ? "Deactivate" : "Activate"}
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

      {/* View Appraisal Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Appraisal Structure Details</DialogTitle>
            <DialogDescription>Detailed information about the appraisal structure.</DialogDescription>
          </DialogHeader>
          {currentAppraisal && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Appraisal Name</Label>
                  <p>{currentAppraisal.name}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Type</Label>
                  <p>{currentAppraisal.type}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Year</Label>
                  <p>{currentAppraisal.year}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Status</Label>
                  <p>
                    <Badge variant={currentAppraisal.status === "active" ? "default" : "secondary"}>
                      {currentAppraisal.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm">{currentAppraisal.description}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Sections</h3>
                <div className="space-y-4">
                  {currentAppraisal.sections.map((section: any, index: number) => (
                    <div key={index} className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{section.name}</h4>
                        <Badge variant="outline">Weightage: {section.weightage}%</Badge>
                      </div>
                      {section.subsections && section.subsections.length > 0 && (
                        <div className="mt-2">
                          <h5 className="text-sm font-medium text-muted-foreground">Subsections:</h5>
                          <ul className="mt-1 space-y-1">
                            {section.subsections.map((subsection: any, subIndex: number) => (
                              <li key={subIndex} className="text-sm">
                                <span className="font-medium">{subsection.name}</span> - {subsection.criteria}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Created By</Label>
                  <p>{currentAppraisal.createdBy}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Created Date</Label>
                  <p>{new Date(currentAppraisal.createdDate).toLocaleDateString()}</p>
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

      {/* Edit Appraisal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Appraisal Structure</DialogTitle>
            <DialogDescription>Update the appraisal structure details.</DialogDescription>
          </DialogHeader>
          {currentAppraisal && (
            <AppraisalForm
              appraisal={currentAppraisal}
              onSubmit={handleEditAppraisal}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Appraisal Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentAppraisal?.status === "active" ? "Deactivate" : "Activate"} Appraisal</DialogTitle>
            <DialogDescription>
              {currentAppraisal?.status === "active"
                ? "This will deactivate the appraisal structure. It can be reactivated later."
                : "This will reactivate the appraisal structure."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentAppraisal?.status === "active" ? "deactivate" : "activate"}{" "}
              <span className="font-semibold">{currentAppraisal?.name}</span>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentAppraisal?.status === "active" ? "destructive" : "default"}
              onClick={() => handleDeleteAppraisal(currentAppraisal?.id)}
            >
              {currentAppraisal?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

