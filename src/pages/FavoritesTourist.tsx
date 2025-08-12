import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Clock, Users, Star, Trash2, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FavoritesTouristProps {
  language: 'ar' | 'en';
  isDark: boolean;
}

const FavoritesTourist = ({ language, isDark }: FavoritesTouristProps) => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "رحلة البتراء الساحرة",
      description: "استكشف عجائب البتراء الوردية والحضارة النبطية العريقة",
      price: 350,
      duration: "3 أيام",
      groupSize: "8-12",
      rating: 4.8,
      reviews: 156,
      image: "/src/assets/petra-hero.jpg",
      organizer: "أحمد محمد",
      location: "البتراء، الأردن",
      addedDate: "2024-02-20"
    },
    {
      id: 2,
      title: "مغامرة وادي رم",
      description: "ليلة تحت النجوم في الصحراء مع جولات الجمال والجيب",
      price: 280,
      duration: "2 أيام",
      groupSize: "6-10",
      rating: 4.9,
      reviews: 203,
      image: "/src/assets/wadi-rum.jpg",
      organizer: "سارة أحمد",
      location: "وادي رم، الأردن",
      addedDate: "2024-02-15"
    },
    {
      id: 3,
      title: "استرخاء البحر الميت",
      description: "تجربة علاجية فريدة في أخفض نقطة على سطح الأرض",
      price: 120,
      duration: "يوم واحد",
      groupSize: "10-15",
      rating: 4.7,
      reviews: 89,
      image: "/src/assets/dead-sea.jpg",
      organizer: "محمد علي",
      location: "البحر الميت، الأردن",
      addedDate: "2024-01-30"
    }
  ]);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
    toast({
      title: "تم الحذف",
      description: "تم حذف الرحلة من المفضلة بنجاح"
    });
  };

  const shareTrip = (tripTitle: string) => {
    toast({
      title: "تم النسخ",
      description: `تم نسخ رابط "${tripTitle}" إلى الحافظة`
    });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{language === 'ar' ? 'الرحلات المفضلة' : 'Favorite Trips'}</h1>
          <p className="text-xl text-muted-foreground">
            {language === 'ar' ? 'الرحلات التي أعجبتك وتريد العودة إليها لاحقاً' : 'Trips you liked and want to revisit later'}
          </p>
        </div>

        {favorites.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {language === 'ar' ? `لديك ${favorites.length} رحلة في المفضلة` : `You have ${favorites.length} trips in favorites`}
              </p>
              <Button variant="outline">
                <Heart className="w-4 h-4 ml-2 fill-red-500 text-red-500" />
                {language === 'ar' ? 'مسح جميع المفضلة' : 'Clear All Favorites'}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {favorites.map((trip) => (
                <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={trip.image} 
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
                      {trip.price} د.أ
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full p-2 h-8 w-8 bg-white/90 hover:bg-white"
                        onClick={() => removeFavorite(trip.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg">{trip.title}</CardTitle>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 ml-1" />
                      {trip.location}
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {trip.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex justify-between items-center mb-3 text-sm">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 ml-1 text-primary" />
                        {trip.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 ml-1 text-primary" />
                        {trip.groupSize}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1" />
                        <span className="font-medium">{trip.rating}</span>
                        <span className="text-muted-foreground text-sm mr-1">
                          ({trip.reviews})
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {language === 'ar' ? 'منظم بواسطة:' : 'Organized by:'} {trip.organizer}
                    </p>
                    
                    <p className="text-xs text-muted-foreground mb-4">
                      {language === 'ar' ? 'أضيف للمفضلة:' : 'Added on:'} {trip.addedDate}
                    </p>
                    
                    <div className="flex gap-2">
                      <Link to={`/trip/${trip.id}`}>
                        <Button className="flex-1">
                          {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => shareTrip(trip.title)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-4">{language === 'ar' ? 'لا توجد رحلات مفضلة' : 'No Favorite Trips'}</h2>
            <p className="text-muted-foreground mb-8">
              {language === 'ar' ? 'ابدأ بإضافة الرحلات التي تعجبك إلى المفضلة لتتمكن من العودة إليها بسهولة' : 'Start adding trips you like to favorites to revisit them easily'}
            </p>
            <Link to="/explore-trips">
              <Button>
                {language === 'ar' ? 'استكشف الرحلات' : 'Explore Trips'}
              </Button>
            </Link>
          </div>
        )}
      </main>
      <Footer language={language} />
    </div>
  );
};

export default FavoritesTourist;