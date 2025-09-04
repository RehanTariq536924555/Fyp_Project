import { useEffect, useState } from "react";
import { Bell, ListPlus, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Listing = {
  id: number;
  title?: string;
  createdAt?: string;
  seller?: { name?: string } | null;
};

type Order = {
  id: string;
  orderId: string;
  total: number;
  status: string;
  date?: string | null;
  buyer?: string | null;
  seller?: string | null;
};

type NotificationItem = {
  id: string;
  type: "listing" | "order";
  title: string;
  subtitle: string;
  date: string;
};

const AdminNotifications = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [listingsRes, ordersRes] = await Promise.all([
          fetch("http://localhost:3001/listings"),
          fetch("http://localhost:3001/payment/admin/all"),
        ]);

        const listings: Listing[] = await listingsRes.json();
        const orders: Order[] = await ordersRes.json();

        const listingNotifs: NotificationItem[] = (listings || []).slice(-20).map((l) => ({
          id: `listing_${l.id}`,
          type: "listing",
          title: l.title || "New Listing Created",
          subtitle: `Seller: ${l.seller?.name || "Unknown"}`,
          date: new Date((l as any).createdAt || Date.now()).toLocaleString(),
        }));

        const orderNotifs: NotificationItem[] = (orders || []).slice(-20).map((o) => ({
          id: `order_${o.id}`,
          type: "order",
          title: `New Order • ${o.orderId}`,
          subtitle: `Buyer: ${o.buyer || "Unknown"} • Seller: ${o.seller || "Unknown"} • Rs ${
            (o.total || 0).toLocaleString()
          }`,
          date: new Date(o.date || Date.now()).toLocaleString(),
        }));

        // Merge and sort by date desc (best-effort using string date)
        const merged = [...listingNotifs, ...orderNotifs].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setNotifications(merged);
      } catch (e) {
        console.error("Failed to load notifications", e);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="py-6 px-8 flex items-center justify-between border-b bg-card/50 sticky top-0 z-10 backdrop-blur">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>
        <Badge variant="outline" className="text-xs">{notifications.length} total</Badge>
      </div>

      <div className="p-8">
        <Card className="animate-fade-up">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent activity</CardTitle>
            <CardDescription>New listings by sellers and new orders by buyers</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No notifications</div>
            ) : (
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
                    <div className="mt-0.5">
                      {n.type === "listing" ? (
                        <ListPlus className="h-5 w-5 text-primary" />
                      ) : (
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium">{n.title}</p>
                        <span className="text-xs text-muted-foreground">{n.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{n.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminNotifications;


