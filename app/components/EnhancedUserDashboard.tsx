"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pencil,
  CalendarIcon,
  Clock,
  MapPin,
  Phone,
  User,
  Bell,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  Info,
  Heart,
} from "lucide-react"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"

// Add this CSS to fix calendar proportions
const calendarStyles = {
  "--day-size": "36px",
  "--day-margin": "2px",
} as React.CSSProperties

// Mock data for user's listings
const userListings = [
  {
    id: 1,
    title: "Modern Apartment",
    image: "/images/studio1.jpg",
    price: 250000,
    category: "sale",
    status: "approved",
    propertyType: "apartment",
    views: 120,
    inquiries: 8,
  },
  {
    id: 2,
    title: "Cozy Studio",
    image: "/images/studio2.jpg",
    price: 1200,
    category: "rent",
    status: "pending",
    propertyType: "apartment",
    views: 85,
    inquiries: 5,
  },
  {
    id: 3,
    title: "Family House",
    image: "/images/studio3.jpg",
    price: 450000,
    category: "sale",
    status: "approved",
    propertyType: "house",
    views: 210,
    inquiries: 12,
  },
]

// Mock data for visualization
const viewsData = [
  { name: "Jan", views: 400, inquiries: 40 },
  { name: "Feb", views: 300, inquiries: 30 },
  { name: "Mar", views: 500, inquiries: 45 },
  { name: "Apr", views: 280, inquiries: 25 },
  { name: "May", views: 590, inquiries: 60 },
  { name: "Jun", views: 320, inquiries: 35 },
]

