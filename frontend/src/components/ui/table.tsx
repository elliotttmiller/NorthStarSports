import React from "react";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Table({ className, ...props }: ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        role="table"
        {...props}
      >
        {props.children}
      </table>
    </div>
  );
}

function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      role="rowgroup"
      {...props}
    />
  );
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      role="rowgroup"
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, children, ...props }: ComponentProps<"tr">) {
  // Runtime ARIA compliance check (dev only)
  if (
    process.env.NODE_ENV === "development" &&
    React.Children.toArray(children).some((child) => {
      if (!React.isValidElement(child)) return false;
      const type = child.type;
      // Accept TableHead, TableCell, th, td
      return !(type === TableHead || type === TableCell || type === "th" || type === "td");
    })
  ) {
    // eslint-disable-next-line no-console
    console.warn("[TableRow] ARIA error: TableRow must only contain TableHead or TableCell as direct children.");
  }
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      role="row"
      {...props}
    >
      {children}
    </tr>
  );
}

function TableHead({ className, children, ...props }: ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      role="columnheader"
      {...props}
    >
      {children}
    </th>
  );
}

function TableCell({ className, children, ...props }: ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-2 align-middle", className)}
      role="cell"
      {...props}
    >
      {children}
    </td>
  );
}

function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
