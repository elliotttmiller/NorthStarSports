"use client";

import React from "react";
import { ComponentProps, ReactNode, CSSProperties } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";


type TabsProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  activationMode?: "automatic" | "manual";
  // Add any other props you need from TabsPrimitive.Root
};

function Tabs({ className, children, style, value, defaultValue, onValueChange, orientation, dir, activationMode }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      style={style}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      orientation={orientation}
      dir={dir}
      activationMode={activationMode}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {...({} as any)}
    >
      {children}
    </TabsPrimitive.Root>
  );
}


interface TabsListProps extends ComponentProps<typeof TabsPrimitive.List> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function TabsList({ className, children, style, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-gradient-to-br from-[color:var(--color-panel-soft)] to-[color:var(--color-panel)] text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] border border-[color:var(--color-border)] shadow-sm backdrop-blur-md mt-6",
        className,
      )}
      style={style}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {...(props as any)}
    >
      {children}
    </TabsPrimitive.List>
  );
}


interface TabsTriggerProps extends ComponentProps<typeof TabsPrimitive.Trigger> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function TabsTrigger({ className, children, style, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      style={style}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {...(props as any)}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}


interface TabsContentProps extends ComponentProps<typeof TabsPrimitive.Content> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function TabsContent({ className, children, style, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      style={style}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {...(props as any)}
    >
      {children}
    </TabsPrimitive.Content>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
