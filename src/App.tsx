import { TableColumnsType } from 'antd';
import ResizableColumnTable from './components/ResizableColumnTable';

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
    const columns: TableColumnsType<DataType> = [
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
    ];

    return <ResizableColumnTable dataSource={data} columns={columns} />;
};

export default App;
