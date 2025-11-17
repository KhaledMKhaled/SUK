import { MasterDataPage } from "./master-data-page";
import { insertPrintTypeSchema } from "@shared/schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function PrintTypesPage() {
  return (
    <MasterDataPage
      endpoint="/api/print-types"
      title="أنواع الطباعة"
      titleEn="Print Types"
      schema={insertPrintTypeSchema}
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
                  <Input placeholder="مثال: NP, SLK, DTF" {...field} data-testid="input-code" />
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
                  <Input placeholder="مثال: سيلك سكرين" {...field} data-testid="input-nameAr" />
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
                  <Input placeholder="Example: Silk Screen" {...field} data-testid="input-nameEn" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      emptyMessage="لا توجد أنواع طباعة. قم بإضافة نوع طباعة جديد."
    />
  );
}
