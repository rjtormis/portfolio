"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ProjectData } from "@/app/actions/project";

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setSelectedProject: Dispatch<SetStateAction<ProjectData | null>>;
  setDeleteProjects: Dispatch<SetStateAction<string[]>>;
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  setSelectedProject,
  setDeleteProjects,
}: DataTableProps<TData, TValue>) {
  const [isActive, setIsActive] = useState<string>("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getSelectedRowModel().rows;
  useEffect(() => {
    if (rows.length >= 1) {
      setDeleteProjects(rows.map((orig) => orig.original.id));
    } else {
      setDeleteProjects([]);
    }
  }, [rows, setDeleteProjects]);
  const handleSelectedProject = (e: ProjectData) => {
    setSelectedProject(e);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={`hover:cursor-pointer ${
                  isActive === row.id ? "bg-accent text-accent-foreground" : ""
                }`}
                onClick={() => {
                  handleSelectedProject(row.original as unknown as ProjectData);
                  if (isActive === row.id) {
                    setIsActive("");
                  } else {
                    setIsActive(row.id);
                  }
                }}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, {
                      ...cell.getContext(),
                      project: row.original,
                      setSelectedProject: setSelectedProject,
                    })}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
