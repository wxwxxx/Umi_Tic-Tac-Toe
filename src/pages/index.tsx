import React from 'react';
// import { connect } from 'umi';
import { Breadcrumb, Card, Row, Col, Button } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.less';

const IndexPage: React.FC<{}> = () => {
  const Square = (square: any) => {
    return (
      <Button className="square" onClick={square.onClick}>
        {square.value}
      </Button>
    );
  };

  return (
    <div className={style.main_body}>
      <div className="board-row">
        {Square(0)}
        {Square(1)}
        {Square(2)}
      </div>
      <div className="board-row">
        {Square(3)}
        {Square(4)}
        {Square(5)}
      </div>
      <div className="board-row">
        {Square(6)}
        {Square(7)}
        {Square(8)}
      </div>
    </div>
  );
};

export default IndexPage;
