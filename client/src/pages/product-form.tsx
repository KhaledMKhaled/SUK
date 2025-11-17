import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ArrowLeft } from "lucide-react";
import type { Season, Category, Type, Fabric, Color, Style, PrintType, Placement, Supplier, Factory, Size, Product } from "@shared/schema";
import { z } from "zod";

export default function ProductForm() {
  const [, params] = useRoute("/products/edit/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = !!params?.id;

  const { data: product } = useQuery<Product>({
    queryKey: ["/api/products", params?.id],
    enabled: isEdit,
  });

  const { data: seasons = [] } = useQuery<Season[]>({ queryKey: ["/api/seasons"] });
  const { data: categories = [] } = useQuery<Category[]>({ queryKey: ["/api/categories"] });
  const { data: types = [] } = useQuery<Type[]>({ queryKey: ["/api/types"] });
  const { data: fabrics = [] } = useQuery<Fabric[]>({ queryKey: ["/api/fabrics"] });
  const { data: colors = [] } = useQuery<Color[]>({ queryKey: ["/api/colors"] });
  const { data: styles = [] } = useQuery<Style[]>({ queryKey: ["/api/styles"] });
  const { data: printTypes = [] } = useQuery<PrintType[]>({ queryKey: ["/api/print-types"] });
  const { data: placements = [] } = useQuery<Placement[]>({ queryKey: ["/api/placements"] });
  const { data: suppliers = [] } = useQuery<Supplier[]>({ queryKey: ["/api/suppliers"] });
  const { data: factories = [] } = useQuery<Factory[]>({ queryKey: ["/api/factories"] });
  const { data: sizes = [] } = useQuery<Size[]>({ queryKey: ["/api/sizes"] });

  const form = useForm({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      seasonId: "",
      categoryId: "",
      typeId: "",
      designNo: "",
      fabricId: "",
      colorId: "",
      styleId: "",
      printTypeId: "",
      placementId: "",
      supplierId: "",
      factoryId: "",
      sizeId: "",
      productNameAr: "",
      productNameEn: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (product && isEdit) {
      form.reset({
        seasonId: product.seasonId,
        categoryId: product.categoryId,
        typeId: product.typeId,
        designNo: product.designNo,
        fabricId: product.fabricId,
        colorId: product.colorId,
        styleId: product.styleId,
        printTypeId: product.printTypeId,
        placementId: product.placementId,
        supplierId: product.supplierId,
        factoryId: product.factoryId,
        sizeId: product.sizeId,
        productNameAr: product.productNameAr,
        productNameEn: product.productNameEn || "",
        notes: product.notes || "",
      });
    }
  }, [product, isEdit, form]);

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/products", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "تم الإضافة بنجاح",
        description: "تم إضافة المنتج الجديد وتوليد أكواد SKU",
      });
      navigate("/products");
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المنتج",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => apiRequest("PUT", `/api/products/${params?.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث المنتج وإعادة توليد أكواد SKU",
      });
      navigate("/products");
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث المنتج",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    if (isEdit) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const getSKUPreview = () => {
    const values = form.getValues();
    const season = seasons.find((s) => s.id === values.seasonId);
    const category = categories.find((c) => c.id === values.categoryId);
    const type = types.find((t) => t.id === values.typeId);
    const fabric = fabrics.find((f) => f.id === values.fabricId);
    const color = colors.find((c) => c.id === values.colorId);
    const style = styles.find((s) => s.id === values.styleId);
    const printType = printTypes.find((p) => p.id === values.printTypeId);
    const placement = placements.find((p) => p.id === values.placementId);
    const supplier = suppliers.find((s) => s.id === values.supplierId);
    const factory = factories.find((f) => f.id === values.factoryId);
    const size = sizes.find((s) => s.id === values.sizeId);

    const parts = [
      season?.code,
      category?.code,
      type?.code,
      values.designNo,
      fabric?.code,
      color?.code,
      style?.code,
      printType?.code,
      placement?.code,
      supplier?.code,
      factory?.code,
      size?.code,
    ];

    const allFilled = parts.every((p) => p && p.trim() !== "");
    if (!allFilled) return null;

    return parts.join("-");
  };

  const skuPreview = getSKUPreview();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/products")}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold">{isEdit ? "تعديل منتج" : "إضافة منتج جديد"}</h1>
          <p className="text-muted-foreground">
            {isEdit ? "تعديل بيانات المنتج" : "إضافة منتج جديد وتوليد أكواد SKU تلقائياً"}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>معلومات أساسية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="productNameAr"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>اسم المنتج بالعربي *</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: هودي ميلتون أسود أوفر سايز" {...field} data-testid="input-productNameAr" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productNameEn"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>اسم المنتج بالإنجليزي</FormLabel>
                    <FormControl>
                      <Input placeholder="Example: Oversize Black Melton Hoodie" {...field} data-testid="input-productNameEn" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التصنيف والموسم</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="seasonId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الموسم *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-season">
                          <SelectValue placeholder="اختر الموسم" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {seasons.map((season) => (
                          <SelectItem key={season.id} value={season.id}>
                            {season.nameAr} ({season.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التصنيف *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-category">
                          <SelectValue placeholder="اختر التصنيف" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.nameAr} ({category.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="typeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>النوع *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-type">
                          <SelectValue placeholder="اختر النوع" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {types.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.nameAr} ({type.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="designNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم التصميم *</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: 2006" {...field} data-testid="input-designNo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>مواصفات المنتج</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="fabricId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>القماش *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-fabric">
                          <SelectValue placeholder="اختر القماش" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fabrics.map((fabric) => (
                          <SelectItem key={fabric.id} value={fabric.id}>
                            {fabric.nameAr} ({fabric.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اللون *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-color">
                          <SelectValue placeholder="اختر اللون" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            <div className="flex items-center gap-2">
                              {color.hexValue && (
                                <div
                                  className="w-4 h-4 rounded border"
                                  style={{ backgroundColor: color.hexValue }}
                                />
                              )}
                              <span>{color.nameAr} ({color.code})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="styleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الأسلوب *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-style">
                          <SelectValue placeholder="اختر الأسلوب" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {styles.map((style) => (
                          <SelectItem key={style.id} value={style.id}>
                            {style.nameAr} ({style.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المقاس *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-size">
                          <SelectValue placeholder="اختر المقاس" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.nameAr} ({size.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تفاصيل الطباعة</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="printTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع الطباعة *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-printType">
                          <SelectValue placeholder="اختر نوع الطباعة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {printTypes.map((printType) => (
                          <SelectItem key={printType.id} value={printType.id}>
                            {printType.nameAr} ({printType.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="placementId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>موضع الطباعة *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-placement">
                          <SelectValue placeholder="اختر موضع الطباعة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {placements.map((placement) => (
                          <SelectItem key={placement.id} value={placement.id}>
                            {placement.nameAr} ({placement.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>معلومات التصنيع</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المورد *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-supplier">
                          <SelectValue placeholder="اختر المورد" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            {supplier.nameAr} ({supplier.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="factoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المصنع *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-factory">
                          <SelectValue placeholder="اختر المصنع" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {factories.map((factory) => (
                          <SelectItem key={factory.id} value={factory.id}>
                            {factory.nameAr} ({factory.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ملاحظات إضافية</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملاحظات</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="أي ملاحظات إضافية عن المنتج..."
                        className="resize-none min-h-24"
                        {...field}
                        data-testid="input-notes"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {skuPreview && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-primary">معاينة SKU</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">SKU النصي</p>
                  <p className="font-mono text-sm bg-muted p-2 rounded">{skuPreview}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  سيتم توليد الأكواد الرقمية (المقطّع والمدمج) تلقائياً عند الحفظ
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/products")}
              data-testid="button-cancel"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              data-testid="button-submit"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "جاري الحفظ..."
                : isEdit
                ? "تحديث المنتج"
                : "إضافة المنتج"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
