import { Table, TableColumnsType, TableProps } from 'antd';
import { useState } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';
import './styles.scss';

function ResizableColumnTable<DataType>({ ...tableProps }: TableProps) {
    const [columns, setColumns] = useState<TableColumnsType<DataType>>(
        tableProps.columns || []
    );

    const handleResize =
        (index: number) =>
        (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
            const newColumns = [...columns];
            newColumns[index] = {
                ...newColumns[index],
                width: size.width,
            };
            setColumns(newColumns);
        };

    const mergedColumns = columns.map<TableColumnsType<DataType>[number]>(
        (col, index) => ({
            ...col,
            onHeaderCell: (column: TableColumnsType<DataType>[number]) => ({
                width: column.width,
                onResize: handleResize(
                    index
                ) as React.ReactEventHandler<Element>,
            }),
        })
    );

    return (
        <Table
            {...tableProps}
            bordered
            components={{
                header: {
                    cell: ResizableTitle,
                },
            }}
            columns={mergedColumns}
            className="resizable-column-table"
        />
    );
}

const ResizableTitle = (props: {
    onResize: (
        e: React.SyntheticEvent<Element>,
        data: ResizeCallbackData
    ) => void;
    width: number;
}) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            handle={
                <span
                    className="react-resizable-handle"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            }
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    );
};

export default ResizableColumnTable;
