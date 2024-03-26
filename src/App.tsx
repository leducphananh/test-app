import { Table, TableColumnsType } from 'antd';
import { useState } from 'react';
import { Resizable, ResizeCallbackData } from 'react-resizable';

const data: DataType[] = [
    {
        key: 0,
        date: '2018-02-11',
        amount: 120,
        type: 'income',
        note: 'transfer',
    },
    {
        key: 1,
        date: '2018-03-11',
        amount: 243,
        type: 'income',
        note: 'transfer',
    },
    {
        key: 2,
        date: '2018-04-11',
        amount: 98,
        type: 'income',
        note: 'transfer',
    },
];

interface DataType {
    key: React.Key;
    date: string;
    amount: number;
    type: string;
    note: string;
}

const App = () => {
    const [columns, setColumns] = useState<TableColumnsType<DataType>>([
        {
            title: 'Date',
            dataIndex: 'date',
            width: 200,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            width: 100,
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: 100,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            width: 100,
        },
        {
            title: 'Action',
            key: 'action',
            render: () => <a>Delete</a>,
        },
    ]);

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
                onResize: handleResize(index) as React.ReactEventHandler<any>,
            }),
        })
    );

    return (
        <Table
            bordered
            components={{
                header: {
                    cell: ResizableTitle,
                },
            }}
            dataSource={data}
            columns={mergedColumns}
        />
    );
};

const ResizableTitle = (
    props: React.HTMLAttributes<any> & {
        onResize: (
            e: React.SyntheticEvent<Element>,
            data: ResizeCallbackData
        ) => void;
        width: number;
    }
) => {
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

export default App;