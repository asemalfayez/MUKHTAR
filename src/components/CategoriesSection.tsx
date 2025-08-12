import { Button } from '@/components/ui/button';
import { 
  Mountain, 
  Building2, 
  Tent, 
  Waves, 
  Camera, 
  MapPin,
  Star,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext'; // استيراد useAuth
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate

interface CategoriesSectionProps {
  language: 'ar' | 'en';
}

export function CategoriesSection({ language }: CategoriesSectionProps) {
  const isRTL = language === 'ar';
  const { user } = useAuth(); // التحقق من حالة المستخدم
  const navigate = useNavigate(); // للتنقل بين الصفحات

  const t = {
    ar: {
      title: 'استكشف حسب الفئة',
      subtitle: 'اختر نوع المغامرة التي تناسبك',
      viewAll: 'عرض الكل'
    },
    en: {
      title: 'Explore by Category',
      subtitle: 'Choose the type of adventure that suits you',
      viewAll: 'View All'
    }
  };

  const categories = [
    {
      id: 'adventure',
      name: language === 'ar' ? 'مغامرة' : 'Adventure',
      description: language === 'ar' ? 'رحلات مثيرة ومليئة بالأدرينالين' : 'Thrilling and adrenaline-filled trips',
      icon: Mountain,
      color: 'adventure',
      tripCount: 15
    },
    {
      id: 'culture',
      name: language === 'ar' ? 'ثقافة وتاريخ' : 'Culture & History',
      description: language === 'ar' ? 'اكتشف التراث والحضارة الأردنية' : 'Discover Jordanian heritage and civilization',
      icon: Building2,
      color: 'culture',
      tripCount: 12
    },
    {
      id: 'camping',
      name: language === 'ar' ? 'تخييم' : 'Camping',
      description: language === 'ar' ? 'ليالي تحت النجوم في الصحراء' : 'Nights under the stars in the desert',
      icon: Tent,
      color: 'primary',
      tripCount: 8
    },
    {
      id: 'nature',
      name: language === 'ar' ? 'طبيعة' : 'Nature',
      description: language === 'ar' ? 'استكشف الطبيعة الخلابة في الأردن' : 'Explore the stunning nature of Jordan',
      icon: Waves,
      color: 'accent',
      tripCount: 10
    },
    {
      id: 'photography',
      name: language === 'ar' ? 'تصوير' : 'Photography',
      description: language === 'ar' ? 'رحلات مصممة لعشاق التصوير' : 'Trips designed for photography enthusiasts',
      icon: Camera,
      color: 'premium',
      tripCount: 6
    },
    {
      id: 'premium',
      name: language === 'ar' ? 'رحلات مميزة' : 'Premium Tours',
      description: language === 'ar' ? 'تجارب فاخرة ومريحة' : 'Luxurious and comfortable experiences',
      icon: Star,
      color: 'premium',
      tripCount: 4
    }
  ];

  const text = t[language];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'adventure':
        return 'bg-adventure/10 text-adventure border-adventure/20 hover:bg-adventure/20';
      case 'culture':
        return 'bg-culture/10 text-culture border-culture/20 hover:bg-culture/20';
      case 'premium':
        return 'bg-premium/10 text-premium border-premium/20 hover:bg-premium/20';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
    }
  };

  // دالة لتحديد التنقل بناءً على حالة تسجيل الدخول
  const handleCategoryClick = () => {
    if (!user) {
      navigate('/signin'); // توجيه إلى صفحة تسجيل الدخول إذا لم يكن مسجلاً
    } else {
      navigate('/explore-trips'); // توجيه إلى صفحة الرحلات إذا كان مسجلاً
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-2xl mx-auto mb-16",
          isRTL && "text-right"
        )}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {text.title}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {text.subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border-2 p-8",
                  "transition-all duration-300 cursor-pointer",
                  "hover:scale-105 hover:shadow-xl",
                  "animate-in fade-in-50 slide-in-from-bottom-4",
                  getColorClasses(category.color)
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={handleCategoryClick} // إضافة حدث النقر
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-32 h-32">
                    <Icon className="w-full h-full" />
                  </div>
                </div>

                {/* Content */}
                <div className={cn(
                  "relative z-10",
                  isRTL && "text-right"
                )}>
                  {/* Icon and Count */}
                  <div className={cn(
                    "flex items-center justify-between mb-4",
                    isRTL && "flex-row-reverse"
                  )}>
                    <div className="p-3 rounded-xl bg-background/50">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className={cn(
                      "flex items-center space-x-1 text-sm font-medium",
                      isRTL && "space-x-reverse"
                    )}>
                      <span>{category.tripCount}</span>
                      <span className="opacity-70">
                        {language === 'ar' ? 'رحلة' : 'trips'}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-opacity-80 transition-colors">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed opacity-80 mb-6">
                    {category.description}
                  </p>

                  {/* Action */}
                  <div className={cn(
                    "flex items-center space-x-2 text-sm font-medium",
                    "group-hover:translate-x-1 transition-transform duration-200",
                    isRTL && "space-x-reverse flex-row-reverse group-hover:-translate-x-1"
                  )}>
                    <span>{text.viewAll}</span>
                    <MapPin className="h-4 w-4" />
                  </div>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* How It Works Section */}
        <div className={cn(
          "text-center max-w-4xl mx-auto mt-20",
          isRTL && "text-right"
        )}>
          <h3 className="text-3xl font-bold text-foreground mb-12">
            {language === 'ar' ? 'كيف يعمل مختار؟' : 'How Mukhtar Works?'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: language === 'ar' ? 'ابحث واختر' : 'Search & Choose',
                description: language === 'ar' ? 'ابحث عن الرحلة المثالية واختر المنظم المناسب' : 'Search for the perfect trip and choose the right organizer'
              },
              {
                step: '2',
                title: language === 'ar' ? 'احجز بسهولة' : 'Book Easily',
                description: language === 'ar' ? 'احجز رحلتك بضغطة واحدة وادفع بأمان' : 'Book your trip with one click and pay securely'
              },
              {
                step: '3',
                title: language === 'ar' ? 'استمتع بالرحلة' : 'Enjoy Your Trip',
                description: language === 'ar' ? 'استمتع بتجربة لا تُنسى مع مختار' : 'Enjoy an unforgettable experience with Mukhtar'
              }
            ].map((item, index) => (
              <div 
                key={item.step}
                className={cn(
                  "relative p-6 animate-in fade-in-50 slide-in-from-bottom-4",
                  isRTL && "text-right"
                )}
                style={{ animationDelay: `${index * 200 + 600}ms` }}
              >
                {/* Step Number */}
                <div className={cn(
                  "w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center",
                  "text-2xl font-bold text-white mb-4",
                  isRTL ? "mr-auto" : "mx-auto"
                )}>
                  {item.step}
                </div>
                
                <h4 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h4>
                
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                
                {/* Connector Line */}
                {index < 2 && (
                  <div className={cn(
                    "hidden md:block absolute top-8 w-24 h-0.5 bg-gradient-to-r from-primary to-primary-glow",
                    isRTL ? "-left-12" : "-right-12"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}