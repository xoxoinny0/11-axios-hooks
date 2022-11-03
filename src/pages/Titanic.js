/**
 * 타이타닉 탑승자 명단 조회
 */
import React, { memo } from 'react';
import styled from 'styled-components';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

// Axios 기능 제공 훅
import useAxios from 'axios-hooks';

/** 성별을 표시하기 위한 텍스트 라벨 */
const ColorText = styled.span`
  &:before {
    color: ${({sex}) => sex === 'male' ? '#06f' : '#c0c'};
    content: '${({sex}) => sex === 'male' ? '남자' : '여자'}';
    font-weight: 600;
  }
`;

/** 탑승지를 표시하기 위한 텍스트 라벨 */
const EmbarkedBox = styled.span`
  &:before {
    color: ${({embarked}) => embarked === 'C' ? '#f60' : (embarked === 'Q' ? '#00f' : '#990')};
    content: '${({embarked}) => embarked === 'C' ? '세르부르' : (embarked === 'Q' ? '퀸즈타운' : '사우샘프턴')}';
    font-weight: 600;
  }
`;

/** 생존여부를 표시하기 위한 텍스트 라벨 */
const SurvivedBox = styled.span`
  &:before {
    background-color: ${({survived}) => survived ? '#090' : '#e00'};
    content: '${({survived}) => survived ? '생존' : '사망'}';
    color: #fff;
    font-weight: 600;
  }
`

// 접속할 백엔드의 URL
const URL = "/titanic";

const Titanic = memo(() => {
  // 탑승객 명단 목록을 Ajax로 가져온다.
  // --> 기본적으로 컴포넌트의 마운트와 동시에 자동 실행되어 응답 결과를 data에 저장한다.
  const [{data, loading, error}, refetch] = useAxios(URL);

  /** 에러가 발생했다면 에러 메시지를 표시한다. */
  if (error) {
    console.error(error);

    // 컴포넌트 자체가 함수이고, 함수가 실행도중 리턴을 하므로
    // 이 내용을 화면에 표시하고 컴포넌트의 실행은 중단된다.
    return (
      <div>
        <h1>Oops~!!! {error.code} Error.</h1>
        <hr />
        <p>{error.message}</p>
      </div>
    )
  }

  /** 메인 화면 구성 */
  return (
    <div>
      {/* 로딩바 */}
      <Spinner loading={loading}></Spinner>

      <Table>
        <thead>
          <tr>
            <th>승객번호</th>
            <th>승객이름</th>
            <th>성별</th>
            <th>나이</th>
            <th>동승자 수</th>
            <th>객실등급</th>
            <th>방 호수</th>
            <th>티켓번호</th>
            <th>요금</th>
            <th>탑승지</th>
            <th>생존여부</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(({id, name, survived, pclass, sex, age, sibsp, parch, ticket, fare, cabin, embarked}, i) => {
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td><ColorText sex={sex} /></td>
                <td>{age}</td>
                <td>{sibsp + parch }</td>
                <td>{pclass}등석</td>
                <td>{cabin}</td>
                <td>{ticket}</td>
                <td>{fare}</td>
                <td><EmbarkedBox embarked={embarked} /></td>
                <td><SurvivedBox survived={survived} /></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  )
});

export default Titanic;