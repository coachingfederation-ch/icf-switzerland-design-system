# ICF Welcome Design System — Guidelines

## Components

The design system exports these components — import them from `@ws-8ezwjgawfkrnem7hmtfc/adaee055-e6f2-4d44-9b16-337d4735d93f` and compose them before building anything from scratch:

`ButtonGroupSeparator`, `ButtonGroupText`, `ButtonGroup`, `Button`, `CalendarDayButton`, `Calendar`, `CalloutSet`, `Callout`, `ChipRow`, `CompactHero`, `ContextMenuCheckboxItem`, `ContextMenuContent`, `ContextMenuGroup`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuPortal`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuSub`, `ContextMenuTrigger`, `ContextMenu`, `DropdownMenuCheckboxItem`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuPortal`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuSub`, `DropdownMenuTrigger`, `DropdownMenu`, `InputGroupAddon`, `InputGroupButton`, `InputGroupInput`, `InputGroupText`, `InputGroupTextarea`, `InputGroup`, `Input`, `Marquee`, `MenubarCheckboxItem`, `MenubarContent`, `MenubarGroup`, `MenubarItem`, `MenubarLabel`, `MenubarMenu`, `MenubarPortal`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSeparator`, `MenubarShortcut`, `MenubarSubContent`, `MenubarSubTrigger`, `MenubarSub`, `MenubarTrigger`, `Menubar`, `PillarCards`, `Separator`, `SiteFooter`, `SiteHeader`, `Spinner`, `Textarea`

Per-component details (import stanzas, props, variants, examples) live in `.lovable/rules/libraries/{slug}/components.md` — on disk, not auto-loaded. Read that file or the component source when the name alone isn't enough.

## Theme Files

The design system's theme is delivered through the following files. The author's original source files carry the full wiring the design system needs — variable declarations, framework-specific directives, provider objects, etc. — and are the canonical import target.

- `@ws-8ezwjgawfkrnem7hmtfc/adaee055-e6f2-4d44-9b16-337d4735d93f/styles.css` (source — preferred import)
- `@ws-8ezwjgawfkrnem7hmtfc/adaee055-e6f2-4d44-9b16-337d4735d93f/dist/tokens.css` (auto-generated flat list of CSS custom properties — a raw-values fallback only; does NOT carry framework-specific wiring that the source files above provide)

