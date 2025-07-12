"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Play,
  Download,
  Clock,
  Users,
  Award,
  Search,
  CheckCircle,
  FileText,
  Video,
  Headphones,
} from "lucide-react"

interface TrainingModule {
  id: number
  title: string
  description: string
  type: "VIDEO" | "DOCUMENT" | "INTERACTIVE" | "AUDIO"
  duration: number // in minutes
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  category: "SCREENING" | "DIAGNOSIS" | "TREATMENT" | "PREVENTION" | "TECHNOLOGY"
  completed: boolean
  progress: number // 0-100
  instructor: string
  enrollments: number
  rating: number
  thumbnail?: string
  downloadable: boolean
}

const mockTrainingModules: TrainingModule[] = [
  {
    id: 1,
    title: "Introduction to Cervical Cancer Screening",
    description:
      "Comprehensive overview of cervical cancer screening methods, importance, and best practices for healthcare providers.",
    type: "VIDEO",
    duration: 45,
    difficulty: "BEGINNER",
    category: "SCREENING",
    completed: true,
    progress: 100,
    instructor: "Dr. Sarah Johnson",
    enrollments: 1250,
    rating: 4.8,
    downloadable: true,
  },
  {
    id: 2,
    title: "Advanced Colposcopy Techniques",
    description:
      "In-depth training on advanced colposcopy procedures, interpretation of findings, and biopsy techniques.",
    type: "VIDEO",
    duration: 90,
    difficulty: "ADVANCED",
    category: "DIAGNOSIS",
    completed: false,
    progress: 35,
    instructor: "Prof. Mary Wanjiku",
    enrollments: 680,
    rating: 4.9,
    downloadable: true,
  },
  {
    id: 3,
    title: "HPV Vaccination Guidelines",
    description: "Complete guide to HPV vaccination protocols, age recommendations, and patient counseling strategies.",
    type: "DOCUMENT",
    duration: 30,
    difficulty: "INTERMEDIATE",
    category: "PREVENTION",
    completed: false,
    progress: 0,
    instructor: "Dr. James Kimani",
    enrollments: 950,
    rating: 4.7,
    downloadable: true,
  },
  {
    id: 4,
    title: "AI-Assisted Screening Technology",
    description:
      "Understanding how artificial intelligence enhances cervical cancer screening accuracy and workflow optimization.",
    type: "INTERACTIVE",
    duration: 60,
    difficulty: "INTERMEDIATE",
    category: "TECHNOLOGY",
    completed: false,
    progress: 0,
    instructor: "Dr. Tech Innovator",
    enrollments: 420,
    rating: 4.6,
    downloadable: false,
  },
  {
    id: 5,
    title: "Patient Communication and Counseling",
    description:
      "Essential skills for effective patient communication during screening procedures and result discussions.",
    type: "AUDIO",
    duration: 40,
    difficulty: "BEGINNER",
    category: "SCREENING",
    completed: true,
    progress: 100,
    instructor: "Dr. Grace Muthoni",
    enrollments: 1100,
    rating: 4.5,
    downloadable: true,
  },
  {
    id: 6,
    title: "Treatment Options and Referral Protocols",
    description: "Comprehensive guide to treatment modalities and when to refer patients for specialized care.",
    type: "DOCUMENT",
    duration: 50,
    difficulty: "ADVANCED",
    category: "TREATMENT",
    completed: false,
    progress: 20,
    instructor: "Dr. Specialist Care",
    enrollments: 780,
    rating: 4.8,
    downloadable: true,
  },
]

export default function TrainingMaterialsPage() {
  const [modules, setModules] = useState<TrainingModule[]>(mockTrainingModules)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || module.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "all" || module.difficulty === difficultyFilter
    const matchesType = typeFilter === "all" || module.type === typeFilter

    return matchesSearch && matchesCategory && matchesDifficulty && matchesType
  })

  const completedModules = modules.filter((m) => m.completed).length
  const inProgressModules = modules.filter((m) => m.progress > 0 && !m.completed).length
  const totalProgress = Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <Video className="h-4 w-4" />
      case "DOCUMENT":
        return <FileText className="h-4 w-4" />
      case "AUDIO":
        return <Headphones className="h-4 w-4" />
      case "INTERACTIVE":
        return <Play className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    const variants = {
      BEGINNER: "secondary",
      INTERMEDIATE: "outline",
      ADVANCED: "default",
    } as const

    return <Badge variant={variants[difficulty as keyof typeof variants] || "secondary"}>{difficulty}</Badge>
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      SCREENING: "bg-blue-100 text-blue-800",
      DIAGNOSIS: "bg-green-100 text-green-800",
      TREATMENT: "bg-purple-100 text-purple-800",
      PREVENTION: "bg-orange-100 text-orange-800",
      TECHNOLOGY: "bg-gray-100 text-gray-800",
    }

    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Training Materials</h1>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Modules</p>
                <p className="text-2xl font-bold">{modules.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedModules}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressModules}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">{totalProgress}%</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Find Training Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="SCREENING">Screening</SelectItem>
                  <SelectItem value="DIAGNOSIS">Diagnosis</SelectItem>
                  <SelectItem value="TREATMENT">Treatment</SelectItem>
                  <SelectItem value="PREVENTION">Prevention</SelectItem>
                  <SelectItem value="TECHNOLOGY">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="BEGINNER">Beginner</SelectItem>
                  <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                  <SelectItem value="ADVANCED">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                  <SelectItem value="DOCUMENT">Document</SelectItem>
                  <SelectItem value="INTERACTIVE">Interactive</SelectItem>
                  <SelectItem value="AUDIO">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <Card key={module.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getTypeIcon(module.type)}
                  <span className="text-sm text-muted-foreground">{module.type}</span>
                </div>
                {module.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
              </div>
              <CardTitle className="text-lg">{module.title}</CardTitle>
              <CardDescription className="text-sm">{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                {getCategoryBadge(module.category)}
                {getDifficultyBadge(module.difficulty)}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {module.duration} min
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Instructor</span>
                  <span>{module.instructor}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Enrollments</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {module.enrollments.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rating</span>
                  <span>⭐ {module.rating}/5</span>
                </div>
              </div>

              {module.progress > 0 && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              )}

              <div className="flex gap-2 mt-auto">
                <Button className="flex-1" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  {module.progress > 0 ? "Continue" : "Start"}
                </Button>
                {module.downloadable && (
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No training materials found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more training modules.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
