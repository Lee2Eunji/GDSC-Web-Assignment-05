import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

// 좌석 선택을 위한 배열 생성
const selectArray: Array<string> = new Array<string>();

export default function Select() {
    // 사람의 수
    const [person, setPerson] = useState<number>(0);
    // 영화의 가격
    const [price, setPrice] = useState<number>(600);
    // 총 가격
    const [total, setTotal] = useState<number>(3);
    // 영화 제목의 router query
    const [name, setName] = useState<string>('Aladin');
    // router query를 위하여 정의
    const router = useRouter();

    // 영화 선택될 때마다 가격 바뀌게 하기
    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setPrice(Number(e.target.value));
        // 가격이니까 기본형인 string 말고 Number로 지정
    };

    // 영화 제목 router query(새로 선택해야 해서 다른 방법 구상 중)
    const onSelectChange2 = (e: { target: { value: any; }; }) => {
        // option의 value를 찾아 전송되는 값을 변하게 하기
        const { value } = e.target;
        setName(e.target.value);
    };

    // 선택한 인원만큼 가격 증가
    useEffect(() => {
        const realPerson = person;
        setTotal(price * realPerson);
    }, [price, person]);

    // 좌석 선택 가능하게 하기
    const SelectChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        const selectColor = e.currentTarget;
        const changeSeat = e.currentTarget.innerHTML;

        // 만약 changeSeat이 selectArray에 포함된다면
        if (selectArray.includes(changeSeat)) {
            const indexSeat = selectArray.indexOf(changeSeat);
            // indexSeat를 삭제하고(기본값)
            delete selectArray[indexSeat];
            // 배경색을 변경하고
            selectColor.style.backgroundColor = "#666";
            // 값을 줄여라
            setPerson(person - 1);
        }
        // 그렇지 않으면
        else {
            // selectArray의 changeSeat을 클릭했을 때
            selectArray.push(changeSeat);
            // 배경색을 변경하고
            selectColor.style.backgroundColor = "#ad1712";
            // 값을 늘려라
            setPerson(person + 1);
        }
    }

    // 혹시 -값이나 좌석을 선택하지 않았을 시 0으로 리셋
    const onReset = () => {
        setPerson(0);
        setPrice(0);
    }

    // 좌석 선택 후 결제창으로 넘어가기
    const onClickPurchase = () => {
        // 만약 선택을 안 하면
        if (person <= 0) {
            // 해당 알림을 띄우고
            alert('좌석을 선택해 주세요.');
            // 0으로 리셋해 주고
            onReset();
            // 알라딘의 기본값인 600으로 변경해라
            setPrice(600);
            return;
        }
        // 그렇지 않으면(선택을 하면)
        else router.push({
            // purchase로 이동하고
            pathname: '/purchase',
            // 해당 값들을 purchase로 넘겨라
            query: { name: name, person: person, price: total },
        });
    };

    return (
        <Container>
            <p>영화를 선택해 주세요.</p>
            <StyledSelect value={price} onChange={onSelectChange}>
                <option value={600}>Aladin(600원)</option>
                <option value={700}>Beauty and the Beast(700원)</option>
                <option value={800}>범죄도시2(800원)</option>
            </StyledSelect>

            <StyledSelect2 value={name} onChange={onSelectChange2}>
                <option value={'Aladin'}>Aladin(600원)</option>
                <option value={'Beauty and the Beast'}>Beauty and the Beast(700원)</option>
                <option value={'범죄도시2'}>범죄도시2(800원)</option>
            </StyledSelect2>

            <ScreenDiv />

            <SeatList>
                <SelectSeat onClick={SelectChange}>1</SelectSeat>
                <AlreadySelectSeat>2</AlreadySelectSeat>
                <SelectSeat onClick={SelectChange}>3</SelectSeat>
                <SelectSeat onClick={SelectChange}>4</SelectSeat>
                <SelectSeat onClick={SelectChange}>5</SelectSeat>
                <SelectSeat onClick={SelectChange}>6</SelectSeat>
            </SeatList>
            <SeatList>
                <SelectSeat onClick={SelectChange}>7</SelectSeat>
                <SelectSeat onClick={SelectChange}>8</SelectSeat>
                <AlreadySelectSeat>9</AlreadySelectSeat>
                <AlreadySelectSeat>10</AlreadySelectSeat>
                <SelectSeat onClick={SelectChange}>11</SelectSeat>
                <SelectSeat onClick={SelectChange}>12</SelectSeat>
            </SeatList>
            <SeatList>
                <SelectSeat onClick={SelectChange}>13</SelectSeat>
                <SelectSeat onClick={SelectChange}>14</SelectSeat>
                <SelectSeat onClick={SelectChange}>15</SelectSeat>
                <SelectSeat onClick={SelectChange}>16</SelectSeat>
                <SelectSeat onClick={SelectChange}>17</SelectSeat>
                <AlreadySelectSeat>18</AlreadySelectSeat>
            </SeatList>
            <SeatList>
                <SelectSeat onClick={SelectChange}>19</SelectSeat>
                <SelectSeat onClick={SelectChange}>20</SelectSeat>
                <SelectSeat onClick={SelectChange}>21</SelectSeat>
                <SelectSeat onClick={SelectChange}>22</SelectSeat>
                <SelectSeat onClick={SelectChange}>23</SelectSeat>
                <SelectSeat onClick={SelectChange}>24</SelectSeat>
            </SeatList>
            <SeatList>
                <SelectSeat onClick={SelectChange}>25</SelectSeat>
                <SelectSeat onClick={SelectChange}>26</SelectSeat>
                <SelectSeat onClick={SelectChange}>27</SelectSeat>
                <AlreadySelectSeat>28</AlreadySelectSeat>
                <SelectSeat onClick={SelectChange}>29</SelectSeat>
                <SelectSeat onClick={SelectChange}>30</SelectSeat>
            </SeatList>

            <SeatState>
                <Occupied />
                <p>: 이미 예매된 좌석</p>
                <Selected />
                <p>: 선택한 좌석</p>
                <Vacate />
                <p>: 예매 가능한 좌석</p>
            </SeatState>

            <ResultAlert>선택하신 인원수는 {person}명, 총 금액은 {total}원입니다.</ResultAlert>

            <PurchaseBtn onClick={onClickPurchase}>결제하기</PurchaseBtn>
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

margin: 0 10vw;
padding: 1rem 0;

background-color: #d4d3c9;

border: 1px solid black;
`;

const StyledSelect = styled.select`
all: unset;

padding: 5px 10px;

background-color: #ad1712;
color: white;

border: 1px solid black;
border-radius: 20px;
text-align: center;
font-weight: bold;
cursor: pointer;
`;

const StyledSelect2 = styled.select`
display: none;
`;

const ScreenDiv = styled.div`
width: 20em;
height: 10em;
margin-top: 2rem;
margin-bottom: 1rem;

background-color: #E6E6E6;

border-radius: 1rem;
box-shadow: 0px 0px 1rem #000;
`;

const SeatList = styled.div`
display: flex;
justify-content: center;
align-items: center;

margin-top: 1rem;
`;

const SeatState = styled.div`
display: flex;
width: fit-content;
`;

const Occupied = styled.div`
width: 25px;
height: 25px;
margin-top: 1rem;

background-color: #bbb;
color: #fff;

border: 1px solid #dbdee2;
border-radius: 10px;
`;

const Selected = styled.div`
width: 25px;
height: 25px;
margin-top: 1rem;
margin-left: 1rem;

background-color: #ad1712;
color: #fff;

border: 1px solid #dbdee2;
border-radius: 10px;
`;

const Vacate = styled.div`
width: 25px;
height: 25px;
margin-top: 1rem;
margin-left: 1rem;

background-color: #666;
color: #fff;

border: 1px solid #dbdee2;
border-radius: 10px;
`;

const SelectSeat = styled.button`
width: 40px;
height: 40px;
margin: 0 5px;

background-color: #666;
color: white;

border: none;
border-radius: 10px;
cursor: pointer;
`;

const AlreadySelectSeat = styled.div`
display: flex;
justify-content: center;
align-items: center;

width: 40px;
height: 40px;
margin: 0 5px;

background-color: #bbb;
color: #fff;

border-radius: 10px;
font-size: small;
`;

const ResultAlert = styled.h2`
font-size: 135%;
`;

const PurchaseBtn = styled.button`
padding: 8px 15px;

background-color: black;
color: #d4d3c9;

border: 1px solid black;
border-radius: 1rem;
font-size: 1rem;
font-weight: bolder;
cursor: pointer;

&:hover {
    background-color: #d4d3c9;
    color: black;

    border: 1px solid black;
}
`;