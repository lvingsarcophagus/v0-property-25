"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, CheckCircle, XCircle, UserCheck, Settings } from "lucide-react"
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
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Mock data for properties and users
const properties = [
  {
    id: 1,
    title: "Modern Apartment",
    location: "Downtown",
    price: 250000,
    status: "Approved",
    broker: "John Smith",
  },
  {
    id: 2,
    title: "Family House",
    location: "Suburbs",
    price: 450000,
    status: "Pending",
    broker: "Sarah Johnson",
  },
  {
    id: 3,
    title: "Commercial Space",
    location: "Business District",
    price: 750000,
    status: "Approved",
    broker: "Michael Brown",
  },
]

const users = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "Broker" },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "Broker" },
  { id: 3, name: "Michael Brown", email: "michael@example.com", role: "Broker" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "User" },
  { id: 5, name: "Admin User", email: "admin@example.com", role: "Admin" },
]

// Mock data for charts
const propertyTypeData = [
  { name: "Houses", value: 400 },
  { name: "Apartments", value: 300 },
  { name: "Commercial", value: 100 },
]

const monthlyRevenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 5500 },
]

const userActivityData = [
  { name: "Mon", active: 120 },
  { name: "Tue", active: 132 },
  { name: "Wed", active: 101 },
  { name: "Thu", active: 134 },
  { name: "Fri", active: 90 },
  { name: "Sat", active: 230 },
  { name: "Sun", active: 210 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AdminDashboard() {
  const [newProperty, setNewProperty] = useState({
    title: "",
    price: "",
    location: "",
    category: "",
    propertyType: "",
    description: "",
  })

  const [propertiesList, setPropertiesList] = useState(properties)
  const [autoApproval, setAutoApproval] = useState(false)
  const [editingProperty, setEditingProperty] = useState<any>(null)
  const [brokers, setBrokers] = useState(users.filter((user) => user.role === "Broker"))
  const [selectedBroker, setSelectedBroker] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProperty((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewProperty((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend API
    console.log("Submitting new property:", newProperty)

    // If auto-approval is enabled, set status to "Approved", otherwise "Pending"
    const status = autoApproval ? "Approved" : "Pending"

    // Add the new property to the list with a default broker
    const newId = propertiesList.length > 0 ? Math.max(...propertiesList.map((p) => p.id)) + 1 : 1
    const newPropertyWithId = {
      id: newId,
      title: newProperty.title,
      location: newProperty.location,
      price: Number(newProperty.price),
      status: status,
      broker: brokers[0]?.name || "Unassigned",
    }

    setPropertiesList([...propertiesList, newPropertyWithId])

    toast({
      title: "Property added",
      description: `${newProperty.title} has been added with ${status.toLowerCase()} status`,
    })

    // Reset the form after submission
    setNewProperty({
      title: "",
      price: "",
      location: "",
      category: "",
      propertyType: "",
      description: "",
    })
  }

  const handleApproveProperty = (id: number) => {
    setPropertiesList(
      propertiesList.map((property) => (property.id === id ? { ...property, status: "Approved" } : property)),
    )

    toast({
      title: "Property approved",
      description: "The property has been approved and is now visible to users",
    })
  }

  const handleRejectProperty = (id: number) => {
    setPropertiesList(
      propertiesList.map((property) => (property.id === id ? { ...property, status: "Rejected" } : property)),
    )

    toast({
      title: "Property rejected",
      description: "The property has been rejected",
    })
  }

  const handleDeleteProperty = (id: number) => {
    setPropertiesList(propertiesList.filter((property) => property.id !== id))

    toast({
      title: "Property deleted",
      description: "The property has been removed from the system",
    })
  }

  const handleChangeBroker = () => {
    if (editingProperty && selectedBroker) {
      setPropertiesList(
        propertiesList.map((property) =>
          property.id === editingProperty.id ? { ...property, broker: selectedBroker } : property,
        ),
      )

      toast({
        title: "Broker changed",
        description: `Broker for ${editingProperty.title} has been updated to ${selectedBroker}`,
      })

      setEditingProperty(null)
      setSelectedBroker("")
    }
  }

  const handleToggleAutoApproval = (checked: boolean) => {
    setAutoApproval(checked)

    toast({
      title: `Auto-approval ${checked ? "enabled" : "disabled"}`,
      description: `New property listings will be ${checked ? "automatically approved" : "pending approval"}`,
    })
  }

  return (
    <>
      <Toaster />
      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="add-property">Add Property</TabsTrigger>
          <TabsTrigger value="manage-properties">Manage Properties</TabsTrigger>
          <TabsTrigger value="manage-users">Manage Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Types</CardTitle>
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
                      >
                        {propertyTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="active" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="add-property">
          <Card>
            <CardHeader>
              <CardTitle>Add New Property</CardTitle>
              <CardDescription>Enter the details of the new property listing</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={newProperty.title} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={newProperty.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={newProperty.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newProperty.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="sale">Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    value={newProperty.propertyType}
                    onValueChange={(value) => handleSelectChange("propertyType", value)}
                  >
                    <SelectTrigger id="propertyType">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={newProperty.description}
                    onChange={handleInputChange}
                    className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="auto-approval">Status: {autoApproval ? "Auto-Approved" : "Pending Review"}</Label>
                </div>
                <Button type="submit">Add Property</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage-properties">
          <Card>
            <CardHeader>
              <CardTitle>Manage Properties</CardTitle>
              <CardDescription>View, edit, and manage property listings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Broker</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertiesList.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>{property.title}</TableCell>
                      <TableCell>{property.location}</TableCell>
                      <TableCell>${property.price.toLocaleString()}</TableCell>
                      <TableCell>
                        {property.status === "Approved" ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approved
                          </span>
                        ) : property.status === "Rejected" ? (
                          <span className="flex items-center text-red-600">
                            <XCircle className="w-4 h-4 mr-1" />
                            Rejected
                          </span>
                        ) : (
                          <span className="flex items-center text-yellow-600">
                            <XCircle className="w-4 h-4 mr-1" />
                            Pending
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{property.broker}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {property.status === "Pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleApproveProperty(property.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleRejectProperty(property.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingProperty(property)
                                  setSelectedBroker(property.broker)
                                }}
                              >
                                <UserCheck className="w-4 h-4 mr-1" />
                                Change Broker
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Change Broker</DialogTitle>
                                <DialogDescription>Assign a different broker to this property</DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="property-title">Property</Label>
                                    <Input
                                      id="property-title"
                                      value={editingProperty?.title}
                                      readOnly
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="broker-select">Select Broker</Label>
                                    <Select value={selectedBroker} onValueChange={setSelectedBroker}>
                                      <SelectTrigger id="broker-select" className="mt-1">
                                        <SelectValue placeholder="Select a broker" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {brokers.map((broker) => (
                                          <SelectItem key={broker.id} value={broker.name}>
                                            {broker.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={handleChangeBroker}>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteProperty(property.id)}>
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage-users">
          <Card>
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-approval">Auto-Approve New Listings</Label>
                    <p className="text-sm text-muted-foreground">
                      When enabled, new property listings will be automatically approved without admin review
                    </p>
                  </div>
                  <Switch id="auto-approval" checked={autoApproval} onCheckedChange={handleToggleAutoApproval} />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for new listings and user registrations
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive SMS notifications for critical system events
                        </p>
                      </div>
                      <Switch id="sms-notifications" defaultChecked={false} />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium">System Maintenance</h3>
                  <div className="mt-4 space-y-4">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Run System Diagnostics
                    </Button>
                    <Button variant="outline" className="ml-4">
                      Export System Logs
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

