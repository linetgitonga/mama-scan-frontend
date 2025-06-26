"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Play,
  Download,
  BookOpen,
  Video,
  FileText,
  Award,
  Clock,
  Users,
  Star,
  CheckCircle,
  Lock,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TrainingMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const trainingMaterials = [
    {
      id: "1",
      title: "Introduction to Cervical Cancer Screening",
      description: "Comprehensive overview of cervical cancer, risk factors, and the importance of early detection.",
      category: "basics",
      type: "video",
      duration: "45 minutes",
      difficulty: "beginner",
      rating: 4.8,
      enrollments: 1247,
      completed: true,
      progress: 100,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Dr. Sarah Mwangi",
      lastUpdated: "2024-01-15",
      prerequisites: [],
      learningObjectives: [
        "Understand cervical cancer epidemiology",
        "Identify key risk factors",
        "Learn screening guidelines",
      ],
    },
    {
      id: "2",
      title: "MAMA-SCAN AI System Training",
      description: "Learn how to effectively use the MAMA-SCAN AI-powered risk assessment tool.",
      category: "technology",
      type: "interactive",
      duration: "2 hours",
      difficulty: "intermediate",
      rating: 4.9,
      enrollments: 892,
      completed: true,
      progress: 100,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Tech Team",
      lastUpdated: "2024-01-20",
      prerequisites: ["Introduction to Cervical Cancer Screening"],
      learningObjectives: [
        "Navigate the MAMA-SCAN interface",
        "Interpret AI risk scores",
        "Make appropriate referral decisions",
      ],
    },
    {
      id: "3",
      title: "Visual Inspection with Acetic Acid (VIA)",
      description: "Hands-on training for performing VIA examinations and interpreting results.",
      category: "clinical",
      type: "video",
      duration: "1.5 hours",
      difficulty: "intermediate",
      rating: 4.7,
      enrollments: 634,
      completed: false,
      progress: 65,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Dr. Peter Kimani",
      lastUpdated: "2024-01-10",
      prerequisites: ["Introduction to Cervical Cancer Screening"],
      learningObjectives: ["Perform VIA examination", "Interpret VIA results", "Document findings properly"],
    },
    {
      id: "4",
      title: "Patient Communication and Counseling",
      description: "Essential skills for communicating with patients about screening results and follow-up care.",
      category: "communication",
      type: "document",
      duration: "30 minutes",
      difficulty: "beginner",
      rating: 4.6,
      enrollments: 1156,
      completed: false,
      progress: 0,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Dr. Mary Njoroge",
      lastUpdated: "2024-01-12",
      prerequisites: [],
      learningObjectives: [
        "Communicate results effectively",
        "Provide emotional support",
        "Explain follow-up procedures",
      ],
    },
    {
      id: "5",
      title: "Advanced Risk Assessment Techniques",
      description: "Deep dive into complex risk factors and advanced assessment methodologies.",
      category: "advanced",
      type: "video",
      duration: "3 hours",
      difficulty: "advanced",
      rating: 4.9,
      enrollments: 234,
      completed: false,
      progress: 0,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Dr. James Omondi",
      lastUpdated: "2024-01-18",
      prerequisites: ["MAMA-SCAN AI System Training", "Visual Inspection with Acetic Acid (VIA)"],
      learningObjectives: ["Analyze complex risk patterns", "Handle edge cases", "Optimize screening protocols"],
    },
    {
      id: "6",
      title: "Data Collection and Quality Assurance",
      description: "Best practices for accurate data collection and maintaining data quality standards.",
      category: "data",
      type: "interactive",
      duration: "1 hour",
      difficulty: "intermediate",
      rating: 4.5,
      enrollments: 567,
      completed: false,
      progress: 25,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Data Team",
      lastUpdated: "2024-01-14",
      prerequisites: ["MAMA-SCAN AI System Training"],
      learningObjectives: ["Ensure data accuracy", "Follow quality protocols", "Handle data validation"],
    },
    {
      id: "7",
      title: "Emergency Protocols and Referral Guidelines",
      description: "Critical procedures for handling urgent cases and emergency referrals.",
      category: "emergency",
      type: "document",
      duration: "45 minutes",
      difficulty: "intermediate",
      rating: 4.8,
      enrollments: 789,
      completed: true,
      progress: 100,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Emergency Response Team",
      lastUpdated: "2024-01-16",
      prerequisites: ["Introduction to Cervical Cancer Screening"],
      learningObjectives: [
        "Identify emergency situations",
        "Execute rapid referral protocols",
        "Coordinate with specialists",
      ],
    },
    {
      id: "8",
      title: "Community Outreach and Education",
      description: "Strategies for effective community engagement and health education programs.",
      category: "outreach",
      type: "video",
      duration: "2 hours",
      difficulty: "beginner",
      rating: 4.4,
      enrollments: 445,
      completed: false,
      progress: 0,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Community Health Team",
      lastUpdated: "2024-01-08",
      prerequisites: [],
      learningObjectives: ["Design outreach programs", "Engage community leaders", "Measure program effectiveness"],
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "interactive":
        return <BookOpen className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      basics: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      technology: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      clinical: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      communication: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      data: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      emergency: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      outreach: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const filteredMaterials = trainingMaterials.filter((material) => {
    const matchesSearch =
      searchTerm === "" ||
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || material.category === categoryFilter

    const matchesDifficulty = difficultyFilter === "all" || material.difficulty === difficultyFilter

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && material.completed) ||
      (statusFilter === "in-progress" && material.progress > 0 && !material.completed) ||
      (statusFilter === "not-started" && material.progress === 0)

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus
  })

  const stats = {
    total: trainingMaterials.length,
    completed: trainingMaterials.filter((m) => m.completed).length,
    inProgress: trainingMaterials.filter((m) => m.progress > 0 && !m.completed).length,
    notStarted: trainingMaterials.filter((m) => m.progress === 0).length,
  }

  const overallProgress = Math.round(
    trainingMaterials.reduce((sum, m) => sum + m.progress, 0) / trainingMaterials.length,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training Materials</h1>
          <p className="text-muted-foreground">Enhance your skills with comprehensive training resources</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Award className="h-4 w-4 mr-2" />
            Certificates
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Your Learning Progress
          </CardTitle>
          <CardDescription>Track your training completion and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.notStarted}</div>
              <p className="text-sm text-muted-foreground">Not Started</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Completion</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search training materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="basics">Basics</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="clinical">Clinical</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="data">Data</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="outreach">Outreach</SelectItem>
              </SelectContent>
            </Select>

            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Training Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={material.thumbnail || "/placeholder.svg"}
                alt={material.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <Badge className={getCategoryColor(material.category)}>{material.category}</Badge>
                {material.completed && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <div className="absolute bottom-2 left-2">
                <Badge className={getDifficultyColor(material.difficulty)}>{material.difficulty}</Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{material.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{material.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    {getTypeIcon(material.type)}
                    <span className="ml-1">{material.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{material.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{material.rating}</span>
                    <span className="text-muted-foreground ml-1">({material.enrollments})</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{material.enrollments}</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Instructor:</span> {material.instructor}
                </div>

                {material.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{material.progress}%</span>
                    </div>
                    <Progress value={material.progress} className="h-2" />
                  </div>
                )}

                {material.prerequisites.length > 0 && (
                  <div className="text-sm">
                    <span className="font-medium">Prerequisites:</span>
                    <div className="mt-1 space-y-1">
                      {material.prerequisites.map((prereq, index) => (
                        <div key={index} className="flex items-center text-muted-foreground">
                          <Lock className="h-3 w-3 mr-1" />
                          <span className="text-xs">{prereq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  {material.completed ? (
                    <Button variant="outline" className="flex-1">
                      <Award className="h-4 w-4 mr-2" />
                      Certificate
                    </Button>
                  ) : material.progress > 0 ? (
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  ) : (
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                  )}
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No training materials found</h3>
            <p className="text-muted-foreground">
              {searchTerm || categoryFilter !== "all" || difficultyFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "No training materials are available at the moment"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
