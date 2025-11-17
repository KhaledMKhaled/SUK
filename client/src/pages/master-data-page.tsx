import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DataTable, DataTableColumn } from "@/components/data-table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

interface MasterDataItem {
  id: string;
  code: string;
  nameAr: string;
  nameEn?: string | null;
  hexValue?: string | null;
  categoryId?: string | null;
}

interface MasterDataPageProps {
  endpoint: string;
  title: string;
  titleEn: string;
  schema: z.ZodType<any>;
  columns: DataTableColumn<MasterDataItem>[];
  renderForm: (form: any) => React.ReactNode;
  emptyMessage?: string;
}

export function MasterDataPage({
  endpoint,
  title,
  titleEn,
  schema,
  columns,
  renderForm,
  emptyMessage = "لا توجد بيانات",
}: MasterDataPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MasterDataItem | null>(null);
  const { toast } = useToast();

  const { data: items = [], isLoading } = useQuery<MasterDataItem[]>({
    queryKey: [endpoint],
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
      nameAr: "",
      nameEn: "",
      hexValue: "",
      categoryId: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", endpoint, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "تم الإضافة بنجاح",
        description: "تم إضافة العنصر الجديد",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الإضافة",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiRequest("PUT", `${endpoint}/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      setIsDialogOpen(false);
      setEditingItem(null);
      form.reset();
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث العنصر",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء التحديث",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `${endpoint}/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف العنصر",
      });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الحذف",
        variant: "destructive",
      });
    },
  });

  const handleCreate = () => {
    setEditingItem(null);
    form.reset({
      code: "",
      nameAr: "",
      nameEn: "",
      hexValue: "",
      categoryId: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: MasterDataItem) => {
    setEditingItem(item);
    form.reset({
      code: item.code,
      nameAr: item.nameAr,
      nameEn: item.nameEn || "",
      hexValue: item.hexValue || "",
      categoryId: item.categoryId || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">{title}</h1>
        <p className="text-muted-foreground">{titleEn}</p>
      </div>

      <DataTable
        data={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={(item) => deleteMutation.mutate(item.id)}
        onCreate={handleCreate}
        searchPlaceholder="بحث..."
        emptyMessage={emptyMessage}
        createButtonLabel="إضافة جديد"
        isLoading={isLoading}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingItem ? "تعديل" : "إضافة جديد"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "تعديل بيانات العنصر" : "إضافة عنصر جديد"}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {renderForm(form)}
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  data-testid="button-cancel"
                >
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-submit"
                >
                  {createMutation.isPending || updateMutation.isPending ? "جاري الحفظ..." : "حفظ"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