const propertyTypeData = [
  { name: "Apartment", value: 2 },
  { name: "House", value: 1 },
  { name: "Commercial", value: 0 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

// Mock data for calendar events
const initialEvents = [
  {
    id: 1,
    type: "call",
    clientName: "John Smith",
    phoneNumber: "555-123-4567",
    description: "Discuss property listing https://propertyfinder.com/listing/123 - Client interested in pricing",
    date: new Date(2023, 5, 15, 10, 30),
    reminder: true,
  },
  {
    id: 2,
    type: "meeting",
    clientName: "Sarah Johnson",
    phoneNumber: "555-987-6543",
    address: "123 Main St, Anytown, CA",
    date: new Date(2023, 5, 18, 14, 0),
    reminder: true,
  },
]

// Mock data for messages
const initialMessages = [
  {
    id: 1,
    sender: "John Smith",
    avatar: "/images/agent1.jpg",
    subject: "Inquiry about Modern Apartment",
    content:
      "Hello, I'm interested in your Modern Apartment listing. Is it still available? I would like to schedule a viewing this weekend if possible.",
    date: new Date(2023, 5, 15, 10, 30),
    read: false,
  },
  {
    id: 2,
    sender: "PropertyFinder Support",
    avatar: "/images/agent2.jpg",
    subject: "Your listing has been approved",
    content:
      "Your listing 'Family House' has been approved and is now visible to potential buyers. You can check the status in your dashboard.",
    date: new Date(2023, 5, 14, 15, 45),
    read: true,
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    avatar: "/images/agent1.jpg",
    subject: "Question about Cozy Studio",
    content:
      "Hi there, I saw your Cozy Studio listing and I have a few questions. Is parking included? And are utilities covered in the rent?",
    date: new Date(2023, 5, 13, 9, 15),
    read: false,
  },
]

// Mock data for notifications
const initialNotifications = [
  {
    id: 1,
    type: "info",
    title: "New feature available",
    description: "You can now schedule virtual tours for your properties",
    date: new Date(2023, 5, 16, 8, 0),
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Listing approved",
    description: "Your listing 'Family House' has been approved",
    date: new Date(2023, 5, 15, 14, 30),
    read: true,
  },
  {
    id: 3,
    type: "alert",
    title: "Payment reminder",
    description: "Your subscription will renew in 3 days",
    date: new Date(2023, 5, 14, 10, 0),
    read: false,
  },
  {
    id: 4,
    type: "warning",
    title: "Listing views dropping",
    description: "Your 'Cozy Studio' listing has seen fewer views this week",
    date: new Date(2023, 5, 13, 16, 45),
    read: false,
  },
  {
    id: 5,
    type: "favorite",
    title: "New favorite",
    description: "Someone added your 'Modern Apartment' to their favorites",
    date: new Date(2023, 5, 12, 11, 20),
    read: true,
  },
]

export default function EnhancedUserDashboard() {
  const [listings, setListings] = useState(userListings)
  const [selectedPropertyType, setSelectedPropertyType] = useState("all")
  const [editingListing, setEditingListing] = useState<any>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState(initialEvents)
  const [newEvent, setNewEvent] = useState({
    type: "call",
    clientName: "",
    phoneNumber: "",
    description: "",
    address: "",
    date: new Date(),
    reminder: true,
    reminderType: "day",
    reminderTime: 1,
    sendEmail: true,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showSchedule, setShowSchedule] = useState(false)
  const [newListing, setNewListing] = useState({
    title: "",
    price: 0,
    location: "",
    category: "sale",
    propertyType: "apartment",
    image: "/placeholder.svg?height=200&width=300",
    status: "pending",
    views: 0,
    inquiries: 0,
  })
  const [messages, setMessages] = useState(initialMessages)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [replyContent, setReplyContent] = useState("")

  // Filter events for the selected date
  const selectedDateEvents = events.filter(
    (event) =>
      date &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear(),
  )

  // Dates with events for highlighting in calendar
  const datesWithEvents = events.map((event) => event.date)

  // Count unread messages and notifications
  const unreadMessagesCount = messages.filter((message) => !message.read).length
  const unreadNotificationsCount = notifications.filter((notification) => !notification.read).length

  const handleEdit = (listing: any) => {
    setEditingListing(listing)
  }

  const handleSaveEdit = (updatedListing: any) => {
    setListings(listings.map((listing) => (listing.id === updatedListing.id ? updatedListing : listing)))
    setEditingListing(null)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditingListing({ ...editingListing, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleAddEvent = () => {
    const newId = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1
    setEvents([...events, { ...newEvent, id: newId }])

    let reminderText = ""
    if (newEvent.reminder) {
      reminderText = `Reminder set for ${newEvent.reminderTime} ${newEvent.reminderType}${newEvent.reminderTime > 1 ? "s" : ""} before`
      if (newEvent.sendEmail) {
        reminderText += " with email notification"
      }
    }

    toast({
      title: "Event scheduled",
      description: `${newEvent.type === "call" ? "Call" : "Meeting"} with ${newEvent.clientName} on ${format(newEvent.date, "PPP")} at ${format(newEvent.date, "p")}. ${reminderText}`,
    })
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
    toast({
      title: "Event deleted",
      description: "The event has been removed from your calendar",
    })
  }

  const handleAddListing = () => {
    const newId = listings.length > 0 ? Math.max(...listings.map((l) => l.id)) + 1 : 1
    const newListingWithId = { ...newListing, id: newId }
    setListings([...listings, newListingWithId])
    toast({
      title: "Listing added",
      description: `${newListing.title} has been added to your listings`,
    })
  }

  const handleRemoveListing = (id: number) => {
    setListings(listings.filter((listing) => listing.id !== id))
    toast({
      title: "Listing removed",
      description: "The listing has been removed from your properties",
    })
  }

  const handleReadMessage = (id: number) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, read: true } : message)))
    const message = messages.find((m) => m.id === id)
    if (message) {
      setSelectedMessage(message)
    }
  }

  const handleReplyMessage = () => {
    if (replyContent.trim() === "") return

    toast({
      title: "Reply sent",
      description: `Your reply to ${selectedMessage.sender} has been sent`,
    })

    setReplyContent("")
  }

  const handleMarkAllMessagesRead = () => {
    setMessages(messages.map((message) => ({ ...message, read: true })))
    toast({
      title: "All messages marked as read",
      description: "Your inbox is now clear",
    })
  }

  const handleReadNotification = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "All notifications marked as read",
      description: "Your notifications are now clear",
    })
  }

  const handleClearAllNotifications = () => {
    setNotifications([])
    toast({
      title: "All notifications cleared",
      description: "Your notification list is now empty",
    })
  }

  // Simulate notification reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      events.forEach((event) => {
        if (event.reminder) {
          const eventTime = new Date(event.date)
          const reminderTime = new Date(eventTime)

          // For meetings, set reminder 1 hour before
          if (event.type === "meeting") {
            reminderTime.setHours(reminderTime.getHours() - 1)
          }

          // Check if it's time for the reminder (within the last minute)
          const diffMs = reminderTime.getTime() - now.getTime()
          if (diffMs > 0 && diffMs < 60000) {
            toast({
              title: `Upcoming ${event.type}`,
              description: `${event.type === "call" ? "Call" : "Meeting"} with ${event.clientName} ${event.type === "meeting" ? "in 1 hour" : "soon"}`,
            })
          }
        }
      })
    }

    const interval = setInterval(checkReminders, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [events])

  const filteredListings = listings.filter(
    (listing) => selectedPropertyType === "all" || listing.propertyType === selectedPropertyType,
  )

  // Function to render notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "favorite":
        return <Heart className="h-5 w-5 text-rose-500" />
      default:
        return <Bell className="h-5 w-5 text-primary" />
    }
  }

  return (
    <div className="space-y-8">
      <Toaster />

      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="notifications" className="relative">
            Notifications
            {unreadNotificationsCount > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {unreadNotificationsCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Views</CardTitle>
                <CardDescription>Monthly views and inquiries for your listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={viewsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="inquiries" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Types</CardTitle>
                <CardDescription>Distribution of your property listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={propertyTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {propertyTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Listing Performance</CardTitle>
              <CardDescription>Views and inquiries for each of your listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={listings} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" fill="#8884d8" name="Views" />
                    <Bar dataKey="inquiries" fill="#82ca9d" name="Inquiries" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{listings.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{listings.reduce((sum, listing) => sum + listing.views, 0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {listings.reduce((sum, listing) => sum + listing.inquiries, 0)}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Listings Tab */}
        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>My Listings</CardTitle>
                  <CardDescription>Manage your property listings</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/listings/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Listing
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="sale">For Sale</TabsTrigger>
                  <TabsTrigger value="rent">For Rent</TabsTrigger>
                </TabsList>
                {["all", "sale", "rent"].map((category) => (
                  <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredListings
                        .filter((listing) => category === "all" || listing.category === category)
                        .map((listing) => (
                          <Card key={listing.id}>
                            <CardContent className="p-0">
                              <div className="relative h-48">
                                <Image
                                  src={listing.image || "/placeholder.svg"}
                                  alt={listing.title}
                                  layout="fill"
                                  objectFit="cover"
                                />
                                <Badge
                                  className="absolute top-2 right-2"
                                  variant={listing.status === "approved" ? "default" : "secondary"}
                                >
                                  {listing.status}
                                </Badge>
                              </div>
                              <div className="p-4">
                                <h3 className="font-semibold">{listing.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  ${listing.price.toLocaleString()}
                                  {listing.category === "rent" ? "/month" : ""}
                                </p>
                                <p className="text-sm text-muted-foreground capitalize">{listing.propertyType}</p>
                                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                                  <span>Views: {listing.views}</span>
                                  <span>Inquiries: {listing.inquiries}</span>
                                </div>
                                <div className="flex space-x-2 mt-2">
                                  <Button variant="outline" size="sm" className="flex-1" asChild>
                                    <Link href={`/property/${listing.id}/edit`}>
                                      <Pencil className="w-4 w-4 mr-2" />
                                      Edit
                                    </Link>
                                  </Button>

                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handleRemoveListing(listing.id)}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <Card className="md:col-span-5 h-fit">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Schedule and manage your appointments</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="w-full flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate)
                      // Open schedule dialog automatically when a date is selected
                      if (newDate && selectedDateEvents.length > 0) {
                        setShowSchedule(true)
                      }
                    }}
                    className="rounded-md border"
                    style={calendarStyles}
                    modifiers={{
                      hasEvent: (date) =>
                        datesWithEvents.some(
                          (eventDate) =>
                            eventDate.getDate() === date.getDate() &&
                            eventDate.getMonth() === date.getMonth() &&
                            eventDate.getFullYear() === date.getFullYear(),
                        ),
                    }}
                    modifiersClassNames={{
                      hasEvent: "bg-primary/20",
                    }}
                  />
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Schedule New Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Schedule Event</DialogTitle>
                      <DialogDescription>Create a new call or meeting with a client.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="event-type" className="text-right">
                          Type
                        </Label>
                        <Select
                          value={newEvent.type}
                          onValueChange={(value) => setNewEvent({ ...newEvent, type: value as "call" | "meeting" })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="call">Call</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="client-name" className="text-right">
                          Client Name
                        </Label>
                        <Input
                          id="client-name"
                          value={newEvent.clientName}
                          onChange={(e) => setNewEvent({ ...newEvent, clientName: e.target.value })}
                          className="col-span-3"
                        />
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone-number" className="text-right">
                          Phone Number
                        </Label>
                        <Input
                          id="phone-number"
                          value={newEvent.phoneNumber}
                          onChange={(e) => setNewEvent({ ...newEvent, phoneNumber: e.target.value })}
                          className="col-span-3"
                        />
                      </div>

                      {newEvent.type === "call" ? (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            className="col-span-3"
                            placeholder="Add link and comments"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="address" className="text-right">
                            Address
                          </Label>
                          <Textarea
                            id="address"
                            value={newEvent.address}
                            onChange={(e) => setNewEvent({ ...newEvent, address: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Date & Time
                        </Label>
                        <div className="col-span-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !newEvent.date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {newEvent.date ? format(newEvent.date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={newEvent.date}
                                onSelect={(date) => date && setNewEvent({ ...newEvent, date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          <div className="flex items-center mt-2">
                            <Input
                              type="time"
                              value={format(newEvent.date, "HH:mm")}
                              onChange={(e) => {
                                const [hours, minutes] = e.target.value.split(":").map(Number)
                                const newDate = new Date(newEvent.date)
                                newDate.setHours(hours)
                                newDate.setMinutes(minutes)
                                setNewEvent({ ...newEvent, date: newDate })
                              }}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="reminder" className="text-right">
                          Reminder
                        </Label>
                        <div className="flex flex-col space-y-2 col-span-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="reminder"
                              checked={newEvent.reminder}
                              onChange={(e) => setNewEvent({ ...newEvent, reminder: e.target.checked })}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor="reminder" className="text-sm font-normal">
                              Set reminder
                            </Label>
                          </div>

                          {newEvent.reminder && (
                            <>
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="number"
                                  min="1"
                                  max="30"
                                  value={newEvent.reminderTime}
                                  onChange={(e) =>
                                    setNewEvent({ ...newEvent, reminderTime: Number.parseInt(e.target.value) })
                                  }
                                  className="w-20"
                                />
                                <Select
                                  value={newEvent.reminderType}
                                  onValueChange={(value) => setNewEvent({ ...newEvent, reminderType: value })}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="minute">Minutes</SelectItem>
                                    <SelectItem value="hour">Hours</SelectItem>
                                    <SelectItem value="day">Days</SelectItem>
                                  </SelectContent>
                                </Select>
                                <span className="text-sm">before</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="sendEmail"
                                  checked={newEvent.sendEmail}
                                  onChange={(e) => setNewEvent({ ...newEvent, sendEmail: e.target.checked })}
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                <Label htmlFor="sendEmail" className="text-sm font-normal">
                                  Send email notification
                                </Label>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleAddEvent}>
                        Schedule Event
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="md:col-span-7">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{date ? format(date, "MMMM d, yyyy") : "Select a date"}</CardTitle>
                    <CardDescription>
                      {selectedDateEvents.length === 0
                        ? "No events scheduled for this day"
                        : `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? "s" : ""} scheduled`}
                    </CardDescription>
                  </div>
                  {selectedDateEvents.length > 0 && (
                    <Dialog open={showSchedule} onOpenChange={setShowSchedule}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Schedule
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Schedule for {date ? format(date, "MMMM d, yyyy") : ""}</DialogTitle>
                          <DialogDescription>
                            {selectedDateEvents.length} event{selectedDateEvents.length > 1 ? "s" : ""} scheduled for
                            this day
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto py-4">
                          {selectedDateEvents.map((event) => (
                            <Card key={event.id}>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center">
                                    {event.type === "call" ? (
                                      <Phone className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full mr-3" />
                                    ) : (
                                      <MapPin className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full mr-3" />
                                    )}
                                    <div>
                                      <h3 className="font-medium">
                                        {event.type === "call" ? "Call" : "Meeting"} with {event.clientName}
                                      </h3>
                                      <p className="text-sm text-muted-foreground flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {format(event.date, "h:mm a")}
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                    onClick={() => handleDeleteEvent(event.id)}
                                  >
                                    Cancel
                                  </Button>
                                </div>

                                <div className="mt-3 pl-12 space-y-1">
                                  <p className="text-sm flex items-center">
                                    <User className="h-3 w-3 mr-1" />
                                    {event.clientName}
                                  </p>
                                  <p className="text-sm flex items-center">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {event.phoneNumber}
                                  </p>
                                  {event.type === "call" ? (
                                    <p className="text-sm">
                                      <span className="text-muted-foreground">Description: </span>
                                      {event.description}
                                    </p>
                                  ) : (
                                    <p className="text-sm flex items-center">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {event.address}
                                    </p>
                                  )}
                                  {event.reminder && (
                                    <p className="text-xs flex items-center text-muted-foreground">
                                      <Bell className="h-3 w-3 mr-1" />
                                      {event.type === "meeting" ? "Reminder 1 hour before" : "Reminder enabled"}
                                    </p>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="mx-auto h-12 w-12 opacity-30" />
                    <p className="mt-2">No events scheduled for this day</p>
                    <p className="text-sm">Select "Schedule New Event" to add one</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <Card key={event.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              {event.type === "call" ? (
                                <Phone className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full mr-3" />
                              ) : (
                                <MapPin className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full mr-3" />
                              )}
                              <div>
                                <h3 className="font-medium">
                                  {event.type === "call" ? "Call" : "Meeting"} with {event.clientName}
                                </h3>
                                <p className="text-sm text-muted-foreground flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {format(event.date, "h:mm a")}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              Cancel
                            </Button>
                          </div>

                          <div className="mt-3 pl-12 space-y-1">
                            <p className="text-sm flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {event.clientName}
                            </p>
                            <p className="text-sm flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {event.phoneNumber}
                            </p>
                            {event.type === "call" ? (
                              <p className="text-sm">
                                <span className="text-muted-foreground">Description: </span>
                                {event.description}
                              </p>
                            ) : (
                              <p className="text-sm flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {event.address}
                              </p>
                            )}
                            {event.reminder && (
                              <p className="text-xs flex items-center text-muted-foreground">
                                <Bell className="h-3 w-3 mr-1" />
                                {event.type === "meeting" ? "Reminder 1 hour before" : "Reminder enabled"}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Stay updated with important alerts</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleMarkAllNotificationsRead}>
                    Mark All Read
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleClearAllNotifications}>
                    Clear All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="mx-auto h-12 w-12 opacity-30" />
                    <p className="mt-2">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start p-4 rounded-lg transition-colors",
                        notification.read ? "bg-secondary/20" : "bg-secondary/40",
                      )}
                      onClick={() => handleReadNotification(notification.id)}
                    >
                      <div className="mr-3 mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={cn("font-medium", !notification.read && "font-semibold")}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-muted-foreground ml-2">
                            {format(notification.date, "MMM d, h:mm a")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                      {!notification.read && <div className="ml-2 h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

