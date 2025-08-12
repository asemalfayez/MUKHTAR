import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Phone, Mail, Clock, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookingDetailsTourist = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const booking = {
    id: "BK001",
    tripTitle: "رحلة البتراء الساحرة",
    organizer: "أحمد محمد",
    date: "2024-03-15",
    endDate: "2024-03-17",
    guests: 4,
    totalCost: 1400,
    status: "مؤكد",
    organizerPhone: "+962791234567",
    organizerEmail: "ahmed@example.com",
    bookingDate: "2024-02-20",
    paymentMethod: "بطاقة ائتمان",
    location: "البتراء، الأردن",
    duration: "3 أيام / 2 ليالي"
  };

  const itinerary = [
    {
      day: "اليوم الأول",
      title: "الوصول واستكشاف البتراء",
      description: "الوصول إلى البتراء، تسجيل الوصول في الفندق، جولة استكشافية أولى"
    },
    {
      day: "اليوم الثاني", 
      title: "جولة شاملة في البتراء",
      description: "زيارة الخزنة، الدير، المدرج الروماني، والمقابر الملكية"
    },
    {
      day: "اليوم الثالث",
      title: "المغادرة",
      description: "جولة صباحية أخيرة، تسجيل المغادرة من الفندق، العودة"
    }
  ];

  const handleContactOrganizer = () => {
    toast({
      title: language === 'ar' ? "جارٍ التوجيه..." : "Redirecting...",
      description: language === 'ar' ? "سوف يتم توجيهك إلى ملف المنظم." : "You will be redirected to the organizer's profile.",
    });
    navigate(`/organizer-profile/${booking.organizer.replace(/\s/g, '-')}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">تفاصيل الحجز</h1>
          <p className="text-muted-foreground">رقم الحجز: {booking.id}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {booking.tripTitle}
                  <Badge className="bg-green-500 text-white">{booking.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 ml-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">الوجهة</p>
                      <p className="font-medium">{booking.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 ml-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">المدة</p>
                      <p className="font-medium">{booking.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 ml-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ البداية</p>
                      <p className="font-medium">{booking.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 ml-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ النهاية</p>
                      <p className="font-medium">{booking.endDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>برنامج الرحلة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {itinerary.map((day, index) => (
                    <div key={index} className="border-r-2 border-primary pr-4 pb-4">
                      <h3 className="font-semibold text-lg">{day.day}</h3>
                      <h4 className="font-medium text-primary">{day.title}</h4>
                      <p className="text-muted-foreground">{day.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الحجز</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>عدد الأشخاص:</span>
                  <span className="font-medium">{booking.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span>السعر للشخص:</span>
                  <span className="font-medium">{booking.totalCost / booking.guests} د.أ</span>
                </div>
                <div className="flex justify-between">
                  <span>تاريخ الحجز:</span>
                  <span className="font-medium">{booking.bookingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>طريقة الدفع:</span>
                  <span className="font-medium">{booking.paymentMethod}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع:</span>
                  <span className="text-primary">{booking.totalCost} د.أ</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>معلومات المنظم</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-lg">{booking.organizer}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 ml-2 text-primary" />
                  <span>{booking.organizerPhone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 ml-2 text-primary" />
                  <span>{booking.organizerEmail}</span>
                </div>
                <Button variant="outline" className="w-full" onClick={handleContactOrganizer}>تواصل مع المنظم</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>الإجراءات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">تحميل الفاتورة</Button>
                <Button variant="outline" className="w-full">طباعة تفاصيل الحجز</Button>
                <Button variant="destructive" className="w-full">إلغاء الحجز</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default BookingDetailsTourist;