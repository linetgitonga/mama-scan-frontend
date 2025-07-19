"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"     
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Home,
  MessageSquare,
  FileText,
  Calendar,
  CreditCard,
  Bell,
  User,
  BookOpen,
  Activity,
  Menu,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { apiClient } from "@/lib/api"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, Stethoscope, UserCog, ClipboardList, Smartphone } from "lucide-react"

export default function GuidelinesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">MAMA-SCAN Clinical Guidelines</h1>

        <Alert className="mb-10 bg-blue-100 dark:bg-blue-800 border-blue-200">
          <ShieldAlert className="h-5 w-5 text-blue-600" />
          <AlertTitle>Confidentiality First</AlertTitle>
          <AlertDescription>
            All users must adhere to HIPAA and local data protection regulations. Patient information should never be shared outside the care team.
          </AlertDescription>
        </Alert>

        <div className="grid gap-8">
          {/* CHV Guidelines */}
          <Card className="border-blue-200">
            <CardHeader className="bg-blue-50 dark:bg-blue-800 rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <UserCog className="text-blue-600" />
                <span>Community Health Volunteers (CHVs)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="screening">
                  <AccordionTrigger>Screening Protocol</AccordionTrigger>
                  <AccordionContent>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Obtain informed consent before any screening</li>
                      <li>Follow the MamaScan AI-assisted workflow precisely</li>
                      <li>Capture images according to quality guidelines (proper lighting, focus, angles)</li>
                      <li>Record all patient symptoms in the app, no matter how minor</li>
                      <li>Never provide diagnostic interpretations - refer to clinicians</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="referrals">
                  <AccordionTrigger>Referral Procedures</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3">
                      <li className="font-medium">🚨 Immediate Referral (Red Flag):</li>
                      <li>- Visible lumps with skin changes</li>
                      <li>- Persistent bleeding/ulceration</li>
                      
                      <li className="font-medium mt-4">🟡 Urgent Referral (Within 2 weeks):</li>
                      <li>- New lumps without other symptoms</li>
                      <li>- Persistent nipple changes</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Clinician Guidelines */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50 dark:bg-green-800 rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <Stethoscope className="text-green-600" />
                <span>Clinicians & Specialists</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3">AI Results Interpretation</h3>
                  <ul className="space-y-2 text-sm">
                    <li>🔍 AI analysis is a <strong>decision support tool only</strong></li>
                    <li>Always correlate with clinical findings</li>
                    <li>Flag uncertain cases for specialist review</li>
                    <li>Document AI confidence scores in patient records</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Diagnostic Workflow</h3>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li>Verify patient identity</li>
                    <li>Review CHV-collected data</li>
                    <li>Conduct physical exam</li>
                    <li>Compare with AI analysis</li>
                    <li>Order confirmatory tests if needed</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data & Technology Guidelines */}
          <Card className="border-purple-200">
            <CardHeader className="bg-purple-100 dark:bg-purple-800 rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <Smartphone className="text-purple-600" />
                <span>Technology Protocols</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none">
                <h4>Image Capture Standards</h4>
                <ul>
                  <li>Minimum resolution: 1920x1080 pixels</li>
                  <li>White balance set to "daylight"</li>
                  <li>Include measurement scale when possible</li>
                </ul>

                <h4 className="mt-6">Data Security</h4>
                <ul>
                  <li>Never share login credentials</li>
                  <li>Log out after each session</li>
                  <li>Report lost/stolen devices immediately</li>
                  <li>Download results only to secure health systems</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Alert variant="destructive">
            <ShieldAlert className="h-5 w-5" />
            <AlertTitle>Emergency Protocols</AlertTitle>
            <AlertDescription>
              <p>For life-threatening findings: </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Call emergency services first (112 in Kenya)</li>
                <li>Then notify the MamaScan response team via emergency@mamascan.org</li>
                <li>Document all actions taken</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}