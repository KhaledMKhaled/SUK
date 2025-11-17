import { MasterDataPage } from "./master-data-page";
import { insertMappingTokenSchema } from "@shared/schema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function MappingTokensPage() {
  return (
    <MasterDataPage
      endpoint="/api/mapping-tokens"
      title="ترميز الأرقام"
      titleEn="Mapping Tokens - Code to Number Dictionary"
      schema={insertMappingTokenSchema}
      columns={[
        { header: "الرمز (Token)", accessor: "token", className: "font-mono font-semibold" },
        { header: "الكود الرقمي", accessor: "numericCode", className: "font-mono text-center" },
        { header: "الوصف بالعربي", accessor: "descriptionAr" },
        { header: "الوصف بالإنجليزي", accessor: "descriptionEn" },
      ]}
      renderForm={(form) => (
        <>
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الرمز (Token) *</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: S26, HO, BLK" {...field} data-testid="input-token" />
                </FormControl>
                <FormDescription className="text-xs">
                  الكود النصي الذي سيتم تحويله إلى رقم
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numericCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الكود الرقمي *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="مثال: 1, 2, 3"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    data-testid="input-numericCode"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  الرقم الذي يمثل هذا الرمز في SKU
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descriptionAr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوصف بالعربي *</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: موسم صيف 26" {...field} data-testid="input-descriptionAr" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descriptionEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوصف بالإنجليزي</FormLabel>
                <FormControl>
                  <Input placeholder="Example: Summer Season 26" {...field} data-testid="input-descriptionEn" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      emptyMessage="لا توجد ترميزات. قم بإضافة ترميز جديد لتحويل الأكواد النصية إلى أرقام."
    />
  );
}
