import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Components — ICF Switzerland Design System" },
      {
        name: "description",
        content:
          "Live examples of the ICF Switzerland component set: buttons, form controls, overlays, tables, tabs and feedback states.",
      },
      { property: "og:title", content: "Components — ICF Switzerland Design System" },
      {
        property: "og:description",
        content: "Buttons, form controls, overlays, tables, tabs and feedback states.",
      },
    ],
  }),
  component: Components,
});

function Block({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl">{title}</h2>
      {note && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{note}</p>}
      <div className="mt-5 rounded-3xl border border-border bg-card p-6">{children}</div>
    </section>
  );
}

function Components() {
  return (
    <main id="main" className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <p className="eyebrow">Components</p>
      <h1 className="display-lg mt-3">The component set</h1>
      <p className="mt-4 max-w-2xl text-[17px] leading-[1.65] text-muted-foreground">
        Radix primitives styled with ICF tokens. Nothing here hardcodes a colour, so every variant
        follows the palette automatically.
      </p>

      <Block title="Buttons" note="Six variants and four sizes, all pill-free by default.">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground">
            Accent pill (hero CTA)
          </span>
          <span className="inline-flex h-10 items-center rounded-full border border-border px-5 text-[11px] font-semibold uppercase tracking-wider text-primary">
            Outline pill
          </span>
        </div>
      </Block>

      <Block title="Badges">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </Block>

      <Block title="Form controls">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Jane Coach" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="region">Region</Label>
            <Select>
              <SelectTrigger id="region">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zurich">Zürich</SelectItem>
                <SelectItem value="geneva">Genève</SelectItem>
                <SelectItem value="ticino">Ticino</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="bio">Short bio</Label>
            <Textarea id="bio" rows={3} placeholder="Two sentences about your practice." />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept the code of ethics</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="listed" />
            <Label htmlFor="listed">Show in the public directory</Label>
          </div>
          <RadioGroup defaultValue="acc" className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="acc" id="acc" />
              <Label htmlFor="acc">ACC</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="pcc" id="pcc" />
              <Label htmlFor="pcc">PCC</Label>
            </div>
          </RadioGroup>
        </div>
      </Block>

      <Block title="Cards">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Chapter event</CardTitle>
              <CardDescription>Zürich · 12 November</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Card surfaces sit on white against the bone page background, with the soft elevation
              token.
            </CardContent>
            <CardFooter>
              <Button size="sm">Register</Button>
            </CardFooter>
          </Card>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Loading state</CardTitle>
              <CardDescription>Skeletons use the muted token</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        </div>
      </Block>

      <Block title="Navigation and disclosure">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4 text-sm text-muted-foreground">
            Tabs inherit the muted track with a card-coloured active state.
          </TabsContent>
          <TabsContent value="details" className="mt-4 text-sm text-muted-foreground">
            Second panel.
          </TabsContent>
          <TabsContent value="history" className="mt-4 text-sm text-muted-foreground">
            Third panel.
          </TabsContent>
        </Tabs>

        <Accordion type="single" collapsible className="mt-8">
          <AccordionItem value="a">
            <AccordionTrigger>How are tokens named?</AccordionTrigger>
            <AccordionContent>
              Role first, colour never: <code className="btn-mono">--primary</code>,{" "}
              <code className="btn-mono">--hero</code>, <code className="btn-mono">--chip</code>.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Where do fonts come from?</AccordionTrigger>
            <AccordionContent>
              Two variable WOFF2 files served from our own origin under /fonts.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Block>

      <Block title="Overlays and feedback">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm registration</DialogTitle>
                <DialogDescription>
                  Dialogs use the card surface, soft radius and a dimmed hero overlay.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Sheets carry the mobile filter experience.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">Hover for tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>Deep-blue surface, white text</TooltipContent>
          </Tooltip>

          <Button variant="secondary" onClick={() => toast.success("Profile saved")}>
            Show toast
          </Button>
        </div>

        <div className="mt-6 grid gap-4">
          <Alert>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>Default alert on the card surface.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>Destructive alert for failed actions.</AlertDescription>
          </Alert>
        </div>
      </Block>

      <Block title="Table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coach</TableHead>
              <TableHead>Credential</TableHead>
              <TableHead>Region</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>A. Meier</TableCell>
              <TableCell>PCC</TableCell>
              <TableCell>Zürich</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>B. Rossi</TableCell>
              <TableCell>ACC</TableCell>
              <TableCell>Ticino</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>C. Dubois</TableCell>
              <TableCell>MCC</TableCell>
              <TableCell>Genève</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Block>
    </main>
  );
}
