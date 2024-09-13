import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-3xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">john@example.com</p>
          <p className="text-muted-foreground">+1 (555) 555-5555</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Change Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Update Email</Label>
              <Input id="email" type="email" placeholder="Enter new email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notifications">Manage Notifications</Label>
              <Checkbox id="notifications" defaultChecked>
                Receive email notifications
              </Checkbox>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Plan</Label>
              <div className="flex items-center justify-between">
                <span>Pro</span>
                <Button variant="outline" size="sm">
                  Upgrade
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="flex items-center justify-between">
                <span>Visa ending in 1234</span>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Billing History</Label>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>Pro Plan - Monthly</span>
                  <span>$49.99</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pro Plan - Monthly</span>
                  <span>$49.99</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pro Plan - Monthly</span>
                  <span>$49.99</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Recent Login Activity</Label>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>Logged in from New York, NY</span>
                  <span>2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Logged in from San Francisco, CA</span>
                  <span>1 day ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Logged in from London, UK</span>
                  <span>3 days ago</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Devices</Label>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>iPhone 14 Pro</span>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>MacBook Pro (2021)</span>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Security Events</Label>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>Suspicious login attempt</span>
                  <span>1 week ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Password changed</span>
                  <span>2 weeks ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default page;
