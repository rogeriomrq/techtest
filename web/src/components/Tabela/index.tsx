import { memo } from 'react';
import {cn} from "@/lib/utils.ts";
import * as Components from '@/components';

export interface ITableColumnProps {
  name: string,
  label: string
}
interface ITableDefaultProps {
  titulo: string;
  data: (object | number | string)[];
  columns: ITableColumnProps[];
  pagination: {currentPage: number, totalPages: number, onPageChange: (currentPage: number) => void};
}

function DefaultTableComponent({
  titulo,
  data,
  columns,
  pagination
}: ITableDefaultProps) {

  return (
    <>
      <Components.Table>
          <Components.TableCaption className={cn('text-left text-lg font-bold w-max-content')}>{titulo}</Components.TableCaption>
          <Components.TableHeader>
            <Components.TableRow>
              {columns.map((column) =>
                <Components.TableHead key={column.name}>{column.label}</Components.TableHead>
              )}
            </Components.TableRow>
          </Components.TableHeader>
          {data?.length > 0 ? (
            <Components.TableBody>
              {data.map((payment, index) => (
                <Components.TableRow key={index}>
                  {columns.map((column, colIndex) => (
                    <Components.TableCell key={colIndex}>
                      {column.name === 'debtAmount' ? `R$ ${payment[column.name]}` : payment[column.name]}
                    </Components.TableCell>
                  ))}
                </Components.TableRow>
              ))}
            </Components.TableBody>
          ) : (
            <Components.TableBody >
              <Components.TableRow>
                <Components.TableCell colSpan={columns.length} className={cn('text-center font-bold')}>
                  Nenhum registro encontrado
                </Components.TableCell>
              </Components.TableRow>
            </Components.TableBody>
          )}
          {data?.length > 0 && (
            <Components.TableFooter>
              <Components.TableRow>
                <Components.TableCell colSpan={columns.length} className={cn("p-4")}>
                  <Components.Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={pagination.onPageChange}
                  />
                </Components.TableCell >
              </Components.TableRow>
            </Components.TableFooter>
          )}
        </Components.Table>
    </>
  );
}

export const DefaultTable = memo(
  DefaultTableComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.data === nextProps.data &&
      prevProps.pagination === nextProps.pagination
    );
  }
);
