
import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Save, 
  Bell, 
  Lock, 
  AlertCircle, 
  Users,
  FileText,
  BarChart3,
  Shield,
  Download
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock data for system logs
const systemLogs = [
  { id: 1, event: "System update", status: "Success", date: "2025-03-20", details: "System updated to version 2.0.1" },
  { id: 2, event: "Database backup", status: "Success", date: "2025-03-19", details: "Automated daily backup completed" },
  { id: 3, event: "User synchronization", status: "Warning", date: "2025-03-18", details: "5 users failed to sync" },
  { id: 4, event: "Security scan", status: "Error", date: "2025-03-17", details: "Vulnerability detected in payment module" },
];

// Mock data for content moderation
const contentModerationData = [
  { id: 1, contentType: "Listing", title: "Male Goat for Sale", status: "Pending", reportCount: 0, date: "2025-03-21" },
  { id: 2, contentType: "Review", title: "Review for Ahmed's Farm", status: "Approved", reportCount: 0, date: "2025-03-20" },
  { id: 3, contentType: "Listing", title: "Brown Cow - 3 Years Old", status: "Flagged", reportCount: 2, date: "2025-03-20" },
  { id: 4, contentType: "Comment", title: "Comment on Sheep Listing", status: "Rejected", reportCount: 5, date: "2025-03-19" },
];

