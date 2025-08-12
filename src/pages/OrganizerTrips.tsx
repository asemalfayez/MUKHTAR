import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Users, Calendar, MapPin } from "lucide-react";

interface OrganizerTripsProps {
  language?: 'ar' | 'en';
  isDark?: boolean;
}

const OrganizerTrips = ({ language = 'ar', isDark = false }: OrganizerTripsProps) => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: "رحلة البتراء الساحرة",
      status: "نشط",
      bookings: 15,
      price: 350,
      rating: 4.8,
      created: "2024-01-15",
      location: "البتراء",
      duration: "يوم كامل",
      capacity: 20,
      seatsLeft: 5,
      nextDate: "2025-09-15"
    },
    {
      id: 2,
      title: "مغامرة وادي رم",
      status: "مسودة",
      bookings: 0,
      price: 280,
      rating: 0,
      created: "2024-02-20",
      location: "وادي رم",
      duration: "ليلة",
      capacity: 16,
      seatsLeft: 16,
      nextDate: "—"
    },
    {
      id: 3,
      title: "جولة البحر الميت",
      status: "نشط",
      bookings: 22,
      price: 190,
      rating: 4.6,
      created: "2024-03-10",
      location: "البحر الميت",
      duration: "نصف يوم",
      capacity: 30,
      seatsLeft: 8,
      nextDate: "2025-08-22"
    }
  ]);

  const t = {
    ar: {
      title: "رحلاتي",
      addTrip: "إضافة رحلة جديدة",
      created: "تم الإنشاء",
      bookings: "الحجوزات",
      price: "السعر",
      rating: "التقييم",
      capacity: "السعة / المتبقي",
      nextDate: "أقرب موعد",
      view: "عرض",
      edit: "تعديل",
      delete: "حذف"
    },
    en: {
      title: "My Trips",
      addTrip: "Add New Trip",
      created: "Created",
      bookings: "Bookings",
      price: "Price",
      rating: "Rating",
      capacity: "Capacity / Left",
      nextDate: "Next Date",
      view: "View",
      edit: "Edit",
      delete: "Delete"
    }
  };

  const text = t[language];

  const handleDelete = (id: number) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">{text.title}</h1>
          <Link to="/create-trip">
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              {text.addTrip}
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {trips.map((trip) => (
            <Card key={trip.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{trip.title}</h3>
                    <p className="text-muted-foreground">{text.created}: {trip.created}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{trip.location}</span>
                    </div>
                  </div>
                  <Badge variant={trip.status === "نشط" ? "default" : "secondary"}>
                    {trip.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{text.bookings}</p>
                      <p className="font-medium">{trip.bookings}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{text.price}</p>
                    <p className="font-medium">{trip.price} د.أ</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{text.rating}</p>
                    <p className="font-medium">{trip.rating || "لا يوجد"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{text.capacity}</p>
                    <p className="font-medium">{trip.capacity} / {trip.seatsLeft}</p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{text.nextDate}</p>
                      <p className="font-medium">{trip.nextDate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link to={`/trip/${trip.id}`}>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      {text.view}
                    </Button>
                  </Link>
                  <Link to={`/edit-trip/${trip.id}`}>
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {text.edit}
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(trip.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {text.delete}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default OrganizerTrips;