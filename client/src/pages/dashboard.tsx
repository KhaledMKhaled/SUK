import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Database, Factory, Shirt, Calendar, Palette } from "lucide-react";
import { Link } from "wouter";
import type { Product, ProductWithDetails } from "@shared/schema";

export default function Dashboard() {
  const { data: products = [] } = useQuery<ProductWithDetails[]>({
    queryKey: ["/api/products"],
  });

  const { data: seasons = [] } = useQuery({
    queryKey: ["/api/seasons"],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: factories = [] } = useQuery({
    queryKey: ["/api/factories"],
  });

  const recentProducts = products.slice(0, 10);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-2">لوحة التحكم</h1>
        <p className="text-muted-foreground">نظرة عامة على البيانات والمنتجات</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="إجمالي المنتجات"
          value={products.length}
          icon={Package}
          description="Total Products"
        />
        <StatCard
          title="المواسم"
          value={seasons.length}
          icon={Calendar}
          description="Seasons"
        />
        <StatCard
          title="التصنيفات"
          value={categories.length}
          icon={Shirt}
          description="Categories"
        />
        <StatCard
          title="المصانع"
          value={factories.length}
          icon={Factory}
          description="Factories"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>المنتجات الأخيرة</CardTitle>
          <p className="text-sm text-muted-foreground">آخر 10 منتجات تم إضافتها</p>
        </CardHeader>
        <CardContent>
          {recentProducts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد منتجات حتى الآن</p>
              <Link href="/products">
                <a className="text-primary hover:underline text-sm mt-2 inline-block">
                  إضافة منتج جديد
                </a>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم المنتج</TableHead>
                    <TableHead>الكود الأساسي</TableHead>
                    <TableHead className="font-mono">SKU</TableHead>
                    <TableHead>الموسم</TableHead>
                    <TableHead>المقاس</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProducts.map((product) => (
                    <TableRow key={product.id} className="hover-elevate" data-testid={`row-product-${product.id}`}>
                      <TableCell className="font-medium">{product.productNameAr}</TableCell>
                      <TableCell className="font-mono text-sm">{product.masterDesignCode}</TableCell>
                      <TableCell className="font-mono text-xs">{product.skuCode}</TableCell>
                      <TableCell>{product.season?.nameAr}</TableCell>
                      <TableCell>{product.size?.nameAr}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
