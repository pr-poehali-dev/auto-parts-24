import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Part {
  id: number;
  name: string;
  article: string;
  brand: string;
  carModel: string;
  price: number;
  oldPrice?: number;
  image: string;
  inStock: boolean;
  warranty: string;
  characteristics: {
    material: string;
    weight: string;
    manufacturer: string;
  };
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [compareList, setCompareList] = useState<Part[]>([]);
  const [chatOpen, setChatOpen] = useState(false);

  const parts: Part[] = [
    {
      id: 1,
      name: 'Тормозные колодки передние',
      article: 'BRK-45678',
      brand: 'Brembo',
      carModel: 'ВАЗ 2110-2112',
      price: 2500,
      oldPrice: 3200,
      image: '/placeholder.svg',
      inStock: true,
      warranty: '12 месяцев',
      characteristics: {
        material: 'Керамика',
        weight: '1.2 кг',
        manufacturer: 'Италия'
      }
    },
    {
      id: 2,
      name: 'Масляный фильтр',
      article: 'FLT-98765',
      brand: 'Mann Filter',
      carModel: 'Toyota Camry',
      price: 850,
      image: '/placeholder.svg',
      inStock: true,
      warranty: '6 месяцев',
      characteristics: {
        material: 'Целлюлоза',
        weight: '0.3 кг',
        manufacturer: 'Германия'
      }
    },
    {
      id: 3,
      name: 'Стойка амортизатора передняя',
      article: 'SHK-12345',
      brand: 'KYB',
      carModel: 'Hyundai Solaris',
      price: 4200,
      oldPrice: 4800,
      image: '/placeholder.svg',
      inStock: false,
      warranty: '24 месяца',
      characteristics: {
        material: 'Сталь',
        weight: '3.5 кг',
        manufacturer: 'Япония'
      }
    },
    {
      id: 4,
      name: 'Свечи зажигания (комплект)',
      article: 'SPK-55444',
      brand: 'NGK',
      carModel: 'Volkswagen Polo',
      price: 1200,
      image: '/placeholder.svg',
      inStock: true,
      warranty: '12 месяцев',
      characteristics: {
        material: 'Иридий',
        weight: '0.2 кг',
        manufacturer: 'Япония'
      }
    },
    {
      id: 5,
      name: 'Воздушный фильтр',
      article: 'AIR-78901',
      brand: 'Bosch',
      carModel: 'Renault Logan',
      price: 650,
      oldPrice: 900,
      image: '/placeholder.svg',
      inStock: true,
      warranty: '6 месяцев',
      characteristics: {
        material: 'Синтетика',
        weight: '0.4 кг',
        manufacturer: 'Германия'
      }
    },
    {
      id: 6,
      name: 'Диск тормозной передний',
      article: 'DSK-23456',
      brand: 'ATE',
      carModel: 'Skoda Octavia',
      price: 3800,
      image: '/placeholder.svg',
      inStock: true,
      warranty: '18 месяцев',
      characteristics: {
        material: 'Чугун',
        weight: '8.5 кг',
        manufacturer: 'Германия'
      }
    }
  ];

  const addToCompare = (part: Part) => {
    if (compareList.find(p => p.id === part.id)) {
      setCompareList(compareList.filter(p => p.id !== part.id));
    } else {
      setCompareList([...compareList, part]);
    }
  };

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || part.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const brands = ['all', ...Array.from(new Set(parts.map(p => p.brand)))];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#0F1419] text-white sticky top-0 z-50 shadow-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Wrench" size={32} className="text-[#0EA5E9]" />
              <h1 className="text-2xl font-bold">АвтоЗапчасть24</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="hover:text-[#0EA5E9] transition-colors">Каталог</a>
              <a href="#promo" className="hover:text-[#0EA5E9] transition-colors">Акции</a>
              <a href="#team" className="hover:text-[#0EA5E9] transition-colors">Команда</a>
              <a href="#delivery" className="hover:text-[#0EA5E9] transition-colors">Доставка</a>
              <Sheet open={chatOpen} onOpenChange={setChatOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="bg-[#0EA5E9] text-white border-0 hover:bg-[#0284C7]">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Онлайн-поддержка
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Онлайн-поддержка</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col h-[calc(100%-80px)] mt-6">
                    <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                      <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm text-foreground">Здравствуйте! Чем могу помочь?</p>
                        <span className="text-xs text-muted-foreground">10:30</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Введите сообщение..." />
                      <Button className="bg-[#0EA5E9] hover:bg-[#0284C7]">
                        <Icon name="Send" size={18} />
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-[#0F1419] via-[#1A1F2C] to-[#0EA5E9] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Найдите нужную запчасть быстро</h2>
            <p className="text-lg mb-8 opacity-90">Широкий ассортимент для отечественных и иномарок</p>
            <div className="flex gap-2 bg-card rounded-lg p-2 border border-border">
              <Input
                placeholder="Поиск по названию, артикулу или марке..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground"
              />
              <Button className="bg-[#0EA5E9] hover:bg-[#0284C7]">
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div id="promo" className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-8 mb-8 shadow-lg border border-red-500/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">🔥 Горящие акции недели!</h3>
              <p className="text-lg">Скидки до 40% на тормозные системы и фильтры</p>
            </div>
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100 font-semibold">
              Смотреть всё
            </Button>
          </div>
        </div>
      </div>

      <main id="catalog" className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-foreground">Каталог запчастей</h2>
          <div className="flex items-center gap-4">
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Все бренды" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все бренды</SelectItem>
                {brands.slice(1).map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="relative">
                  <Icon name="GitCompare" size={18} className="mr-2" />
                  Сравнение
                  {compareList.length > 0 && (
                    <Badge className="ml-2 bg-[#0EA5E9]">{compareList.length}</Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Сравнение запчастей</DialogTitle>
                </DialogHeader>
                {compareList.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">Добавьте товары для сравнения</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Параметр</th>
                          {compareList.map(part => (
                            <th key={part.id} className="text-left p-2 min-w-[200px]">{part.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">Цена</td>
                          {compareList.map(part => (
                            <td key={part.id} className="p-2">{part.price} ₽</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">Бренд</td>
                          {compareList.map(part => (
                            <td key={part.id} className="p-2">{part.brand}</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">Артикул</td>
                          {compareList.map(part => (
                            <td key={part.id} className="p-2">{part.article}</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">Материал</td>
                          {compareList.map(part => (
                            <td key={part.id} className="p-2">{part.characteristics.material}</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">Вес</td>
                          {compareList.map(part => (
                            <td key={part.id} className="p-2">{part.characteristics.weight}</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">Производитель</td>
                          {compareList.map(part => (
                            <td key={part.id} className="p-2">{part.characteristics.manufacturer}</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">Гарантия</td>
                          {compareList.map(part => (
                            <td key={part.id} className="p-2">{part.warranty}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map(part => (
            <Card key={part.id} className="hover:shadow-xl transition-all hover:border-primary/50 bg-card">
              <CardHeader>
                <div className="relative">
                  <img src={part.image} alt={part.name} className="w-full h-48 object-cover rounded-lg" />
                  {part.oldPrice && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      -{Math.round((1 - part.price / part.oldPrice) * 100)}%
                    </Badge>
                  )}
                  {!part.inStock && (
                    <Badge className="absolute top-2 left-2 bg-gray-500">Под заказ</Badge>
                  )}
                </div>
                <CardTitle className="text-lg mt-4 text-foreground">{part.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Артикул: {part.article}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Tag" size={16} className="text-[#0EA5E9]" />
                    <span className="text-sm">{part.brand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Car" size={16} className="text-[#0EA5E9]" />
                    <span className="text-sm">{part.carModel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="ShieldCheck" size={16} className="text-[#0EA5E9]" />
                    <span className="text-sm">Гарантия {part.warranty}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{part.price} ₽</span>
                    {part.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">{part.oldPrice} ₽</span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-[#0EA5E9] hover:bg-[#0284C7]">
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  В корзину
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => addToCompare(part)}
                  className={compareList.find(p => p.id === part.id) ? 'bg-[#0EA5E9] text-white' : ''}
                >
                  <Icon name="GitCompare" size={18} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <section id="delivery" className="bg-card py-16 mt-16 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Доставка и оплата</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#0EA5E9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Быстрая доставка</h3>
              <p className="text-muted-foreground">По Москве — 1-2 дня, по России — 3-7 дней</p>
            </div>
            <div className="text-center">
              <div className="bg-[#0EA5E9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Удобная оплата</h3>
              <p className="text-muted-foreground">Наличными, картой или онлайн</p>
            </div>
            <div className="text-center">
              <div className="bg-[#0EA5E9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShieldCheck" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Гарантия качества</h3>
              <p className="text-muted-foreground">Все товары сертифицированы</p>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">Наша команда</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Профессионалы, которые работают для вашего комфорта и быстрого обслуживания
          </p>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Card className="text-center hover:shadow-xl transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Crown" size={40} className="text-white" />
                </div>
                <CardTitle className="text-lg">Алексей Петров</CardTitle>
                <p className="text-sm text-[#0EA5E9] font-semibold">Администратор / Собственник</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Управляет бизнесом и стратегическим развитием компании</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="ShoppingBag" size={40} className="text-white" />
                </div>
                <CardTitle className="text-lg">Мария Соколова</CardTitle>
                <p className="text-sm text-[#0EA5E9] font-semibold">Менеджер по закупкам</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Обеспечивает наличие качественных запчастей на складе</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Headphones" size={40} className="text-white" />
                </div>
                <CardTitle className="text-lg">Дмитрий Иванов</CardTitle>
                <p className="text-sm text-[#0EA5E9] font-semibold">Специалист техподдержки</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Консультирует клиентов и решает технические вопросы</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Bike" size={40} className="text-white" />
                </div>
                <CardTitle className="text-lg">Сергей Морозов</CardTitle>
                <p className="text-sm text-[#0EA5E9] font-semibold">Курьер</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Доставляет заказы быстро и в сохранности</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all hover:border-primary/50">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="Calculator" size={40} className="text-white" />
                </div>
                <CardTitle className="text-lg">Елена Крылова</CardTitle>
                <p className="text-sm text-[#0EA5E9] font-semibold">Бухгалтер-фрилансер</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Ведёт финансовый учёт и отчётность компании</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-[#0F1419] text-white py-8 mt-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Icon name="Wrench" size={24} className="text-[#0EA5E9]" />
                АвтоЗапчасть24
              </h3>
              <p className="text-muted-foreground text-sm">Качественные автозапчасти для вашего автомобиля</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (800) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@avtozapchast24.ru
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 20:00</p>
              <p className="text-sm text-muted-foreground">Сб-Вс: 10:00 - 18:00</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 АвтоЗапчасть24. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;