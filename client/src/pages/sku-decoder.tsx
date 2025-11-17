import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Code, ArrowRight } from "lucide-react";
import type { MappingToken } from "@shared/schema";

export default function SkuDecoder() {
  const [skuInput, setSkuInput] = useState("");
  const [decodedParts, setDecodedParts] = useState<Array<{ token: string; description: string }> | null>(null);

  const { data: mappingTokens = [] } = useQuery<MappingToken[]>({
    queryKey: ["/api/mapping-tokens"],
  });

  const decodeSegmentedSku = () => {
    if (!skuInput.trim()) {
      setDecodedParts(null);
      return;
    }

    const parts = skuInput.split("-").map((p) => p.trim());
    const decoded = parts.map((part) => {
      const isNumeric = /^\d+$/.test(part);
      
      if (isNumeric) {
        const numericCode = parseInt(part);
        const mapping = mappingTokens.find((m) => m.numericCode === numericCode);
        return {
          token: mapping?.token || part,
          description: mapping?.descriptionAr || "غير معروف",
        };
      } else {
        const mapping = mappingTokens.find((m) => m.token === part);
        return {
          token: part,
          description: mapping?.descriptionAr || "الكود النصي",
        };
      }
    });

    setDecodedParts(decoded);
  };

  const decodeCompactSku = () => {
    if (!skuInput.trim()) {
      setDecodedParts(null);
      return;
    }

    const numbers = skuInput.match(/\d+/g);
    if (!numbers || numbers.length === 0) {
      setDecodedParts([{ token: skuInput, description: "صيغة غير صحيحة" }]);
      return;
    }

    const decoded = numbers.map((num) => {
      const numericCode = parseInt(num);
      const mapping = mappingTokens.find((m) => m.numericCode === numericCode);
      return {
        token: mapping?.token || num,
        description: mapping?.descriptionAr || "غير معروف",
      };
    });

    setDecodedParts(decoded);
  };

  const getSampleSkus = () => {
    const sampleTokens = mappingTokens.slice(0, 12);
    if (sampleTokens.length < 12) return null;

    const textSku = sampleTokens.map((t) => t.token).join("-");
    const segmentedSku = sampleTokens.map((t) => t.numericCode).join("-");
    const compactSku = sampleTokens.map((t) => t.numericCode).join("");

    return { textSku, segmentedSku, compactSku };
  };

  const samples = getSampleSkus();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">فك تشفير SKU</h1>
        <p className="text-muted-foreground">تحويل أكواد SKU الرقمية إلى النصوص الأصلية</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>إدخال الكود</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sku-input">كود SKU</Label>
              <Input
                id="sku-input"
                placeholder="مثال: 1-2-3-4-5-6-7-8-9-10-11-12 أو S26-TP-HO-2006-MLT..."
                value={skuInput}
                onChange={(e) => setSkuInput(e.target.value)}
                className="font-mono"
                data-testid="input-sku-decoder"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={decodeSegmentedSku} className="flex-1" data-testid="button-decode-segmented">
                <Code className="h-4 w-4 ml-2" />
                فك تشفير رقمي مقطّع
              </Button>
              <Button onClick={decodeCompactSku} variant="outline" className="flex-1" data-testid="button-decode-compact">
                <Code className="h-4 w-4 ml-2" />
                فك تشفير رقمي مدمج
              </Button>
            </div>

            {samples && (
              <div className="space-y-2 pt-4 border-t">
                <p className="text-sm font-medium">أمثلة للتجربة:</p>
                <div className="space-y-2">
                  <button
                    onClick={() => setSkuInput(samples.textSku)}
                    className="w-full text-left p-2 rounded hover:bg-accent transition-colors"
                  >
                    <p className="text-xs text-muted-foreground">SKU نصي</p>
                    <p className="font-mono text-xs truncate">{samples.textSku}</p>
                  </button>
                  <button
                    onClick={() => setSkuInput(samples.segmentedSku)}
                    className="w-full text-left p-2 rounded hover:bg-accent transition-colors"
                  >
                    <p className="text-xs text-muted-foreground">SKU رقمي مقطّع</p>
                    <p className="font-mono text-xs">{samples.segmentedSku}</p>
                  </button>
                  <button
                    onClick={() => setSkuInput(samples.compactSku)}
                    className="w-full text-left p-2 rounded hover:bg-accent transition-colors"
                  >
                    <p className="text-xs text-muted-foreground">SKU رقمي مدمج</p>
                    <p className="font-mono text-xs">{samples.compactSku}</p>
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>النتيجة</CardTitle>
          </CardHeader>
          <CardContent>
            {decodedParts ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  {decodedParts.map((part, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Badge variant="outline" className="font-mono">
                        {index + 1}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono font-semibold">{part.token}</div>
                        <div className="text-sm text-muted-foreground truncate">{part.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">SKU المفكك:</p>
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="font-mono text-sm break-all">
                      {decodedParts.map((p) => p.token).join("-")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>أدخل كود SKU واضغط على الزر لفك التشفير</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle>كيفية الاستخدام</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="outline">1</Badge>
            <p className="text-sm">
              <strong>SKU رقمي مقطّع:</strong> أدخل الأكواد الرقمية مفصولة بشرطات، مثل: 1-2-3-4-5-6-7-8-9-10-11-12
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline">2</Badge>
            <p className="text-sm">
              <strong>SKU رقمي مدمج:</strong> أدخل الأرقام متصلة، مثل: 123456789101112
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline">3</Badge>
            <p className="text-sm">
              <strong>SKU نصي:</strong> يمكنك أيضاً إدخال الكود النصي مباشرة لعرض تفاصيله
            </p>
          </div>
          <Separator />
          <p className="text-xs text-muted-foreground">
            ملاحظة: يجب أن تكون جميع الرموز موجودة في صفحة "ترميز الأرقام" حتى يتم فك تشفيرها بشكل صحيح.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
