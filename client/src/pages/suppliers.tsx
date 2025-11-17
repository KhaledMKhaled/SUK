import { MasterDataPage } from "./master-data-page";
import { insertSupplierSchema } from "@shared/schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function SuppliersPage() {
  return (
    <MasterDataPage
      endpoint="/api/suppliers"
      title="الموردون"
      titleEn="Suppliers"
      schema={insertSupplierSchema}
      columns={[
        { header: "الكود", accessor: "code", className: "font-mono" },
        { header: "الاسم بالعربي", accessor: "nameAr" },
        { header: "الاسم بالإنجليزي", accessor: "nameEn" },
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
                  <Input placeholder="مثال: S1, S2, S3" {...field} data-testid="input-code" />
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
                  <Input placeholder="مثال: مورد 1" {...field} data-testid="input-nameAr" />
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
                  <Input placeholder="Example: Supplier 1" {...field} data-testid="input-nameEn" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      emptyMessage="لا توجد موردون. قم بإضافة مورد جديد."
    />
  );
}
