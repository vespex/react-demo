import { Avatar, Card, Input, InputProps, List, Skeleton, Space } from 'antd';
import { useDeferredValue, useState, useTransition } from 'react';
import { listData } from '../data';
const list = [...new Array(20000).keys()];

function IndexList({ query }: any) {
  return (
    <div className="demo-list">
      {list.map((i, index) => (
        <p key={index}>{`${query}-${i}`}</p>
      ))}
    </div>
  );
}

function InputDemo(props: InputProps) {
  const [val, setVal] = useState('');
  const { onChange } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVal(value);
    onChange!(e);
  };

  return <Input {...props} value={val} onChange={handleChange} />;
}

function TransDemo2() {
  const [query, setQuery] = useState('');
  const [pending, startTransition] = useTransition();
  const defQuery = useDeferredValue(query);
  const isLoading = query !== defQuery;

  const queryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // startTransition(() => setQuery(value));
    setQuery(value);
  };
  console.log(1111111111, query);
  return (
    <>
      {/* <InputDemo onChange={queryChange} /> */}
      {/* <Input onChange={queryChange} /> */}

      {/* trans */}
      {/* {pending ? <span>loading...</span>: <IndexList query={query} /> } */}
      {/* <IndexList query={query} /> */}

      {/* def */}
      <Input value={query} onChange={queryChange} />
      {isLoading ? <span>loading...</span> : <IndexList query={defQuery} />}
    </>
  );
}

/** 分割 */
// const getData = (count: number) =>
//   fetch(
//     `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`,
//   ).then((res) => res.json());

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

interface TabsType {
  onChange?: Function;
}

const tabs = [1, 2, 3];

function Tabs(props: TabsType) {
  const [tab, setTab] = useState(1);
  const { onChange } = props;
  const tabChange = (e: number) => {
    setTab(e);
    onChange!(e);
  };

  return (
    <Space>
      {tabs.map((key) => (
        <button
          key={key}
          onClick={() => tabChange(key)}
          disabled={tab === key ? true : undefined}
        >
          tab-{key}
        </button>
      ))}
    </Space>
  );
}

function TransDemo1() {
  const [pending, startTransition] = useTransition();
  const [list, setList] = useState<DataType[]>([]);
  const [tab, setTab] = useState(1);

  const tabChange = (e: number) => {
    // startTransition(() => {
    setTab(e);
    if (e === 2) {
      setList(listData);
    }
    // });
  };
  return (
    <>
      <Tabs onChange={tabChange} />
      {tab === 1 && <p>11111111</p>}
      {tab === 2 && (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => {
            let startTime = performance.now();
            while (performance.now() - startTime < 30) {
              // Do nothing for 1 ms per item to emulate extremely slow code
            }
            return (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit">edit</a>,
                  <a key="list-loadmore-more">more</a>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<a href="https://ant.design">{item.name?.last}</a>}
                    description={item.email}
                  />
                  <div>{item.gender}</div>
                </Skeleton>
              </List.Item>
            );
          }}
        />
      )}
      {tab === 3 && <p>33333333</p>}
    </>
  );
}

const DocsPage = () => {
  return (
    <div>
      <Card>
        <TransDemo1 />
        <TransDemo2 />
      </Card>
    </div>
  );
};

export default DocsPage;
