import { Link, useLocation } from "wouter";
import { Menu, Package, Database, Settings, BarChart3, Code2 } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const masterDataItems = [
  { path: "/seasons", labelAr: "المواسم", labelEn: "Seasons" },
  { path: "/categories", labelAr: "التصنيفات", labelEn: "Categories" },
  { path: "/types", labelAr: "الأنواع", labelEn: "Types" },
  { path: "/fabrics", labelAr: "الأقمشة", labelEn: "Fabrics" },
  { path: "/colors", labelAr: "الألوان", labelEn: "Colors" },
  { path: "/styles", labelAr: "الأساليب", labelEn: "Styles" },
  { path: "/print-types", labelAr: "أنواع الطباعة", labelEn: "Print Types" },
  { path: "/placements", labelAr: "المواضع", labelEn: "Placements" },
  { path: "/suppliers", labelAr: "الموردون", labelEn: "Suppliers" },
  { path: "/factories", labelAr: "المصانع", labelEn: "Factories" },
  { path: "/sizes", labelAr: "المقاسات", labelEn: "Sizes" },
];

export function Navbar() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2" data-testid="link-home">
            <Package className="h-6 w-6 text-primary" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">نظام ترميز المنتجات</span>
              <span className="text-xs text-muted-foreground">Product Coding</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavigationMenu dir="rtl">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/dashboard">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        location === "/dashboard" && "bg-accent"
                      )}
                      data-testid="link-dashboard"
                    >
                      <BarChart3 className="h-4 w-4 ml-2" />
                      <span>لوحة التحكم</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger data-testid="button-master-data-menu">
                    <Database className="h-4 w-4 ml-2" />
                    البيانات الأساسية
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2">
                      {masterDataItems.map((item) => (
                        <li key={item.path}>
                          <Link href={item.path}>
                            <div
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
                                location === item.path && "bg-accent"
                              )}
                              data-testid={`link-${item.path.slice(1)}`}
                            >
                              <div className="text-sm font-medium leading-none">{item.labelAr}</div>
                              <p className="line-clamp-1 text-xs leading-snug text-muted-foreground">
                                {item.labelEn}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/products">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        location === "/products" && "bg-accent"
                      )}
                      data-testid="link-products"
                    >
                      <Package className="h-4 w-4 ml-2" />
                      المنتجات
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/mapping-tokens">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        location === "/mapping-tokens" && "bg-accent"
                      )}
                      data-testid="link-mapping-tokens"
                    >
                      <Settings className="h-4 w-4 ml-2" />
                      ترميز الأرقام
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/sku-decoder">
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        location === "/sku-decoder" && "bg-accent"
                      )}
                      data-testid="link-sku-decoder"
                    >
                      <Code2 className="h-4 w-4 ml-2" />
                      فك تشفير SKU
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <nav className="flex flex-col gap-4 mt-8" dir="rtl">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  data-testid="link-mobile-dashboard"
                >
                  <BarChart3 className="h-4 w-4 ml-2" />
                  لوحة التحكم
                </Button>
              </Link>
              
              <div className="space-y-2">
                <h3 className="px-4 text-sm font-semibold text-muted-foreground">البيانات الأساسية</h3>
                {masterDataItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      data-testid={`link-mobile-${item.path.slice(1)}`}
                    >
                      {item.labelAr}
                    </Button>
                  </Link>
                ))}
              </div>

              <Link href="/products">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  data-testid="link-mobile-products"
                >
                  <Package className="h-4 w-4 ml-2" />
                  المنتجات
                </Button>
              </Link>

              <Link href="/mapping-tokens">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  data-testid="link-mobile-mapping"
                >
                  <Settings className="h-4 w-4 ml-2" />
                  ترميز الأرقام
                </Button>
              </Link>

              <Link href="/sku-decoder">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  data-testid="link-mobile-sku-decoder"
                >
                  <Code2 className="h-4 w-4 ml-2" />
                  فك تشفير SKU
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
