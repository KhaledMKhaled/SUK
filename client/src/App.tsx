import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import SeasonsPage from "@/pages/seasons";
import CategoriesPage from "@/pages/categories";
import TypesPage from "@/pages/types";
import FabricsPage from "@/pages/fabrics";
import ColorsPage from "@/pages/colors";
import StylesPage from "@/pages/styles";
import PrintTypesPage from "@/pages/print-types";
import PlacementsPage from "@/pages/placements";
import SuppliersPage from "@/pages/suppliers";
import FactoriesPage from "@/pages/factories";
import SizesPage from "@/pages/sizes";
import MappingTokensPage from "@/pages/mapping-tokens";
import ProductsPage from "@/pages/products";
import ProductForm from "@/pages/product-form";
import SkuDecoder from "@/pages/sku-decoder";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      
      <Route path="/seasons" component={SeasonsPage} />
      <Route path="/categories" component={CategoriesPage} />
      <Route path="/types" component={TypesPage} />
      <Route path="/fabrics" component={FabricsPage} />
      <Route path="/colors" component={ColorsPage} />
      <Route path="/styles" component={StylesPage} />
      <Route path="/print-types" component={PrintTypesPage} />
      <Route path="/placements" component={PlacementsPage} />
      <Route path="/suppliers" component={SuppliersPage} />
      <Route path="/factories" component={FactoriesPage} />
      <Route path="/sizes" component={SizesPage} />
      
      <Route path="/mapping-tokens" component={MappingTokensPage} />
      
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/new" component={ProductForm} />
      <Route path="/products/edit/:id" component={ProductForm} />
      
      <Route path="/sku-decoder" component={SkuDecoder} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background" dir="rtl">
          <Navbar />
          <main className="container mx-auto px-4 md:px-8 py-8 max-w-7xl">
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
