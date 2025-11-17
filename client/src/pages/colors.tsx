import { MasterDataPage } from "./master-data-page";
import { insertColorSchema } from "@shared/schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ColorsPage() {
  return (
    <MasterDataPage
      endpoint="/api/colors"
      title="الألوان"
      titleEn="Colors"
      schema={insertColorSchema}
      columns={[
        { header: "الكود", accessor: "code", className: "font-mono" },
        { header: "الاسم بالعربي", accessor: "nameAr" },
        { header: "الاسم بالإنجليزي", accessor: "nameEn" },
        {
          header: "اللون",
          accessor: "hexValue",
          render: (hex) =>
            hex ? (
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: hex }}
                />
                <span className="font-mono text-xs">{hex}</span>
              </div>
            ) : (
              <span className="text-muted-foreground text-xs">-</span>
            ),
        },
      ]}
      renderForm={(form) => (
        <>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الكود *</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: BLK, WHT, RED" {...field} data-testid="input-code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nameAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم بالعربي *</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: أسود" {...field} data-testid="input-nameAr" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nameEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم بالإنجليزي</FormLabel>
                <FormControl>
                  <Input placeholder="Example: Black" {...field} data-testid="input-nameEn" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hexValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كود اللون (Hex)</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input type="color" {...field} className="w-16 h-10 p-1" />
                    <Input placeholder="#000000" {...field} data-testid="input-hexValue" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      emptyMessage="لا توجد ألوان. قم بإضافة لون جديد."
    />
  );
}