// Mock data for deals
const dealsData = [
  { id: 1, buyer: "Ahmed Ali", seller: "Farm Fresh", animal: "Goat", price: "Rs. 45,000", status: "Completed", date: "2025-03-21" },
  { id: 2, buyer: "Fatima Khan", seller: "Quality Livestock", animal: "Cow", price: "Rs. 120,000", status: "Processing", date: "2025-03-21" },
  { id: 3, buyer: "Muhammad Imran", seller: "City Farm", animal: "Sheep", price: "Rs. 35,000", status: "Disputed", date: "2025-03-20" },
  { id: 4, buyer: "Aisha Malik", seller: "Green Pastures", animal: "Camel", price: "Rs. 150,000", status: "Pending", date: "2025-03-19" },
];

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    browserNotifications: true,
    weeklyDigest: true,
    marketingEmails: false,
  });
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    passwordExpiry: true,
    sessionTimeout: true,
    ipRestriction: false,
  });
  
  const [activeTab, setActiveTab] = useState("notifications");

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    });
  };

  const handleApproveContent = (id: number) => {
    toast({
      title: "Content approved",
      description: "The content has been approved and published.",
    });
  };

  const handleRejectContent = (id: number) => {
    toast({
      title: "Content rejected",
      description: "The content has been rejected and removed.",
    });
  };

  const handleResolveDeal = (id: number) => {
    toast({
      title: "Deal resolved",
      description: "The transaction has been marked as resolved.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="py-6 px-8 flex items-center justify-between border-b bg-card/50 sticky top-0 z-10 backdrop-blur">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold">System Settings</h1>
        </div>
        <Button onClick={handleSaveSettings} className="bg-teal-600 hover:bg-teal-700 text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="p-4 md:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 flex flex-wrap gap-2 justify-start">
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
            <TabsTrigger value="content-moderation" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Content Moderation</span>
            </TabsTrigger>
            <TabsTrigger value="deal-monitoring" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Deal Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="user-management" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">User Management</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Logs</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications from the system.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                  </div>
                  <Switch 
                    checked={notifications.emailNotifications} 
                    onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-muted-foreground">Get alerts via text message</p>
                  </div>
                  <Switch 
                    checked={notifications.smsNotifications} 
                    onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Browser Notifications</h3>
                    <p className="text-sm text-muted-foreground">Show alerts in your browser</p>
                  </div>
                  <Switch 
                    checked={notifications.browserNotifications} 
                    onCheckedChange={(checked) => setNotifications({...notifications, browserNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Weekly Digest</h3>
                    <p className="text-sm text-muted-foreground">Receive a summary of activity every week</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyDigest} 
                    onCheckedChange={(checked) => setNotifications({...notifications, weeklyDigest: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-primary" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security options for your administration portal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Require a second form of authentication</p>
                  </div>
                  <Switch 
                    checked={security.twoFactorAuth} 
                    onCheckedChange={(checked) => setSecurity({...security, twoFactorAuth: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Password Expiry</h3>
                    <p className="text-sm text-muted-foreground">Force password reset every 90 days</p>
                  </div>
                  <Switch 
                    checked={security.passwordExpiry} 
                    onCheckedChange={(checked) => setSecurity({...security, passwordExpiry: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Session Timeout</h3>
                    <p className="text-sm text-muted-foreground">Automatically log out after 30 minutes of inactivity</p>
                  </div>
                  <Switch 
                    checked={security.sessionTimeout} 
                    onCheckedChange={(checked) => setSecurity({...security, sessionTimeout: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">IP Restriction</h3>
                    <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
                  </div>
                  <Switch 
                    checked={security.ipRestriction} 
                    onCheckedChange={(checked) => setSecurity({...security, ipRestriction: checked})}
                  />
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="mr-2">Reset Security Settings</Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary">Manage API Keys</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>API Key Management</DialogTitle>
                        <DialogDescription>
                          Create and manage API keys for system integration.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-medium">Primary API Key</h4>
                            <p className="text-sm text-muted-foreground">Last used: 2 days ago</p>
                          </div>
                          <Button variant="outline" size="sm">Regenerate</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Secondary API Key</h4>
                            <p className="text-sm text-muted-foreground">Last used: Never</p>
                          </div>
                          <Button variant="outline" size="sm">Regenerate</Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                  System Health
                </CardTitle>
                <CardDescription>
                  View and manage system performance metrics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Current Version</h3>
                    <span className="font-mono bg-primary/10 px-2 py-1 rounded text-primary">v2.1.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Database Status</h3>
                    <div className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      <span>Healthy</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Storage Usage</h3>
                    <span>654.3 MB / 1 GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">API Rate Limit</h3>
                    <span>1000 requests/hour</span>
                  </div>
                  <div className="mt-6">
                    <Button variant="outline" className="mr-2">Run System Diagnostics</Button>
                    <Button variant="secondary">Check for Updates</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content-moderation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Content Moderation
                </CardTitle>
                <CardDescription>
                  Review and moderate user-generated content on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reports</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contentModerationData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.contentType}</TableCell>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>
                            <Badge variant={
                              item.status === "Approved" ? "outline" :
                              item.status === "Pending" ? "secondary" :
                              item.status === "Flagged" ? "destructive" : "default"
                            }>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.reportCount}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleApproveContent(item.id)}
                                className="h-8"
                              >
                                Approve
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm" 
                                onClick={() => handleRejectContent(item.id)}
                                className="h-8"
                              >
                                Reject
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8"
                              >
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Label>Filter by:</Label>
                    <select
                      className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="all">All Types</option>
                      <option value="listing">Listings</option>
                      <option value="review">Reviews</option>
                      <option value="comment">Comments</option>
                    </select>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="deal-monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Deal Monitoring
                </CardTitle>
                <CardDescription>
                  Track and manage transactions between buyers and sellers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Animal</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dealsData.map((deal) => (
                        <TableRow key={deal.id}>
                          <TableCell className="font-medium">{deal.buyer}</TableCell>
                          <TableCell>{deal.seller}</TableCell>
                          <TableCell>{deal.animal}</TableCell>
                          <TableCell>{deal.price}</TableCell>
                          <TableCell>
                            <Badge variant={
                              deal.status === "Completed" ? "outline" :
                              deal.status === "Processing" ? "secondary" :
                              deal.status === "Disputed" ? "destructive" : "default"
                            }>
                              {deal.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{deal.date}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleResolveDeal(deal.id)} 
                                className="h-8"
                              >
                                Resolve
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8"
                                  >
                                    Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Deal Details</DialogTitle>
                                    <DialogDescription>
                                      Transaction #{deal.id} between {deal.buyer} and {deal.seller}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4 space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm text-muted-foreground">Buyer:</div>
                                      <div>{deal.buyer}</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm text-muted-foreground">Seller:</div>
                                      <div>{deal.seller}</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm text-muted-foreground">Animal:</div>
                                      <div>{deal.animal}</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm text-muted-foreground">Price:</div>
                                      <div>{deal.price}</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm text-muted-foreground">Status:</div>
                                      <div>{deal.status}</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm text-muted-foreground">Transaction Date:</div>
                                      <div>{deal.date}</div>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline">Close</Button>
                                    <Button>Contact Parties</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Label>Filter by:</Label>
                    <select
                      className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="all">All Statuses</option>
                      <option value="completed">Completed</option>
                      <option value="processing">Processing</option>
                      <option value="disputed">Disputed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="user-management" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  User Management
                </CardTitle>
                <CardDescription>
                  Manage platform users, roles, and permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Input 
                      type="search" 
                      placeholder="Search users..." 
                      className="w-full max-w-xs"
                    />
                    <Button variant="outline" size="sm">
                      Search
                    </Button>
                  </div>
                  <Button>
                    Add User
                  </Button>
                </div>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Ahmed Ali</TableCell>
                        <TableCell>ahmed@example.com</TableCell>
                        <TableCell>Seller</TableCell>
                        <TableCell><Badge variant="outline">Active</Badge></TableCell>
                        <TableCell>2025-01-05</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8">Edit</Button>
                            <Button variant="destructive" size="sm" className="h-8">Suspend</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fatima Khan</TableCell>
                        <TableCell>fatima@example.com</TableCell>
                        <TableCell>Buyer</TableCell>
                        <TableCell><Badge variant="outline">Active</Badge></TableCell>
                        <TableCell>2025-02-12</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8">Edit</Button>
                            <Button variant="destructive" size="sm" className="h-8">Suspend</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Muhammad Imran</TableCell>
                        <TableCell>imran@example.com</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell><Badge variant="outline">Active</Badge></TableCell>
                        <TableCell>2024-11-30</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8">Edit</Button>
                            <Button variant="destructive" size="sm" className="h-8">Suspend</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Aisha Malik</TableCell>
                        <TableCell>aisha@example.com</TableCell>
                        <TableCell>Seller</TableCell>
                        <TableCell><Badge variant="destructive">Suspended</Badge></TableCell>
                        <TableCell>2025-01-10</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8">Edit</Button>
                            <Button variant="secondary" size="sm" className="h-8">Reactivate</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Label>Filter by:</Label>
                    <select
                      className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                    >
                      <option value="all">All Roles</option>
                      <option value="buyer">Buyers</option>
                      <option value="seller">Sellers</option>
                      <option value="admin">Admins</option>
                    </select>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Users
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
                <CardDescription>
                  Review system activity and error logs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {systemLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.event}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className={`mr-2 rounded-full w-2 h-2 ${
                                log.status === "Success" ? "bg-green-500" : 
                                log.status === "Warning" ? "bg-yellow-500" : "bg-red-500"
                              }`}></span>
                              {log.status}
                            </div>
                          </TableCell>
                          <TableCell>{log.date}</TableCell>
                          <TableCell>{log.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline">
                    Clear Logs
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
